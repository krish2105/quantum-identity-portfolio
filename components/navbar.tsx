"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  // Auto-hide on scroll down, reappear on scroll up
  const handleScroll = useCallback(() => {
    const currentY = window.scrollY

    setScrolled(currentY > 20)

    if (currentY > lastScrollY.current && currentY > 80) {
      setVisible(false)
    } else {
      setVisible(true)
    }

    lastScrollY.current = currentY
    ticking.current = false
  }, [])

  useEffect(() => {
    function onScroll() {
      if (!ticking.current) {
        requestAnimationFrame(handleScroll)
        ticking.current = true
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [handleScroll])

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""))
    const observers: IntersectionObserver[] = []

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    }

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  function scrollToSection(href: string) {
    setMobileOpen(false)
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        visible ? "translate-y-0" : "-translate-y-full",
        scrolled
          ? "border-b border-border/50 bg-background/60 shadow-lg shadow-background/20 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo monogram */}
        <a
          href="#"
          className="group relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary transition-colors duration-200 hover:border-primary/50"
          aria-label="Back to top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        >
          {/* Glow border on hover */}
          <span
            className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              boxShadow: "0 0 12px 2px rgba(245, 158, 11, 0.25)",
            }}
            aria-hidden="true"
          />
          <span className="text-sm font-bold text-foreground">
            AS
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex" role="menubar">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "")
            return (
              <li key={link.href} role="none">
                <button
                  role="menuitem"
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {/* Active underline */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-3 right-3 h-[2px] rounded-full transition-all duration-300",
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                    )}
                    style={{ background: "#22D3EE" }}
                    aria-hidden="true"
                  />
                </button>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection("#contact")
          }}
          className="hidden h-9 items-center rounded-lg px-4 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110 md:inline-flex"
          style={{
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
          }}
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-foreground transition-colors hover:bg-muted md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="border-border bg-background/95 backdrop-blur-xl"
          >
            <SheetHeader>
              <SheetTitle className="text-left text-foreground">Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 pt-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "")
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-left text-base font-medium transition-colors duration-200",
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <span
                        className="h-4 w-[2px] rounded-full"
                        style={{ background: "#22D3EE" }}
                        aria-hidden="true"
                      />
                    )}
                    {link.label}
                  </button>
                )
              })}
              <div className="mt-4 border-t border-border pt-4">
                <button
                  onClick={() => scrollToSection("#contact")}
                  className="flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-primary-foreground transition-all duration-200 hover:brightness-110"
                  style={{
                    background: "linear-gradient(135deg, #F59E0B, #D97706)",
                  }}
                >
                  Hire Me
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
