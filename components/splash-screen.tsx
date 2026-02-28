"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface Node {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  radius: number
  opacity: number
  layer: number
}

interface Edge {
  from: number
  to: number
  opacity: number
  progress: number
}

function createNetwork(width: number, height: number): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = []
  const edges: Edge[] = []
  const layers = 5
  const nodesPerLayer = [3, 5, 7, 5, 3]
  const layerSpacing = width / (layers + 1)

  for (let l = 0; l < layers; l++) {
    const count = nodesPerLayer[l]
    const verticalSpacing = height / (count + 1)
    for (let n = 0; n < count; n++) {
      const targetX = layerSpacing * (l + 1)
      const targetY = verticalSpacing * (n + 1)
      nodes.push({
        x: width / 2 + (Math.random() - 0.5) * 200,
        y: height / 2 + (Math.random() - 0.5) * 200,
        targetX,
        targetY,
        vx: 0,
        vy: 0,
        radius: l === 0 || l === layers - 1 ? 3 : 2.5,
        opacity: 0,
        layer: l,
      })
    }
  }

  let nodeIndex = 0
  for (let l = 0; l < layers - 1; l++) {
    const currentLayerStart = nodeIndex
    const currentLayerCount = nodesPerLayer[l]
    const nextLayerStart = currentLayerStart + currentLayerCount
    const nextLayerCount = nodesPerLayer[l + 1]

    for (let i = 0; i < currentLayerCount; i++) {
      for (let j = 0; j < nextLayerCount; j++) {
        if (Math.random() < 0.6) {
          edges.push({
            from: currentLayerStart + i,
            to: nextLayerStart + j,
            opacity: 0,
            progress: 0,
          })
        }
      }
    }
    nodeIndex += currentLayerCount
  }

  return { nodes, edges }
}

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [progress, setProgress] = useState(0)
  const [nameOpacity, setNameOpacity] = useState(0)
  const [dissolving, setDissolving] = useState(false)
  const [screenOpacity, setScreenOpacity] = useState(1)
  const animRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const networkRef = useRef<{ nodes: Node[]; edges: Edge[] } | null>(null)

  const TOTAL_DURATION = 2800
  const DISSOLVE_DURATION = 500

  const animate = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const now = performance.now()
      if (!startTimeRef.current) startTimeRef.current = now
      const elapsed = now - startTimeRef.current
      const t = Math.min(elapsed / TOTAL_DURATION, 1)

      setProgress(Math.floor(t * 100))

      if (t > 0.3) {
        setNameOpacity(Math.min((t - 0.3) / 0.3, 1))
      }

      ctx.clearRect(0, 0, width, height)

      const network = networkRef.current
      if (!network) return

      const { nodes, edges } = network

      for (const node of nodes) {
        const arrival = Math.min(t * 2.5, 1)
        node.x += (node.targetX - node.x) * 0.04 * arrival
        node.y += (node.targetY - node.y) * 0.04 * arrival
        node.opacity = Math.min(t * 3, 1)
      }

      for (const edge of edges) {
        edge.progress = Math.min(t * 2, 1)
        edge.opacity = Math.min(t * 2.5, 0.3)
      }

      // Draw edges
      for (const edge of edges) {
        if (edge.progress <= 0) continue
        const fromNode = nodes[edge.from]
        const toNode = nodes[edge.to]
        const endX = fromNode.x + (toNode.x - fromNode.x) * edge.progress
        const endY = fromNode.y + (toNode.y - fromNode.y) * edge.progress

        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = `rgba(245, 158, 11, ${edge.opacity})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Draw nodes
      for (const node of nodes) {
        if (node.opacity <= 0) continue
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        const isOuter = node.layer === 0 || node.layer === 4
        if (isOuter) {
          ctx.fillStyle = `rgba(245, 158, 11, ${node.opacity * 0.9})`
        } else {
          ctx.fillStyle = `rgba(59, 130, 246, ${node.opacity * 0.7})`
        }
        ctx.fill()

        // Glow
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 3
        )
        if (isOuter) {
          gradient.addColorStop(0, `rgba(245, 158, 11, ${node.opacity * 0.15})`)
        } else {
          gradient.addColorStop(0, `rgba(59, 130, 246, ${node.opacity * 0.1})`)
        }
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Pulsing signal along edges
      if (t > 0.4) {
        const pulseT = ((elapsed % 1500) / 1500)
        for (let i = 0; i < edges.length; i += 3) {
          const edge = edges[i]
          const fromNode = nodes[edge.from]
          const toNode = nodes[edge.to]
          const px = fromNode.x + (toNode.x - fromNode.x) * pulseT
          const py = fromNode.y + (toNode.y - fromNode.y) * pulseT
          ctx.beginPath()
          ctx.arc(px, py, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(245, 158, 11, ${0.6 * (1 - pulseT)})`
          ctx.fill()
        }
      }

      if (t < 1) {
        animRef.current = requestAnimationFrame(() => animate(ctx, width, height))
      } else {
        // Trigger dissolve
        setDissolving(true)
      }
    },
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.scale(dpr, dpr)

    networkRef.current = createNetwork(rect.width, rect.height)
    animRef.current = requestAnimationFrame(() => animate(ctx, rect.width, rect.height))

    return () => cancelAnimationFrame(animRef.current)
  }, [animate])

  useEffect(() => {
    if (!dissolving) return
    let start: number
    function fadeOut(timestamp: number) {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const opacity = 1 - elapsed / DISSOLVE_DURATION
      setScreenOpacity(Math.max(opacity, 0))
      if (elapsed < DISSOLVE_DURATION) {
        requestAnimationFrame(fadeOut)
      } else {
        onComplete()
      }
    }
    requestAnimationFrame(fadeOut)
  }, [dissolving, onComplete])

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      style={{ opacity: screenOpacity }}
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Neural network canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Name fade-in */}
        <h1
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ opacity: nameOpacity, transition: "opacity 0.3s ease" }}
        >
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

        {/* Progress bar */}
        <div className="flex w-56 flex-col items-center gap-2">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full transition-[width] duration-100 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #F59E0B, #3B82F6)",
              }}
            />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  )
}
