'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Image from 'next/image';

const roles = ['AI & Data Science Engineer', 'Machine Learning Intern', 'Data Science Intern'];

function RotatingRings() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();

        // Mouse interactivity
        const mouseX = (state.pointer.x * Math.PI) / 4;
        const mouseY = (state.pointer.y * Math.PI) / 4;

        // Smooth rotation towards mouse + continuous spin
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouseY, 0.1) + 0.005;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.1) + 0.01;
    });

    return (
        <group ref={groupRef}>
            {/* Outer Ring */}
            <mesh>
                <torusGeometry args={[3, 0.02, 16, 100]} />
                <meshBasicMaterial color="#0096FF" transparent opacity={0.5} />
            </mesh>
            {/* Middle Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.5, 0.02, 16, 100]} />
                <meshBasicMaterial color="#FF6B35" transparent opacity={0.5} />
            </mesh>
            {/* Inner Ring */}
            <mesh rotation={[0, Math.PI / 2, 0]}>
                <torusGeometry args={[2, 0.01, 16, 100]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </mesh>
        </group>
    );
}

export default function HeroSection() {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">

            {/* 3D HUD & Profile Image Container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 flex items-center justify-center">
                {/* Three.js Canvas Overlay for Rings */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                        <RotatingRings />
                    </Canvas>
                </div>

                {/* Profile Image */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="relative z-10 w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-[3px] border-white/10 shadow-[0_0_30px_rgba(0,150,255,0.3)]"
                >
                    {/* Fallback avatar if profile.jpg is missing */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-4xl font-heading text-white/50">
                        KM
                    </div>
                    <Image
                        src="/images/profile.jpg"
                        alt="Krishna Mathur"
                        fill
                        className="object-cover"
                        onError={(e) => {
                            // Hide image if it fails to load so fallback shows
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </motion.div>
            </div>

            {/* Typography: Name & Roles */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-center z-20 px-4"
            >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-4 tracking-tighter">
                    <span className="text-gradient">KRISHNA MATHUR</span>
                </h1>

                <div className="h-12 overflow-hidden flex justify-center items-center">
                    <motion.div
                        key={roleIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl md:text-2xl font-mono text-gray-300"
                    >
                        {'>'} {roles[roleIndex]} <span className="animate-pulse">_</span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Stats Chips (Floating Glass Cards) */}
            <div className="absolute bottom-10 left-0 w-full px-4 md:px-12 flex flex-wrap justify-center gap-4 space-x-0 md:space-x-8 z-20 pointer-events-none">
                {[
                    { label: 'PROJECTS', value: '10+' },
                    { label: 'RECORDS PROCESSED', value: '913K+' },
                    { label: 'CERTIFICATIONS', value: '5+' },
                    { label: 'RESEARCH PAPER', value: '1' }
                ].map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + idx * 0.1, duration: 0.8 }}
                        className="glass-card px-6 py-3 rounded-lg flex flex-col items-center pointer-events-auto"
                    >
                        <span className="text-2xl font-heading font-bold text-[var(--color-brand-amber)]">{stat.value}</span>
                        <span className="text-xs text-gray-400 font-mono tracking-widest">{stat.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
