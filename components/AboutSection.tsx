'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto px-4 py-24" id="about">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Profile Card / Bento 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                    className="glass-card col-span-1 md:col-span-1 p-6 flex flex-col items-center justify-center rounded-2xl relative overflow-hidden"
                >
                    {/* Conic Gradient Border Animation */}
                    <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--color-brand-amber)_360deg)] animate-[spin_3s_linear_infinite]" />
                    <div className="absolute inset-[2px] z-0 bg-black/80 rounded-[14px]" />

                    <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-white/20">
                        <Image src="/images/profile.jpg" alt="Krishna Mathur" fill className="object-cover" />
                    </div>

                    <h2 className="relative z-10 text-2xl font-heading font-bold text-center">KRISHNA MATHUR</h2>
                    <p className="relative z-10 text-sm text-[var(--color-brand-cyan)] font-mono tracking-widest mt-2 uppercase text-center">
                        AI & DATA SCIENCE
                    </p>
                </motion.div>

                {/* Bio Card / Bento 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass-card col-span-1 md:col-span-2 p-8 rounded-2xl flex flex-col justify-center"
                >
                    <h3 className="text-3xl font-heading mb-6 border-b border-white/10 pb-4">
                        <span className="text-[var(--color-brand-amber)]">{'// '}</span>System Identification
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                        I build highly scalable, intelligent systems at the intersection of big data and machine learning.
                        Currently a <strong className="text-white">Machine Learning Intern at Intelliza Solutions</strong> and pursuing my <strong className="text-white">Master of AI at SP Jain School of Global Management</strong>.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="glass-panel px-4 py-2 rounded-lg text-sm font-mono border-l-2 border-[var(--color-brand-cyan)]">
                            LOCATION: Mumbai, India & Sydney, Australia
                        </div>
                        <div className="glass-panel px-4 py-2 rounded-lg text-sm font-mono border-l-2 border-[var(--color-brand-amber)]">
                            CLEARANCE: Level 5 (AI Systems)
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
