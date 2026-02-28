'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';

export default function NeuralNetworkBG() {
    const pointsRef = useRef<THREE.Points>(null);
    const { scrollYProgress } = useScroll();

    // Generate dense particle points for Neural / Galaxy look
    const particleCount = 2000;

    const [positions, targetPositions, colors] = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const targetPos = new Float32Array(particleCount * 3);
        const col = new Float32Array(particleCount * 3);

        // Brand Colors
        const colorCyan = new THREE.Color('#0096FF');
        const colorAmber = new THREE.Color('#FF6B35');

        for (let i = 0; i < particleCount; i++) {
            // Initial Neural Network spread
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10;

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            // Target Galaxy Formation (for scroll morph)
            const radius = Math.random() * 10;
            const theta = Math.random() * Math.PI * 2;
            const spiralOffset = radius * 2;

            targetPos[i * 3] = Math.cos(theta + spiralOffset) * radius;
            targetPos[i * 3 + 1] = (Math.random() - 0.5) * 2; // Flat disc
            targetPos[i * 3 + 2] = Math.sin(theta + spiralOffset) * radius;

            // Mix Colors
            const mixedColor = colorCyan.clone().lerp(colorAmber, Math.random());
            col[i * 3] = mixedColor.r;
            col[i * 3 + 1] = mixedColor.g;
            col[i * 3 + 2] = mixedColor.b;
        }
        return [pos, targetPos, col];
    }, [particleCount]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        const time = state.clock.getElapsedTime();
        const scroll = scrollYProgress.get(); // 0 to 1

        // Morph geometry from neural to galaxy based on scroll
        const geometry = pointsRef.current.geometry;
        const currentPositions = geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
            // Interpolate between initial position (neural) and target position (galaxy)
            const i3 = i * 3;
            const ix = THREE.MathUtils.lerp(positions[i3], targetPositions[i3], scroll);
            const iy = THREE.MathUtils.lerp(positions[i3 + 1], targetPositions[i3 + 1], scroll);
            const iz = THREE.MathUtils.lerp(positions[i3 + 2], targetPositions[i3 + 2], scroll);

            // Add heartbeat pulsing
            const pulse = Math.sin(time * 2 + i) * 0.1 * (1 - scroll);
            currentPositions[i3] = ix + pulse;
            currentPositions[i3 + 1] = iy + pulse;
            currentPositions[i3 + 2] = iz + pulse;
        }

        geometry.attributes.position.needsUpdate = true;

        // Slowly rotate the entire system
        pointsRef.current.rotation.y = time * 0.05 + scroll * Math.PI;
        pointsRef.current.rotation.x = scroll * 0.5;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
