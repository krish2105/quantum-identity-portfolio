'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
    'INITIALIZING QUANTUM CORE...',
    'LOADING NEURAL PATHWAYS...',
    'SYNCING WITH SATELLITE T-89...',
    'DECRYPTING PORTFOLIO DATA...',
    'ESTABLISHING CONNECTION...',
    'KRISHNA_MATHUR.ENV LOADED.',
];

export default function SentientSplashScreen({ onComplete }: { onComplete: () => void }) {
    const [lines, setLines] = useState<string[]>([]);
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let currentLine = 0;

        // Add lines progressively
        const lineInterval = setInterval(() => {
            if (currentLine < bootSequence.length) {
                setLines(prev => [...prev, bootSequence[currentLine]]);
                currentLine++;
            }
        }, 400);

        // Update progress fast
        const progressInterval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return p + Math.floor(Math.random() * 15) + 5;
            });
        }, 300);

        // Wait for 100% and a tiny delay before shattering
        const completeTimeout = setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 1200); // Trigger parent complete after animation
        }, Math.max(bootSequence.length * 400, 2500) + 500);

        return () => {
            clearInterval(lineInterval);
            clearInterval(progressInterval);
            clearTimeout(completeTimeout);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{
                        scale: 1.5,
                        opacity: 0,
                        filter: 'blur(20px)',
                        transition: { duration: 0.8, ease: 'easeInOut' }
                    }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black font-mono text-[var(--color-brand-cyan)]"
                >
                    <div className="w-full max-w-2xl px-8 flex flex-col items-start space-y-2">
                        {lines.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-sm md:text-base tracking-widest uppercase opacity-80 shadow-[0_0_10px_var(--color-brand-cyan)]"
                            >
                                {'>'} {line}
                            </motion.div>
                        ))}

                        <div className="mt-8 flex w-full flex-col gap-2">
                            <div className="flex justify-between text-xs tracking-widest text-[var(--color-brand-amber)]">
                                <span>SYSTEM BOOT</span>
                                <span>{progress.toFixed(0)}%</span>
                            </div>
                            <div className="h-1 w-full overflow-hidden bg-white/10 rounded-full">
                                <motion.div
                                    className="h-full bg-[var(--color-brand-amber)] shadow-[0_0_15px_var(--color-brand-amber)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
