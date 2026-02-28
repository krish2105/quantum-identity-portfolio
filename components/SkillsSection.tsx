'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const skillCategories = [
    {
        title: 'CORE & TOP SKILLS',
        skills: ['Artificial Intelligence', 'Machine Learning', 'Data Science', 'Computer Science', 'Project Management'],
        color: 'var(--color-brand-cyan)'
    },
    {
        title: 'FRAMEWORKS & LIBRARIES',
        skills: ['Python', 'Flask', 'TensorFlow', 'Scikit-Learn', 'OpenCV', 'Pandas', 'NumPy'],
        color: 'var(--color-brand-amber)'
    },
    {
        title: 'SPECIALIZATIONS',
        skills: ['Computer Vision', 'Deep Learning', 'NLP', 'Data Analysis', 'Object Detection'],
        color: 'var(--color-brand-cyan)'
    },
    {
        title: 'CLOUD & INFRASTRUCTURE',
        skills: ['Amazon Web Services', 'RESTful APIs', 'Git', 'Cloud Security'],
        color: 'var(--color-brand-amber)'
    }
];

// Helper to format string to match simpleicons CDN (lowercase, no spaces)
const getIconUrl = (skill: string) => {
    // Map specific ones that have different names in simple-icons
    const exactMatch: Record<string, string> = {
        'Artificial Intelligence': 'openai',
        'Machine Learning': 'scikitlearn',
        'Data Science': 'jupyter',
        'Computer Science': 'intel',
        'Project Management': 'jira',
        'NLP': 'huggingface',
        'Computer Vision': 'opencv',
        'Data Analysis': 'tableau',
        'Deep Learning': 'keras',
        'RESTful APIs': 'postman',
        'Cloud Security': 'cloudflare',
        'Amazon Web Services': 'amazonaws',
        'Object Detection': 'yolo'
    };

    const lookup = exactMatch[skill] || skill.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `https://cdn.simpleicons.org/${lookup}/white`;
};

export default function SkillsSection() {
    return (
        <section className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-24" id="skills">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                {skillCategories.map((category, catIdx) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, x: catIdx % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                        className="glass-card p-6 rounded-2xl"
                    >
                        <h3 className="text-xl font-heading mb-6 tracking-widest flex items-center">
                            <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: category.color }} />
                            {category.title}
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {category.skills.map((skill, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05, borderColor: category.color }}
                                    className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 border-[1px] border-white/10 transition-colors duration-300 backdrop-blur-md bg-black/50"
                                >
                                    <div className="relative w-5 h-5 flex-shrink-0">
                                        <Image
                                            src={getIconUrl(skill)}
                                            alt={skill}
                                            fill
                                            unoptimized
                                            className="object-contain opacity-80"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                    </div>
                                    <span className="text-sm font-mono text-gray-200">{skill}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
