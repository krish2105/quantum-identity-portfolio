"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

/* ── Configuration ── */
const NODE_COUNT = 60
const EDGE_THRESHOLD = 3.2
const MOUSE_RADIUS = 4.0

/* ── Shared mouse (NDC -1..1) updated by DOM listener ── */
const mouse = { x: 0, y: 0 }

/* ── Generate node base positions ── */
function generateNodes(n: number): Float32Array {
  const arr = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    arr[i * 3] = (Math.random() - 0.5) * 14
    arr[i * 3 + 1] = (Math.random() - 0.5) * 9
    arr[i * 3 + 2] = (Math.random() - 0.5) * 4
  }
  return arr
}

/* ── Build edge index pairs ── */
function generateEdges(pos: Float32Array, threshold: number): [number, number][] {
  const pairs: [number, number][] = []
  const n = pos.length / 3
  const v1 = new THREE.Vector3()
  const v2 = new THREE.Vector3()
  for (let i = 0; i < n; i++) {
    v1.set(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2])
    for (let j = i + 1; j < n; j++) {
      v2.set(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2])
      if (v1.distanceTo(v2) < threshold) pairs.push([i, j])
    }
  }
  return pairs
}

/* ── Instanced sphere nodes ── */
function Nodes({
  basePos,
  phases,
}: {
  basePos: Float32Array
  phases: Float32Array
}) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const count = basePos.length / 3
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const color = useMemo(() => new THREE.Color(), [])

  // pre-build per-instance colors
  useEffect(() => {
    const m = ref.current
    if (!m) return
    for (let i = 0; i < count; i++) {
      // cyan tint
      color.setRGB(0.13, 0.83, 0.93)
      m.setColorAt(i, color)
    }
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  }, [count, color])

  useFrame(({ clock }) => {
    const m = ref.current
    if (!m) return
    const t = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const bx = basePos[i * 3]
      const by = basePos[i * 3 + 1]
      const bz = basePos[i * 3 + 2]
      const ph = phases[i]

      // gentle floating
      const fx = Math.cos(t * 0.25 + ph * 0.6) * 0.15
      const fy = Math.sin(t * 0.35 + ph) * 0.18

      // mouse parallax push
      const dx = mouse.x * 7 - bx
      const dy = mouse.y * 4.5 - by
      const dist = Math.sqrt(dx * dx + dy * dy)
      const influence = Math.max(0, 1 - dist / MOUSE_RADIUS)
      const px = -dx * influence * 0.12
      const py = -dy * influence * 0.12

      dummy.position.set(bx + fx + px, by + fy + py, bz)

      // pulse scale
      const pulse = 1 + Math.sin(t * 1.8 + ph) * 0.3
      const prox = 1 + influence * 1.2
      dummy.scale.setScalar(pulse * prox)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)

      // glow near mouse: cyan -> warm
      const r = 0.13 + influence * 0.83
      const g = 0.83 - influence * 0.2
      const b = 0.93 - influence * 0.5
      color.setRGB(r, g, b)
      m.setColorAt(i, color)
    }
    m.instanceMatrix.needsUpdate = true
    if (m.instanceColor) m.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.055, 12, 12]} />
      <meshBasicMaterial toneMapped={false} transparent opacity={0.9} vertexColors />
    </instancedMesh>
  )
}

/* ── Dynamic edge lines ── */
function Edges({
  basePos,
  edges,
  phases,
}: {
  basePos: Float32Array
  edges: [number, number][]
  phases: Float32Array
}) {
  const ref = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const positions = new Float32Array(edges.length * 6)
    const colors = new Float32Array(edges.length * 6)
    // init
    for (let i = 0; i < edges.length; i++) {
      const [a, b] = edges[i]
      const o = i * 6
      positions[o] = basePos[a * 3]
      positions[o + 1] = basePos[a * 3 + 1]
      positions[o + 2] = basePos[a * 3 + 2]
      positions[o + 3] = basePos[b * 3]
      positions[o + 4] = basePos[b * 3 + 1]
      positions[o + 5] = basePos[b * 3 + 2]
      // dim cyan
      colors[o] = 0.08
      colors[o + 1] = 0.45
      colors[o + 2] = 0.55
      colors[o + 3] = 0.08
      colors[o + 4] = 0.45
      colors[o + 5] = 0.55
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return geo
  }, [basePos, edges])

  useFrame(({ clock }) => {
    const seg = ref.current
    if (!seg) return
    const t = clock.getElapsedTime()
    const posAttr = seg.geometry.getAttribute("position") as THREE.BufferAttribute
    const colAttr = seg.geometry.getAttribute("color") as THREE.BufferAttribute
    const posArr = posAttr.array as Float32Array
    const colArr = colAttr.array as Float32Array

    for (let i = 0; i < edges.length; i++) {
      const [a, b] = edges[i]

      // update both vertex positions to match node animation
      for (let w = 0; w < 2; w++) {
        const ni = w === 0 ? a : b
        const bx = basePos[ni * 3]
        const by = basePos[ni * 3 + 1]
        const bz = basePos[ni * 3 + 2]
        const ph = phases[ni]

        const fx = Math.cos(t * 0.25 + ph * 0.6) * 0.15
        const fy = Math.sin(t * 0.35 + ph) * 0.18
        const dx = mouse.x * 7 - bx
        const dy = mouse.y * 4.5 - by
        const dist = Math.sqrt(dx * dx + dy * dy)
        const inf = Math.max(0, 1 - dist / MOUSE_RADIUS)
        const px = -dx * inf * 0.12
        const py = -dy * inf * 0.12

        const off = i * 6 + w * 3
        posArr[off] = bx + fx + px
        posArr[off + 1] = by + fy + py
        posArr[off + 2] = bz
      }

      // midpoint proximity for edge glow
      const mx = (posArr[i * 6] + posArr[i * 6 + 3]) / 2
      const my = (posArr[i * 6 + 1] + posArr[i * 6 + 4]) / 2
      const emx = mouse.x * 7 - mx
      const emy = mouse.y * 4.5 - my
      const glow = Math.max(0, 1 - Math.sqrt(emx * emx + emy * emy) / MOUSE_RADIUS)

      // dim cyan -> warm amber near mouse
      const r = 0.08 + glow * 0.88
      const g = 0.45 + glow * 0.37
      const bv = 0.55 - glow * 0.3

      for (let v = 0; v < 2; v++) {
        colArr[i * 6 + v * 3] = r
        colArr[i * 6 + v * 3 + 1] = g
        colArr[i * 6 + v * 3 + 2] = bv
      }
    }

    posAttr.needsUpdate = true
    colAttr.needsUpdate = true
  })

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial vertexColors transparent opacity={0.3} toneMapped={false} />
    </lineSegments>
  )
}

/* ── Scene root ── */
function Scene() {
  const data = useMemo(() => {
    const basePos = generateNodes(NODE_COUNT)
    const edges = generateEdges(basePos, EDGE_THRESHOLD)
    const phases = new Float32Array(NODE_COUNT)
    for (let i = 0; i < NODE_COUNT; i++) phases[i] = Math.random() * Math.PI * 2
    return { basePos, edges, phases }
  }, [])

  return (
    <>
      <Nodes basePos={data.basePos} phases={data.phases} />
      <Edges basePos={data.basePos} edges={data.edges} phases={data.phases} />
    </>
  )
}

/* ── Exported component ── */
export function NeuralNetworkBg() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track mouse via DOM (avoids invisible-plane issues in R3F)
  useEffect(() => {
    function handleMove(e: PointerEvent) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("pointermove", handleMove, { passive: true })
    return () => window.removeEventListener("pointermove", handleMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        frameloop="always"
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
