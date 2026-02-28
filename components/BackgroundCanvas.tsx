'use client';

import { Canvas } from '@react-three/fiber';
import NeuralNetworkBG from './NeuralNetworkBG';

export default function BackgroundCanvas() {
    return (
        <div className="fixed inset-0 z-0 h-screen w-screen bg-[var(--background)]">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <fog attach="fog" args={['#050505', 10, 30]} />
                <NeuralNetworkBG />
            </Canvas>
        </div>
    );
}
