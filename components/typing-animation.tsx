"use client"

import { useState, useEffect, useRef } from "react"

const ROLES = ["AI Engineer", "Data Scientist", "Big Data Engineer"]
const TYPING_SPEED = 80
const DELETING_SPEED = 50
const PAUSE_AFTER_TYPING = 2000
const PAUSE_AFTER_DELETING = 400

export function TypingAnimation() {
  const [displayText, setDisplayText] = useState("")
  const stateRef = useRef({
    roleIndex: 0,
    charIndex: 0,
    isDeleting: false,
  })

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    function tick() {
      const { roleIndex, charIndex, isDeleting } = stateRef.current
      const currentRole = ROLES[roleIndex]

      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          stateRef.current.charIndex = charIndex + 1
          setDisplayText(currentRole.slice(0, charIndex + 1))
          timeout = setTimeout(tick, TYPING_SPEED)
        } else {
          stateRef.current.isDeleting = true
          timeout = setTimeout(tick, PAUSE_AFTER_TYPING)
        }
      } else {
        if (charIndex > 0) {
          stateRef.current.charIndex = charIndex - 1
          setDisplayText(currentRole.slice(0, charIndex - 1))
          timeout = setTimeout(tick, DELETING_SPEED)
        } else {
          stateRef.current.isDeleting = false
          stateRef.current.roleIndex = (roleIndex + 1) % ROLES.length
          timeout = setTimeout(tick, PAUSE_AFTER_DELETING)
        }
      }
    }

    timeout = setTimeout(tick, PAUSE_AFTER_DELETING)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <span className="inline-flex items-center font-mono text-lg md:text-xl">
      <span className="text-muted-foreground mr-2">{">"}</span>
      <span className="text-foreground">{displayText}</span>
      <span className="ml-0.5 inline-block h-5 w-[2px] bg-primary animate-pulse" />
    </span>
  )
}
