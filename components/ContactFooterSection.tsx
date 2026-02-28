'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Terminal } from 'lucide-react';
import { useState } from 'react';

// Custom icons for Kaggle/Medium since Lucide doesn't have them built-in
const KaggleIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-5.641-2.96 2.84v2.809c0 .16-.082.239-.246.239H4.215c-.161 0-.246-.079-.246-.239V.239C3.969.079 4.054 0 4.215 0h2.314c.164 0 .246.079.246.239v15.348l7.558-7.994c.14-.15.304-.225.492-.225h3.291c.175 0 .265.05.27.152.011.082-.023.153-.105.211L10.51 15.3l8.21 8.337c.07.06.105.132.105.222z" />
    </svg>
);

const MediumIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6.9 19.34c-3.8 0-6.9-3.08-6.9-6.88 0-3.8 3.1-6.88 6.9-6.88 3.8 0 6.9 3.08 6.9 6.88 0 3.8-3.1 6.88-6.9 6.88m10.15-.31c-1.87 0-3.39-2.94-3.39-6.57 0-3.63 1.52-6.57 3.39-6.57 1.87 0 3.39 2.94 3.39 6.57 0 3.63-1.52 6.57-3.39 6.57m5.98-.3c-.63 0-1.14-2.8-1.14-6.27 0-3.47.51-6.27 1.14-6.27.63 0 1.14 2.8 1.14 6.27 0 3.47-.51 6.27-1.14 6.27" />
    </svg>
);

export default function ContactFooterSection() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    return (
        <section className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-12 pt-12" id="contact">

            {/* Contact Terminal */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/80 backdrop-blur-xl mb-16"
            >
                {/* macOS Terminal Header */}
                <div className="bg-gray-900/80 px-4 py-3 flex items-center border-b border-white/10">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="mx-auto flex items-center text-xs font-mono text-gray-400">
                        <Terminal className="w-3 h-3 mr-2" />
                        krishna@quantum-identity: ~
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 md:p-8 font-mono">
                    <p className="text-[var(--color-brand-cyan)] mb-4">{'>'} ./initiate_contact.sh</p>
                    <p className="text-gray-300 mb-6">Enter your parameters below to establish a secure connection.</p>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="text-[10px] text-gray-500 tracking-widest uppercase mb-1 block">NAME</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-white focus:border-[var(--color-brand-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-cyan)] transition-colors"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-[10px] text-gray-500 tracking-widest uppercase mb-1 block">EMAIL_ADDRESS</label>
                                <input
                                    type="email"
                                    className="w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-white focus:border-[var(--color-brand-amber)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-amber)] transition-colors"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] text-gray-500 tracking-widest uppercase mb-1 block">PAYLOAD_MESSAGE</label>
                            <textarea
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-white focus:border-[var(--color-brand-cyan)] focus:outline-none focus:ring-1 focus:ring-[var(--color-brand-cyan)] transition-colors resize-none"
                                placeholder="Initialize communication..."
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 py-3 bg-[var(--color-brand-cyan)] hover:bg-[var(--color-brand-cyan)]/80 text-black font-bold font-heading rounded-md transition-colors"
                        >
                            EXECUTE_TRANSMISSION()
                        </button>
                    </form>
                </div>
            </motion.div>

            {/* Footer */}
            <footer className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-gray-400 font-mono text-sm text-center md:text-left">
                    <p>© {new Date().getFullYear()} Krishna Mathur. All rights reserved.</p>
                    <p className="text-xs text-gray-500 mt-1">Built with Next.js, Three.js & TailwindCSS</p>
                </div>

                <div className="flex gap-4">
                    <a href="https://github.com/krish2105" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[var(--color-brand-cyan)] transition-all hover:scale-110">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/in/krishnamathurmay/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400 transition-all hover:scale-110">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="https://www.kaggle.com/krish2105" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-300 hover:border-blue-300 transition-all hover:scale-110">
                        <KaggleIcon />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all hover:scale-110">
                        <MediumIcon />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-500 transition-all hover:scale-110">
                        <Instagram className="w-5 h-5" />
                    </a>
                </div>
            </footer>
        </section>
    );
}
