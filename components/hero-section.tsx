"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { ArrowDown, Download } from "lucide-react"
import { TypingAnimation } from "@/components/typing-animation"
import { SocialLinks } from "@/components/social-links"

const NeuralNetworkBg = dynamic(
  () =>
    import("@/components/neural-network-bg").then((mod) => mod.NeuralNetworkBg),
  { ssr: false }
)

export function HeroSection() {
  // Delay-mount R3F to avoid SSR/hydration flicker
  const [showBg, setShowBg] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setShowBg(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "#0D0D0D" }}
    >
      {/* Layer 0: Three.js neural network -- contained within this section */}
      {showBg && <NeuralNetworkBg />}

      {/* Layer 1: Radial vignette to fade edges */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, #0D0D0D 80%)",
        }}
        aria-hidden="true"
      />

      {/* Layer 2: Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-24 text-center">
        {/* Open for opportunities badge */}
        <div className="mb-10 flex items-center gap-2.5 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
          </span>
          <span className="text-xs font-medium tracking-wide text-[#4ADE80]">
            Open for Opportunities
          </span>
        </div>

        {/* Name with gradient */}
        <h1 className="mb-4 text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #F59E0B 0%, #D97706 25%, #8B5CF6 50%, #3B82F6 75%, #60A5FA 100%)",
            }}
          >
            Atharva Soundankar
          </span>
        </h1>

        {/* Terminal typing */}
        <div className="mb-6 flex h-8 items-center justify-center rounded-md border border-border bg-[#141414]/70 px-4 py-5 backdrop-blur-sm">
          <TypingAnimation />
        </div>

        {/* Description */}
        <p className="mb-10 max-w-lg text-base leading-relaxed text-[#A3A3A3]">
          Building intelligent systems at the intersection of machine learning,
          big data, and scalable infrastructure. Turning complex data into
          actionable insight.
        </p>

        {/* CTA Buttons */}
        <div className="mb-12 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }}
            className="group inline-flex h-11 items-center gap-2 rounded-lg px-7 text-sm font-semibold text-[#0D0D0D] transition-all duration-300 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
            style={{
              background: "linear-gradient(135deg, #22D3EE, #3B82F6)",
            }}
          >
            View My Work
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path
                d="M3 8h10m0 0L9 4m4 4L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="https://drive.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-[#141414]/60 px-7 text-sm font-medium text-[#E5E5E5] backdrop-blur-sm transition-all duration-300 hover:border-[#525252] hover:bg-[#1A1A1A]"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </div>

        {/* Social links */}
        <SocialLinks />
      </div>

      {/* Layer 3: Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault()
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }}
          aria-label="Scroll to about section"
          className="flex flex-col items-center gap-2 text-[#737373] transition-colors duration-300 hover:text-[#E5E5E5]"
        >
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase">
            Scroll
          </span>
          {/* Mouse wheel icon */}
          <div className="flex h-7 w-4 items-start justify-center rounded-full border border-[#404040] p-1">
            <span className="h-1.5 w-0.5 animate-bounce rounded-full bg-[#737373]" />
          </div>
          <ArrowDown className="h-3 w-3 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
