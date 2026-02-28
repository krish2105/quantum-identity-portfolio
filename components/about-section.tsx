"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

/* ─── Design tokens (from design system) ─── */
const AMBER = "#FF6B35"
const GOLD = "#FFB800"
const BLUE = "#0096FF"
const GREEN = "#00FF88"
const SURFACE = "#141414"
const CARD = "#1A1A1A"
const TEXT_PRIMARY = "#F5F5F5"
const TEXT_SECONDARY = "#A0A0A0"
const BORDER = "rgba(255,107,53,0.15)"
const GLASS_BG = "rgba(255,107,53,0.05)"

/* ─── Animated count-up hook ─── */
function useCountUp(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const start = performance.now()
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.round(eased * target))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return count
}

/* ─── Fade-up wrapper ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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

/* ─── Highlight wrapper for amber keywords ─── */
function Highlight({ children }: { children: ReactNode }) {
  return (
    <span
      className="font-medium"
      style={{ color: AMBER }}
    >
      {children}
    </span>
  )
}

/* ─── Stat cell ─── */
function StatCell({
  value,
  suffix,
  label,
  i,
}: {
  value: number
  suffix: string
  label: string
  i: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const count = useCountUp(value, inView)

  return (
    <FadeUp i={i}>
      <div
        ref={ref}
        className="flex flex-col items-center justify-center rounded-xl px-3 py-5 text-center backdrop-blur-xl transition-colors duration-300 hover:border-[rgba(255,107,53,0.3)]"
        style={{
          background: GLASS_BG,
          border: `1px solid ${BORDER}`,
        }}
      >
        <span
          className="text-3xl font-bold font-heading"
          style={{
            backgroundImage: `linear-gradient(135deg, ${AMBER}, ${GOLD})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {count}
          {suffix}
        </span>
        <span className="mt-1 text-xs" style={{ color: TEXT_SECONDARY }}>
          {label}
        </span>
      </div>
    </FadeUp>
  )
}

/* ─── Education card ─── */
function EduCard({
  monogram,
  color,
  school,
  degree,
  period,
  grade,
  i,
}: {
  monogram: string
  color: string
  school: string
  degree: string
  period: string
  grade: string
  i: number
}) {
  return (
    <FadeUp i={i}>
      <div
        className="flex items-start gap-3 rounded-xl px-4 py-3.5 backdrop-blur-xl transition-colors duration-300 hover:border-[rgba(255,107,53,0.3)]"
        style={{
          background: GLASS_BG,
          border: `1px solid ${BORDER}`,
        }}
      >
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{
            background: `${color}18`,
            color: color,
            border: `1px solid ${color}40`,
          }}
        >
          {monogram}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium" style={{ color: TEXT_PRIMARY }}>
            {school}
          </p>
          <p className="mt-0.5 text-xs" style={{ color: TEXT_SECONDARY }}>
            {degree}
          </p>
          <p className="mt-0.5 text-xs" style={{ color: TEXT_SECONDARY }}>
            {period} &middot;{" "}
            <span style={{ color: color }}>{grade}</span>
          </p>
        </div>
      </div>
    </FadeUp>
  )
}

/* ─── Profile photo with rotating border ─── */
function ProfilePhoto() {
  const [imgError, setImgError] = useState(false)

  return (
    <FadeUp i={1}>
      <div className="flex items-center justify-center">
        <div className="relative">
          {/* Outer glow ring */}
          <div
            className="absolute -inset-2 animate-pulse rounded-full opacity-40 blur-md"
            style={{
              background: `conic-gradient(from 0deg, ${AMBER}, ${BLUE}, ${GREEN}, ${AMBER})`,
            }}
          />
          {/* Rotating conic-gradient border */}
          <div
            className="relative h-40 w-40 rounded-full p-[3px] md:h-48 md:w-48"
            style={{
              background: `conic-gradient(from var(--border-angle, 0deg), ${AMBER}, ${BLUE}, ${GREEN}, ${AMBER})`,
              animation: "border-rotate 4s linear infinite",
            }}
          >
            <div
              className="flex h-full w-full items-center justify-center overflow-hidden rounded-full"
              style={{ background: SURFACE }}
            >
              {!imgError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/images/profile.jpg"
                  alt="Atharva Soundankar"
                  className="h-full w-full rounded-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span
                  className="text-4xl font-bold font-heading"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${AMBER}, ${GOLD})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  AS
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

/* ─── Marquee ticker ─── */
const LEARNING_ITEMS = [
  "LLMs",
  "RAG Pipelines",
  "Apache Kafka",
  "MLOps",
  "AWS SageMaker",
  "LangChain",
  "Vector Databases",
  "Apache Spark",
  "Kubernetes",
]

function MarqueeTicker() {
  return (
    <FadeUp i={5}>
      <div
        className="overflow-hidden rounded-xl px-4 py-4 backdrop-blur-xl"
        style={{
          background: GLASS_BG,
          border: `1px solid ${BORDER}`,
        }}
      >
        <p
          className="mb-2 text-xs font-medium uppercase tracking-widest"
          style={{ color: TEXT_SECONDARY }}
        >
          Currently Learning
        </p>
        <div className="relative overflow-hidden">
          {/* Fade masks */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12"
            style={{
              background: `linear-gradient(to right, ${CARD}, transparent)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12"
            style={{
              background: `linear-gradient(to left, ${CARD}, transparent)`,
            }}
          />
          <div className="animate-marquee flex w-max items-center gap-0">
            {[...LEARNING_ITEMS, ...LEARNING_ITEMS].map((item, idx) => (
              <span key={idx} className="flex items-center gap-3 pr-3">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: AMBER }}
                />
                <span
                  className="whitespace-nowrap text-sm font-medium"
                  style={{ color: TEXT_PRIMARY }}
                >
                  {item}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

/* ─── Main About Section ─── */
export function AboutSection() {
  return (
    <section
      id="about"
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
          <div className="mb-14 flex items-center gap-3">
            <div
              className="h-px flex-1 max-w-[60px]"
              style={{ background: `linear-gradient(to right, ${AMBER}, transparent)` }}
            />
            <span
              className="text-xs font-medium uppercase tracking-[0.25em]"
              style={{ color: AMBER }}
            >
              About
            </span>
          </div>
        </FadeUp>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-[auto_auto_auto]">
          {/* ─ Bio cell: spans 7 cols, 2 rows ─ */}
          <FadeUp i={1} className="md:col-span-7 md:row-span-2">
            <div
              className="flex h-full flex-col justify-center rounded-xl px-6 py-8 backdrop-blur-xl md:px-8 md:py-10"
              style={{
                background: GLASS_BG,
                border: `1px solid ${BORDER}`,
              }}
            >
              <h2
                className="mb-5 text-3xl font-bold tracking-tight font-heading md:text-4xl"
                style={{ color: TEXT_PRIMARY }}
              >
                The Story Behind the Data
              </h2>
              <p
                className="text-base leading-relaxed md:text-lg md:leading-relaxed"
                style={{ color: TEXT_SECONDARY }}
              >
                Data Analyst & AI Practitioner with expertise in{" "}
                <Highlight>Python</Highlight>, SQL, Power BI, and{" "}
                <Highlight>Machine Learning</Highlight>. I turn raw data into
                actionable insights and build scalable, end-to-end{" "}
                <Highlight>AI solutions</Highlight>. Currently pursuing Master
                of AI in Business at{" "}
                <Highlight>SP Jain</Highlight> School of Global Management,
                Mumbai.
              </p>
            </div>
          </FadeUp>

          {/* ─ Profile photo: spans 5 cols, 1 row ─ */}
          <div className="md:col-span-5">
            <div
              className="flex items-center justify-center rounded-xl px-6 py-8 backdrop-blur-xl"
              style={{
                background: GLASS_BG,
                border: `1px solid ${BORDER}`,
              }}
            >
              <ProfilePhoto />
            </div>
          </div>

          {/* ─ 4 stat cells: spans 5 cols, 1 row (2x2 grid) ─ */}
          <div className="grid grid-cols-2 gap-4 md:col-span-5">
            <StatCell value={10} suffix="+" label="Projects" i={2} />
            <StatCell value={5} suffix="+" label="Certifications" i={3} />
            <StatCell value={2} suffix="+" label="Years" i={4} />
            <StatCell value={1} suffix="" label="Paper Published" i={5} />
          </div>

          {/* ─ Currently Learning marquee: full width ─ */}
          <div className="md:col-span-7">
            <MarqueeTicker />
          </div>

          {/* ─ Education cards: spans 5 cols ─ */}
          <div className="flex flex-col gap-4 md:col-span-5">
            <EduCard
              monogram="SPJ"
              color={AMBER}
              school="SP Jain School of Global Management"
              degree="Master of AI in Business"
              period="Sept 2025 – 2027"
              grade="Admitted"
              i={6}
            />
            <EduCard
              monogram="SPPU"
              color={BLUE}
              school="Savitribai Phule Pune University"
              degree="MSc Computer Application"
              period="2023 – 2025"
              grade="A+ Grade"
              i={7}
            />
            <EduCard
              monogram="SPPU"
              color={BLUE}
              school="Savitribai Phule Pune University"
              degree="BSc Computer Science"
              period="2020 – 2023"
              grade="A Grade"
              i={8}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
