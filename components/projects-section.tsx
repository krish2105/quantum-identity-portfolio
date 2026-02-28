"use client"

import { useState, useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

/* ─── Design tokens ─── */
const AMBER = "#FF6B35"
const GOLD = "#FFB800"
const BLUE = "#0096FF"
const TEXT_PRIMARY = "#F5F5F5"
const TEXT_SECONDARY = "#A0A0A0"
const BORDER = "rgba(255,107,53,0.15)"
const GLASS_BG = "rgba(255,107,53,0.05)"
const SURFACE = "#141414"
const CARD_BG = "#1A1A1A"

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

/* ─── Categories ─── */
type Category =
  | "All"
  | "Machine Learning"
  | "Data Analysis"
  | "Big Data"
  | "Full Stack"

const FILTERS: Category[] = [
  "All",
  "Machine Learning",
  "Data Analysis",
  "Big Data",
  "Full Stack",
]

/* ─── Project data ─── */
interface Project {
  title: string
  badge?: { text: string; color: string }
  featured?: boolean
  description: string
  tech: string[]
  metrics?: string[]
  architecture?: string
  github: string
  liveDemo?: string
  liveDemoLabel?: string
  categories: Category[]
  accentColor: string
}

const PROJECTS: Project[] = [
  {
    title: "Lulu Sales Intelligence Dashboard",
    badge: { text: "ENTERPRISE", color: GOLD },
    featured: true,
    description:
      "Enterprise-grade real-time sales analytics platform for Lulu Hypermarket UAE. Live SSE streaming, AI chat assistant with OpenAI, 4-tier RBAC, Docker Compose deployment.",
    tech: [
      "Next.js",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Redis",
      "Docker",
      "TypeScript",
      "OpenAI",
      "JWT",
      "SSE",
      "NGINX",
      "GitHub Actions",
    ],
    metrics: ["Real-time SSE", "4-Tier RBAC", "AI + Voice", "CI/CD Pipeline"],
    architecture: "NGINX \u2192 Next.js + FastAPI \u2192 PostgreSQL + Redis",
    github:
      "https://github.com/mercydeez/lulu-sales-intelligence-dashboard",
    categories: ["Big Data", "Full Stack"],
    accentColor: GOLD,
  },
  {
    title: "Forest Fire Risk Prediction",
    description:
      "Predicts forest fire risk from environmental factors. Real-time predictions and visualizations.",
    tech: ["Python", "Scikit-learn", "Streamlit"],
    metrics: ["Risk Classification Model"],
    github: "https://github.com/mercydeez/forest-fire-risk-prediction",
    liveDemo:
      "https://forest-fire-risk-prediction-d9vmff5zuuvjvgoyjqjvpr.streamlit.app/",
    categories: ["Machine Learning"],
    accentColor: AMBER,
  },
  {
    title: "Lung Cancer Risk Prediction",
    description:
      "Streamlit ML app predicting lung cancer risk using Random Forest classifier.",
    tech: ["Python", "Random Forest", "Streamlit"],
    metrics: ["Random Forest Classifier"],
    github: "https://github.com/mercydeez/lung_cancer_predictor",
    liveDemo:
      "https://mercydeez-lung-cancer-predictor-app-cc7nc0.streamlit.app/",
    categories: ["Machine Learning"],
    accentColor: AMBER,
  },
  {
    title: "Insurance Analysis Dashboard",
    description:
      "Power BI dashboard with policy sales, claims, demographics, and revenue insights.",
    tech: ["Power BI", "DAX", "Business Intelligence"],
    metrics: ["BI Dashboard"],
    github: "https://github.com/mercydeez/Murphy_Insurance",
    liveDemo: "#",
    liveDemoLabel: "View Dashboard",
    categories: ["Data Analysis"],
    accentColor: BLUE,
  },
  {
    title: "Google Play Store Analysis",
    description:
      "EDA on Play Store data uncovering trends in app categories, ratings, and installs.",
    tech: ["Python", "Pandas", "Seaborn", "Matplotlib"],
    metrics: ["Exploratory Data Analysis"],
    github: "https://github.com/mercydeez/Google-Play-Analysis",
    categories: ["Data Analysis"],
    accentColor: BLUE,
  },
]

/* ─── 3D Tilt hook (via CSS) ─── */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)"
  }

  return { ref, handleMove, handleLeave }
}

/* ─── Tech badge ─── */
function TechBadge({ label }: { label: string }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[11px] font-medium"
      style={{
        background: "rgba(255,255,255,0.06)",
        color: TEXT_SECONDARY,
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {label}
    </span>
  )
}

/* ─── Mini KPI card ─── */
function KPICard({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg px-3 py-2 text-center"
      style={{
        background: SURFACE,
        border: `1px solid ${BORDER}`,
      }}
    >
      <span
        className="text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: TEXT_PRIMARY }}
      >
        {label}
      </span>
    </div>
  )
}

/* ─── GitHub icon ─── */
function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* ─── External link icon ─── */
function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

/* ─── Star icon ─── */
function StarIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

/* ─── Featured project card ─── */
function FeaturedCard({ project }: { project: Project }) {
  const { ref, handleMove, handleLeave } = useTilt()

  return (
    <FadeUp i={3} className="col-span-full">
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative overflow-hidden rounded-2xl transition-transform duration-300 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Animated gradient border */}
        <div
          className="absolute -inset-[1px] rounded-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `conic-gradient(from var(--border-angle, 0deg), ${AMBER}, ${GOLD}, ${BLUE}, ${AMBER})`,
            animation: "border-rotate 4s linear infinite",
          }}
        />

        {/* Inner card */}
        <div
          className="relative rounded-2xl px-6 py-8 md:px-10 md:py-10"
          style={{ background: CARD_BG }}
        >
          {/* Gold enterprise badge */}
          {project.badge && (
            <div className="mb-6 flex items-center gap-2">
              <div
                className="flex items-center gap-1.5 rounded-full px-3 py-1"
                style={{
                  background: `${project.badge.color}15`,
                  border: `1px solid ${project.badge.color}40`,
                }}
              >
                <StarIcon />
                <span
                  className="text-[11px] font-bold uppercase tracking-widest"
                  style={{ color: project.badge.color }}
                >
                  {project.badge.text}
                </span>
              </div>
              <div
                className="rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                style={{
                  background: `${AMBER}15`,
                  color: AMBER,
                  border: `1px solid ${AMBER}30`,
                }}
              >
                Featured
              </div>
            </div>
          )}

          <h3
            className="mb-3 text-2xl font-bold font-heading md:text-3xl"
            style={{ color: TEXT_PRIMARY }}
          >
            {project.title}
          </h3>

          <p
            className="mb-6 max-w-2xl text-base leading-relaxed"
            style={{ color: TEXT_SECONDARY }}
          >
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>

          {/* KPI row */}
          {project.metrics && (
            <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              {project.metrics.map((m) => (
                <KPICard key={m} label={m} />
              ))}
            </div>
          )}

          {/* Architecture preview */}
          {project.architecture && (
            <div
              className="mb-8 overflow-x-auto rounded-lg px-4 py-3 font-mono text-sm"
              style={{
                background: "rgba(0,0,0,0.4)",
                color: AMBER,
                border: `1px solid ${BORDER}`,
              }}
            >
              {project.architecture}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:opacity-90"
              style={{
                background: `linear-gradient(135deg, ${AMBER}, ${GOLD})`,
                color: "#0D0D0D",
              }}
            >
              <GitHubIcon />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

/* ─── Standard project card ─── */
function ProjectCard({
  project,
  i,
}: {
  project: Project
  i: number
}) {
  const { ref, handleMove, handleLeave } = useTilt()

  return (
    <FadeUp i={i}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl transition-transform duration-300 ease-out"
        style={{
          background: GLASS_BG,
          border: `1px solid ${BORDER}`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Top accent line */}
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(to right, ${project.accentColor}, transparent)`,
          }}
        />

        <div className="flex flex-1 flex-col px-5 py-6">
          {/* Category dot */}
          <div className="mb-3 flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: project.accentColor }}
            />
            <span className="text-[11px] uppercase tracking-wider" style={{ color: TEXT_SECONDARY }}>
              {project.categories[0]}
            </span>
          </div>

          <h3
            className="mb-2 text-lg font-bold font-heading"
            style={{ color: TEXT_PRIMARY }}
          >
            {project.title}
          </h3>

          <p
            className="mb-4 flex-1 text-sm leading-relaxed"
            style={{ color: TEXT_SECONDARY }}
          >
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <TechBadge key={t} label={t} />
            ))}
          </div>

          {/* Metric */}
          {project.metrics && project.metrics.length > 0 && (
            <div
              className="mb-5 rounded-lg px-3 py-2 text-center font-mono text-xs"
              style={{
                background: SURFACE,
                color: project.accentColor,
                border: `1px solid ${BORDER}`,
              }}
            >
              {project.metrics[0]}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-300"
              style={{
                border: `1px solid ${BORDER}`,
                color: TEXT_PRIMARY,
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = project.accentColor
                e.currentTarget.style.background = `${project.accentColor}10`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER
                e.currentTarget.style.background = "transparent"
              }}
            >
              <GitHubIcon />
              GitHub
            </a>
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all duration-300"
                style={{
                  background: `${project.accentColor}15`,
                  color: project.accentColor,
                  border: `1px solid ${project.accentColor}30`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${project.accentColor}25`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${project.accentColor}15`
                }}
              >
                <ExternalIcon />
                {project.liveDemoLabel || "Live Demo"}
              </a>
            )}
          </div>
        </div>

        {/* Hover glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${project.accentColor}08 0%, transparent 60%)`,
          }}
        />
      </div>
    </FadeUp>
  )
}

/* ─── Main Projects Section ─── */
export function ProjectsSection() {
  const [active, setActive] = useState<Category>("All")

  const featured = PROJECTS.find((p) => p.featured)
  const standard = PROJECTS.filter((p) => !p.featured)

  const filteredStandard =
    active === "All"
      ? standard
      : standard.filter((p) => p.categories.includes(active))

  const showFeatured =
    active === "All" ||
    (featured?.categories.some((c) => c === active) ?? false)

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "#0D0D0D" }}
    >
      {/* Grid background */}
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
        {/* Section header */}
        <FadeUp i={0}>
          <div className="mb-4 flex items-center gap-3">
            <div
              className="h-px flex-1 max-w-[60px]"
              style={{
                background: `linear-gradient(to right, ${AMBER}, transparent)`,
              }}
            />
            <span
              className="text-xs font-medium uppercase tracking-[0.25em]"
              style={{ color: AMBER }}
            >
              Projects
            </span>
          </div>
        </FadeUp>

        <FadeUp i={1}>
          <div className="mb-4 flex items-center gap-3">
            <h2
              className="text-3xl font-bold tracking-tight font-heading md:text-4xl"
              style={{ color: TEXT_PRIMARY }}
            >
              The Lab
            </h2>
            <span className="text-2xl" role="img" aria-label="lightbulb">
              {'💡'}
            </span>
          </div>
          <p className="mb-10 text-base" style={{ color: TEXT_SECONDARY }}>
            Showcasing My Best Work
          </p>
        </FadeUp>

        {/* Filter buttons */}
        <FadeUp i={2}>
          <div className="mb-12 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-300"
                style={
                  active === f
                    ? {
                        background: AMBER,
                        color: "#0D0D0D",
                        border: `1px solid ${AMBER}`,
                      }
                    : {
                        background: "transparent",
                        color: TEXT_SECONDARY,
                        border: `1px solid ${BORDER}`,
                      }
                }
                onMouseEnter={(e) => {
                  if (active !== f) {
                    e.currentTarget.style.borderColor = `${AMBER}60`
                    e.currentTarget.style.color = TEXT_PRIMARY
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== f) {
                    e.currentTarget.style.borderColor = BORDER
                    e.currentTarget.style.color = TEXT_SECONDARY
                  }
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Featured full-width card */}
          {showFeatured && featured && <FeaturedCard project={featured} />}

          {/* Standard cards */}
          {filteredStandard.map((p, idx) => (
            <ProjectCard key={p.title} project={p} i={idx + 4} />
          ))}
        </div>

        {/* No results */}
        {!showFeatured && filteredStandard.length === 0 && (
          <FadeUp i={3}>
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-lg" style={{ color: TEXT_SECONDARY }}>
                No projects in this category yet.
              </p>
            </div>
          </FadeUp>
        )}

        {/* Footer link */}
        <FadeUp i={8}>
          <div className="mt-16 flex justify-center">
            <a
              href="https://github.com/mercydeez"
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300"
              style={{ color: TEXT_SECONDARY }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = AMBER
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = TEXT_SECONDARY
              }}
            >
              Want to see more?
              <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                {'\u2192'}
              </span>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
