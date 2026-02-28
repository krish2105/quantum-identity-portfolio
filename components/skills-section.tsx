"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

/* ─── Design tokens ─── */
const AMBER = "#FF6B35"
const GOLD = "#FFB800"
const BLUE = "#0096FF"
const TEXT_PRIMARY = "#F5F5F5"
const TEXT_SECONDARY = "#A0A0A0"
const BORDER = "rgba(255,107,53,0.15)"
const GLASS_BG = "rgba(255,107,53,0.05)"
const BAR_BG = "#1A1A1A"

/* ─── Fade-up wrapper ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

function FadeUp({
  children,
  i = 0,
  className = "",
}: {
  children: ReactNode
  i?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={i}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Proficiency bars data ─── */
const PROFICIENCY = [
  { label: "Programming & Scripting", pct: 60 },
  { label: "Data Analysis & Visualization", pct: 65 },
  { label: "Machine Learning & Statistics", pct: 50 },
  { label: "Leadership & Soft Skills", pct: 70 },
]

function ProficiencyBar({
  label,
  pct,
  i,
}: {
  label: string
  pct: number
  i: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <FadeUp i={i}>
      <div ref={ref} className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium" style={{ color: TEXT_PRIMARY }}>
            {label}
          </span>
        </div>
        <div className="relative h-3 w-full overflow-hidden rounded-full" style={{ background: BAR_BG }}>
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              backgroundImage: `linear-gradient(135deg, ${AMBER}, ${GOLD})`,
            }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${pct}%` } : { width: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
          />
          {/* Percentage label at end of bar */}
          <motion.span
            className="absolute top-1/2 -translate-y-1/2 text-[10px] font-bold font-mono"
            style={{ color: TEXT_PRIMARY }}
            initial={{ left: "0%", opacity: 0 }}
            animate={
              inView
                ? { left: `${pct}%`, opacity: 1 }
                : { left: "0%", opacity: 0 }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
          >
            <span className="ml-2">{pct}%</span>
          </motion.span>
        </div>
      </div>
    </FadeUp>
  )
}

/* ─── Skill cloud data ─── */
interface SkillItem {
  name: string
  img: string
  color: string
}

interface SkillGroup {
  title: string
  skills: SkillItem[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Languages & Core",
    skills: [
      { name: "Python", img: "https://cdn.simpleicons.org/python/3776AB", color: "#3776AB" },
      { name: "SQL", img: "https://cdn.simpleicons.org/mysql/4479A1", color: "#4479A1" },
      { name: "PostgreSQL", img: "https://cdn.simpleicons.org/postgresql/4169E1", color: "#4169E1" },
      { name: "MongoDB", img: "https://cdn.simpleicons.org/mongodb/47A248", color: "#47A248" },
      { name: "Redis", img: "https://cdn.simpleicons.org/redis/DC382D", color: "#DC382D" },
    ],
  },
  {
    title: "ML / AI",
    skills: [
      { name: "TensorFlow", img: "https://cdn.simpleicons.org/tensorflow/FF6F00", color: "#FF6F00" },
      { name: "PyTorch", img: "https://cdn.simpleicons.org/pytorch/EE4C2C", color: "#EE4C2C" },
      { name: "Scikit-learn", img: "https://cdn.simpleicons.org/scikitlearn/F7931E", color: "#F7931E" },
      { name: "Pandas", img: "https://cdn.simpleicons.org/pandas/150458", color: "#8B8BCD" },
      { name: "NumPy", img: "https://cdn.simpleicons.org/numpy/013243", color: "#4DABCF" },
    ],
  },
  {
    title: "Big Data",
    skills: [
      { name: "Apache Spark", img: "https://cdn.simpleicons.org/apachespark/E25A1C", color: "#E25A1C" },
      { name: "Kafka", img: "https://cdn.simpleicons.org/apachekafka/FFFFFF", color: "#FFFFFF" },
      { name: "Airflow", img: "https://cdn.simpleicons.org/apacheairflow/017CEE", color: "#017CEE" },
      { name: "Snowflake", img: "https://cdn.simpleicons.org/snowflake/29B5E8", color: "#29B5E8" },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", img: "https://cdn.simpleicons.org/amazonaws/FF9900", color: "#FF9900" },
      { name: "GCP", img: "https://cdn.simpleicons.org/googlecloud/4285F4", color: "#4285F4" },
      { name: "Azure", img: "https://cdn.simpleicons.org/microsoftazure/0078D4", color: "#0078D4" },
      { name: "Docker", img: "https://cdn.simpleicons.org/docker/2496ED", color: "#2496ED" },
      { name: "Git", img: "https://cdn.simpleicons.org/git/F05032", color: "#F05032" },
      { name: "GitHub", img: "https://cdn.simpleicons.org/github/FFFFFF", color: "#FFFFFF" },
    ],
  },
  {
    title: "Visualization",
    skills: [
      { name: "Power BI", img: "https://cdn.simpleicons.org/powerbi/F2C811", color: "#F2C811" },
      { name: "Tableau", img: "https://cdn.simpleicons.org/tableau/E97627", color: "#E97627" },
      { name: "Plotly", img: "https://cdn.simpleicons.org/plotly/3F4F75", color: "#8C8DFF" },
      { name: "Streamlit", img: "https://cdn.simpleicons.org/streamlit/FF4B4B", color: "#FF4B4B" },
      { name: "FastAPI", img: "https://cdn.simpleicons.org/fastapi/009688", color: "#009688" },
    ],
  },
]

/* ─── Skill Pill with float animation ─── */
function SkillPill({
  skill,
  i,
  groupIdx,
}: {
  skill: SkillItem
  i: number
  groupIdx: number
}) {
  const floatDelay = (groupIdx * 3 + i) * 0.4

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: i * 0.06 + groupIdx * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="group relative flex items-center rounded-xl px-4 py-3 backdrop-blur-xl cursor-default transition-shadow duration-300 hover:shadow-[0_0_20px_var(--pill-glow)]"
        style={{
          "--pill-glow": `${skill.color}25`,
          background: GLASS_BG,
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 3,
          borderTopStyle: "solid",
          borderRightStyle: "solid",
          borderBottomStyle: "solid",
          borderLeftStyle: "solid",
          borderTopColor: BORDER,
          borderRightColor: BORDER,
          borderBottomColor: BORDER,
          borderLeftColor: `${skill.color}40`,
        } as React.CSSProperties}
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        whileHover={{
          scale: 1.05,
        }}
      >
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={skill.img}
            alt={skill.name}
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 object-contain"
            loading="lazy"
          />
          <span
            className="text-sm font-medium whitespace-nowrap transition-colors duration-300"
            style={{ color: TEXT_SECONDARY }}
          >
            {skill.name}
          </span>
        </div>

        {/* Hover glow overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse at center, ${skill.color}08 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}

/* ─── Group divider label ─── */
function GroupLabel({ title, i }: { title: string; i: number }) {
  return (
    <FadeUp i={i} className="mb-4 mt-8 first:mt-0">
      <div className="flex items-center gap-3">
        <div
          className="h-px flex-1 max-w-[40px]"
          style={{
            background: `linear-gradient(to right, ${AMBER}60, transparent)`,
          }}
        />
        <span
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: AMBER }}
        >
          {title}
        </span>
        <div
          className="h-px flex-1"
          style={{
            background: `linear-gradient(to right, transparent, ${AMBER}20)`,
          }}
        />
      </div>
    </FadeUp>
  )
}

/* ─── Databases group label (used as divider title) ─── */

/* ─── Main Skills Section ─── */
export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "#0D0D0D" }}
    >
      {/* Graph-paper grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,107,53,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,107,53,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section label */}
        <FadeUp i={0}>
          <div className="mb-4 flex items-center gap-3">
            <div
              className="h-px flex-1 max-w-[60px]"
              style={{ background: `linear-gradient(to right, ${AMBER}, transparent)` }}
            />
            <span
              className="text-xs font-medium uppercase tracking-[0.25em]"
              style={{ color: AMBER }}
            >
              Skills
            </span>
          </div>
        </FadeUp>

        <FadeUp i={1}>
          <h2
            className="mb-16 text-3xl font-bold tracking-tight font-heading md:text-4xl"
            style={{ color: TEXT_PRIMARY }}
          >
            My Digital Toolkit
          </h2>
        </FadeUp>

        {/* ═══ Part 1: Proficiency bars ═══ */}
        <div className="mb-20">
          <FadeUp i={2}>
            <div className="mb-8 flex items-center gap-3">
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: TEXT_SECONDARY }}
              >
                Proficiency
              </span>
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(to right, ${BORDER}, transparent)` }}
              />
            </div>
          </FadeUp>

          <div
            className="rounded-xl px-6 py-8 backdrop-blur-xl md:px-8"
            style={{
              background: GLASS_BG,
              border: `1px solid ${BORDER}`,
            }}
          >
            <div className="flex flex-col gap-6">
              {PROFICIENCY.map((bar, idx) => (
                <ProficiencyBar
                  key={bar.label}
                  label={bar.label}
                  pct={bar.pct}
                  i={idx + 3}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ═══ Part 2: Skill logo cloud ═══ */}
        <div>
          <FadeUp i={7}>
            <div className="mb-8 flex items-center gap-3">
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: TEXT_SECONDARY }}
              >
                Technologies
              </span>
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(to right, ${BORDER}, transparent)` }}
              />
            </div>
          </FadeUp>

          {SKILL_GROUPS.map((group, gIdx) => (
            <div key={group.title}>
              <GroupLabel title={group.title} i={gIdx + 8} />
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, sIdx) => (
                  <SkillPill
                    key={skill.name}
                    skill={skill}
                    i={sIdx}
                    groupIdx={gIdx}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Databases divider (merged into Languages & Core group above) */}

        {/* ─ Bottom accent line ─ */}
        <FadeUp i={14}>
          <div className="mt-20 flex justify-center">
            <div
              className="h-px w-32"
              style={{
                background: `linear-gradient(to right, transparent, ${BLUE}40, transparent)`,
              }}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
