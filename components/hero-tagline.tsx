"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"

const TEXT = "HUMAN-IN-THE-LOOP · AUDITABLE · BUILT FOR HEALTHCARE"
const GLYPHS = "0123456789ABCDEF$%#v!@&*"
const FONT = "600 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
const LETTER_SPACING = "1.65px" // 0.15em × 11px
const CANVAS_H = 44
const TEXT_Y = 36  // y of text baseline center — leaves 36px of rain space above
const FADE_MS = 300

type Drop = {
  y: number
  speed: number
  glyph: string
  locked: boolean
  flash: number
}

function rg() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

interface HeroTaglineProps {
  delay?: number
}

export function HeroTagline({ delay = 1.35 }: HeroTaglineProps) {
  const prefersReducedMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rafId = 0
    let W = 0
    let charX: number[] = []
    let startTs: number | null = null
    let drops: Drop[] | null = null
    let allLocked = false
    let postLockFrames = 0

    const chars = TEXT.split("")

    function applyFont() {
      ctx!.font = FONT
      if ("letterSpacing" in ctx!) (ctx as any).letterSpacing = LETTER_SPACING
      ctx!.textBaseline = "middle"
      ctx!.textAlign = "left"
    }

    function setup() {
      const dpr = window.devicePixelRatio || 1
      W = canvas!.offsetWidth
      canvas!.width = W * dpr
      canvas!.height = CANVAS_H * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      applyFont()
      charX = chars.map((_, i) => ctx!.measureText(TEXT.slice(0, i)).width)
    }

    function drawResolved() {
      ctx!.clearRect(0, 0, W, CANVAS_H)
      applyFont()
      ctx!.fillStyle = "#52525b"
      ctx!.fillText(TEXT, 0, TEXT_Y)
    }

    function initDrops() {
      drops = chars.map((_, i) => ({
        y: -(CANVAS_H * 0.25) - i * 2,
        speed: 1.7 + Math.random() * 0.8,
        glyph: rg(),
        locked: false,
        flash: 0,
      }))
    }

    function frame(ts: number) {
      if (startTs === null) startTs = ts
      const elapsed = ts - startTs - delay * 1000

      if (elapsed < 0) {
        rafId = requestAnimationFrame(frame)
        return
      }

      // Lazy-init drops on the first active frame
      if (!drops) initDrops()

      const alpha = Math.min(elapsed / FADE_MS, 1)

      ctx!.clearRect(0, 0, W, CANVAS_H)
      ctx!.globalAlpha = alpha
      applyFont()

      let newAllLocked = true

      for (let i = 0; i < chars.length; i++) {
        const drop = drops![i]
        const x = charX[i]

        if (!drop.locked) {
          newAllLocked = false
          drop.y += drop.speed
          if (Math.random() < 0.2) drop.glyph = rg()

          if (drop.y >= TEXT_Y) {
            drop.locked = true
            drop.flash = 18
          } else {
            // Falling glyph — fade in as it descends into the canvas
            const visibility = Math.max(0, (drop.y + CANVAS_H * 0.25) / (TEXT_Y + CANVAS_H * 0.25))
            ctx!.fillStyle = `rgba(113,113,122,${visibility * 0.65})`
            ctx!.fillText(drop.glyph, x, drop.y)
            continue
          }
        }

        // Locked: bright flash settling to zinc-600
        if (drop.flash > 0) {
          const t = drop.flash / 18
          const v = Math.round(82 + t * 173) // #525 → #fff-ish → back to #525
          ctx!.fillStyle = `rgb(${v},${v},${v})`
          drop.flash--
        } else {
          ctx!.fillStyle = "#52525b"
        }
        ctx!.fillText(chars[i], x, TEXT_Y)
      }

      ctx!.globalAlpha = 1

      if (newAllLocked) allLocked = true

      if (allLocked) {
        postLockFrames++
        if (postLockFrames > 30) {
          drawResolved()
          return // stop RAF
        }
      }

      rafId = requestAnimationFrame(frame)
    }

    setup()

    if (prefersReducedMotion) {
      drawResolved()
      return
    }

    rafId = requestAnimationFrame(frame)

    const ro = new ResizeObserver(() => {
      setup()
      if (allLocked) drawResolved()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [delay, prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-label={TEXT}
      style={{ height: `${CANVAS_H}px`, width: "100%", display: "block" }}
    />
  )
}
