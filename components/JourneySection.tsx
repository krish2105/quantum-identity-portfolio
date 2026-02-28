'use client';

import { motion } from 'framer-motion';

const experiences = [
    {
        role: 'Machine Learning Intern',
        company: 'Intelliza Solutions Pvt Ltd',
        period: 'Feb 2025 - Aug 2025',
        description: 'Developing intelligent chatbot systems using Natural Language Processing (NLP) techniques. Implementing intent recognition, entity extraction, dialogue management, and model optimization.'
    },
    {
        role: 'Data Science Intern & Project Fellowship',
        company: 'iHUB DivyaSampark @ IIT Roorkee',
        period: 'Jun 2023 - Sep 2023',
        description: 'Worked on real-world projects applying Data Science and Artificial Intelligence. Built the Bengaluru Real Estate Price Prediction Model.'
    },
    {
        role: 'Machine Learning Intern',
        company: 'TEACHNOOK',
        period: 'May 2023 - Aug 2023',
        description: 'In collaboration with Wissenaire IIT Bhubaneswar. Hands-on experience in Deep Learning and Project Planning.'
    },
    {
        role: 'AWS Developer & Cloud Consultant',
        company: 'Amazon Web Services (AWS)',
        period: 'May 2023 - Jun 2023',
        description: 'Gained insights into the latest trends, technologies, and best practices in AI, cloud security, and SageMaker during AWS Summit India 2023.'
    },
    {
        role: 'Project Lead',
        company: 'Techstars Startup Weekend Jaipur',
        period: 'Sep 2022 - Oct 2022',
        description: 'Led a team to pitch and develop startup ideas over a weekend.'
    }
];

const credentials = [
    {
        title: 'Research Paper: Real-Time Lung Cancer Risk Prediction',
        issuer: 'IJCRT Vol-10',
        type: 'research',
        link: '#'
    },
    { title: 'Data Science and Machine Learning using Python', issuer: 'Indian Institute of Technology, Roorkee', type: 'cert' },
    { title: 'Introduction to Programming Using Python', issuer: 'Google', type: 'cert' },
    { title: 'Masters of Artificial Intelligence in Business', issuer: 'SP Jain School of Global Management (2025-2027)', type: 'edu' },
    { title: 'BTech, Artificial Intelligence and Machine Learning', issuer: 'Manipal University Jaipur (2021-2025)', type: 'edu' }
];

export default function JourneySection() {
    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-24 flex flex-col md:flex-row gap-12" id="journey">

            {/* Experience Timeline */}
            <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-heading mb-8 flex items-center">
                    <span className="text-[var(--color-brand-cyan)] mr-3">{'// '}</span> EXPERIENCE
                </h2>

                <div className="relative border-l-2 border-white/10 ml-4 space-y-8 pb-4">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="relative pl-8"
                        >
                            {/* Timeline dot */}
                            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[var(--color-brand-cyan)] shadow-[0_0_10px_var(--color-brand-cyan)]" />

                            <div className="glass-card p-6 rounded-xl hover:border-[var(--color-brand-cyan)]/50 transition-colors">
                                <span className="text-xs font-mono text-[var(--color-brand-amber)] mb-2 block">{exp.period}</span>
                                <h3 className="text-xl font-heading text-white">{exp.role}</h3>
                                <h4 className="text-sm text-gray-400 font-mono mb-4">{exp.company}</h4>
                                <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Credentials Vault */}
            <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-heading mb-8 flex items-center">
                    <span className="text-[var(--color-brand-amber)] mr-3">{'// '}</span> THE VAULT
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    {credentials.map((cred, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`glass-card p-5 rounded-xl border flex flex-col justify-center ${cred.type === 'research'
                                    ? 'border-[var(--color-brand-amber)]/50 shadow-[0_0_15px_rgba(255,107,53,0.15)] md:col-span-1'
                                    : cred.type === 'edu'
                                        ? 'border-[var(--color-brand-cyan)]/30 bg-[var(--color-brand-cyan)]/5 hover:border-[var(--color-brand-cyan)]/60'
                                        : 'border-white/5 hover:border-white/20'
                                }`}
                        >
                            {cred.type === 'research' && (
                                <span className="text-[10px] uppercase tracking-widest text-[var(--color-brand-amber)] mb-2 font-mono">
                                    ★ Primary Publication
                                </span>
                            )}
                            {cred.type === 'edu' && (
                                <span className="text-[10px] uppercase tracking-widest text-[var(--color-brand-cyan)] mb-2 font-mono">
                                    🎓 Education
                                </span>
                            )}
                            <h4 className={`font-heading ${cred.type === 'research' ? 'text-xl text-white' : 'text-md text-gray-200'} mb-1`}>
                                {cred.title}
                            </h4>
                            <span className="text-xs font-mono text-[var(--color-brand-cyan)] leading-relaxed">{cred.issuer}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
}
