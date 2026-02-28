'use client';

import { motion } from 'framer-motion';

const projects = [
    {
        title: '2. Facial Expression Classification (CV)',
        desc: 'CNN-based real-time emotion prediction model trained on the FER2013 dataset capable of detecting human expressions.',
        tech: ['Python', 'OpenCV', 'CNNs'],
        arch: 'model.add(Conv2D(64, (3,3), activation="relu"))'
    },
    {
        title: '3. Sentiment Analysis with RoBERTa',
        desc: 'NLP tool using RoBERTa and VADER to classify laptop customer reviews into positive, negative, and neutral sentiments.',
        tech: ['Python', 'RoBERTa', 'Hugging Face'],
        arch: 'pipeline("sentiment-analysis", model="roberta-base")'
    },
    {
        title: '4. Bengaluru Real Estate Predictor',
        desc: 'Advanced machine learning model leveraging historical property data, economic indicators, and local trends for pricing forecasts.',
        tech: ['Python', 'Scikit-Learn', 'Pandas'],
        arch: 'RandomForestRegressor().fit(X_train, y_train)'
    },
    {
        title: '5. Body Movement Tracker',
        desc: 'Real-time human motion tracking and analysis system integrating computer vision techniques for fitness and healthcare applications.',
        tech: ['Python', 'OpenCV', 'MediaPipe'],
        arch: 'mp_pose.Pose(min_detection_confidence=0.5)'
    }
];

export default function ProjectsSection() {
    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-24" id="projects">
            <div className="mb-12">
                <h2 className="text-4xl font-heading mb-2"><span className="text-[var(--color-brand-cyan)]">{'// '}</span>DATA-DRIVEN PROJECTS</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-brand-cyan)] to-transparent" />
            </div>

            {/* Featured Project */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 rounded-2xl mb-8 border border-yellow-500/40 shadow-[0_0_30px_rgba(234,179,8,0.15)] relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-4">
                    <span className="bg-yellow-500/20 text-yellow-400 text-xs font-heading px-3 py-1 rounded-full border border-yellow-500/50">FEATURED / ENTERPRISE</span>
                </div>

                <h3 className="text-3xl font-heading text-white mb-4 mt-4">1. Lulu Sales Intelligence Dashboard</h3>
                <p className="text-gray-300 text-lg mb-6 max-w-3xl">
                    A comprehensive, enterprise-level sales intelligence platform providing real-time analytics, predictive modeling, and data-driven insights to optimize pipeline performance and revenue generation.
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {['Next.js', 'FastAPI', 'PostgreSQL'].map(tech => (
                        <span key={tech} className="text-xs font-mono px-2 py-1 bg-white/10 rounded text-[var(--color-brand-amber)]">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="bg-black/60 p-4 rounded-lg font-mono text-sm text-green-400 border border-white/5 overflow-x-auto">
                    {'>'} System Architecture: [Data Source] {'<->'} [FastAPI Backend] {'<->'} [React UI]
                </div>
            </motion.div>

            {/* Regular Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, idx) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className="glass-card p-6 rounded-2xl hover:border-[var(--color-brand-cyan)] group"
                    >
                        <h4 className="text-xl font-heading text-white mb-3 group-hover:text-[var(--color-brand-cyan)] transition-colors">
                            {project.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-6 h-12">
                            {project.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map(t => (
                                <span key={t} className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                                    {t}
                                </span>
                            ))}
                        </div>

                        <div className="bg-black/80 p-3 rounded text-xs font-mono text-[#FF6B35] truncate border border-white/5">
                            <span className="text-gray-500">{'// '}</span> {project.arch}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
