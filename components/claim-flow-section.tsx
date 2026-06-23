"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeUp } from "@/components/motion";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const NODES = [
  { id: "submit",   label: "Submit",    sub: "Clean claim built",      x: 80,  y: 130, color: "#60a5fa" },
  { id: "elig",     label: "Eligibility", sub: "Coverage verified",    x: 240, y: 130, color: "#34d399" },
  { id: "coding",   label: "Coding",    sub: "Codes validated",        x: 400, y: 130, color: "#a78bfa" },
  { id: "payer",    label: "Payer",     sub: "Claim received",         x: 560, y: 130, color: "#fbbf24" },
  { id: "era",      label: "ERA/EOB",   sub: "Response parsed",        x: 720, y: 130, color: "#60a5fa" },
  { id: "post",     label: "Posting",   sub: "Payment reconciled",     x: 880, y: 130, color: "#34d399" },
];

const DENIAL_NODES = [
  { id: "denial",   label: "Denial",   sub: "Root cause classified",   x: 560, y: 260, color: "#f87171" },
  { id: "appeal",   label: "Appeal",   sub: "Draft generated",         x: 400, y: 260, color: "#fbbf24" },
];

// Main path segments (node center to node center)
const MAIN_PATH = `M 80,130 L 240,130 L 400,130 L 560,130 L 720,130 L 880,130`;

// Denial branch: payer → denial → appeal → back to coding
const DENIAL_PATH = `M 560,130 C 560,170 560,230 560,260 L 400,260 C 400,260 400,220 400,130`;

// Particle waypoints along the main path
const PARTICLE_WAYPOINTS = [80, 240, 400, 560, 720, 880];

export function ClaimFlowSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 px-6 lg:px-10 border-t border-white/6 overflow-hidden grain">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-[130px]"
          style={{ background: "rgba(59,130,246,0.06)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[110px]"
          style={{ background: "rgba(167,139,250,0.05)" }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-none mx-auto">
        <FadeUp className="mb-14 max-w-2xl">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-zinc-700 mb-3">
            Claim journey
          </p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-white leading-[1.1] mb-4">
            From submission to payment.{" "}
            <span className="gradient-text">Fully automated.</span>
          </h2>
          <p className="text-zinc-500 leading-relaxed">
            Each step in the revenue cycle is handled by a dedicated agent.
            Denials are classified, appealed, and resubmitted without manual intervention.
          </p>
        </FadeUp>

        {/* SVG Diagram */}
        <div className="overflow-x-auto pb-4">
          <div style={{ minWidth: 960 }}>
            <svg
              viewBox="0 0 960 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "auto" }}
              aria-label="Claim journey from submission to payment posting"
            >
              {/* ── Main path ── */}
              <motion.path
                d={MAIN_PATH}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={1.5}
                strokeDasharray="8 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 }}
              />

              {/* Main path glow (solid, brighter) */}
              <motion.path
                d={MAIN_PATH}
                stroke="url(#mainGrad)"
                strokeWidth={1.5}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
              />

              {/* ── Denial branch ── */}
              <motion.path
                d={DENIAL_PATH}
                stroke="rgba(248,113,113,0.25)"
                strokeWidth={1.5}
                strokeDasharray="6 3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.2, ease: "easeOut", delay: 1.4 }}
              />

              {/* ── Gradient defs ── */}
              <defs>
                <linearGradient id="mainGrad" x1="80" y1="130" x2="880" y2="130" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                  <stop offset="40%" stopColor="#a78bfa" stopOpacity="0.5" />
                  <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#34d399" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* ── Travelling particle on main path ── */}
              {inView && (
                <motion.circle
                  r={3.5}
                  fill="#60a5fa"
                  style={{ filter: "drop-shadow(0 0 5px #3b82f6)" }}
                  animate={{
                    x: PARTICLE_WAYPOINTS,
                    y: Array(PARTICLE_WAYPOINTS.length).fill(130),
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.5,
                    times: PARTICLE_WAYPOINTS.map((_, i) => i / (PARTICLE_WAYPOINTS.length - 1)),
                  }}
                />
              )}

              {/* Second particle with offset */}
              {inView && (
                <motion.circle
                  r={2.5}
                  fill="#a78bfa"
                  style={{ filter: "drop-shadow(0 0 4px #7c3aed)" }}
                  animate={{
                    x: PARTICLE_WAYPOINTS,
                    y: Array(PARTICLE_WAYPOINTS.length).fill(130),
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1.8,
                    times: PARTICLE_WAYPOINTS.map((_, i) => i / (PARTICLE_WAYPOINTS.length - 1)),
                  }}
                />
              )}

              {/* Denial particle (red, goes down the branch) */}
              {inView && (
                <motion.circle
                  r={2.5}
                  fill="#f87171"
                  style={{ filter: "drop-shadow(0 0 4px #ef4444)" }}
                  animate={{
                    x: [560, 560, 400, 400],
                    y: [130, 260, 260, 130],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2.5,
                    repeatDelay: 4,
                    times: [0, 0.4, 0.7, 1],
                  }}
                />
              )}

              {/* ── Main nodes ── */}
              {NODES.map((node, i) => (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, ease, delay: 0.2 + i * 0.15 }}
                >
                  {/* Outer ring glow */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={22}
                    fill={`${node.color}08`}
                    stroke={`${node.color}18`}
                    strokeWidth={1}
                  />
                  {/* Inner circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={13}
                    fill="#0a0a0c"
                    stroke={`${node.color}45`}
                    strokeWidth={1.5}
                  />
                  {/* Node number */}
                  <text
                    x={node.x}
                    y={node.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={node.color}
                    fontSize={8}
                    fontFamily="monospace"
                    fontWeight="700"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </text>
                  {/* Label below */}
                  <text
                    x={node.x}
                    y={node.y + 34}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.7)"
                    fontSize={10}
                    fontFamily="system-ui, sans-serif"
                    fontWeight="600"
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 48}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.25)"
                    fontSize={8}
                    fontFamily="system-ui, sans-serif"
                  >
                    {node.sub}
                  </text>
                </motion.g>
              ))}

              {/* ── Denial branch nodes ── */}
              {DENIAL_NODES.map((node, i) => (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, ease, delay: 1.5 + i * 0.2 }}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={20}
                    fill={`${node.color}08`}
                    stroke={`${node.color}22`}
                    strokeWidth={1}
                    strokeDasharray="4 3"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={12}
                    fill="#0a0a0c"
                    stroke={`${node.color}35`}
                    strokeWidth={1.5}
                  />
                  <text
                    x={node.x}
                    y={node.y + 30}
                    textAnchor="middle"
                    fill={node.color}
                    fontSize={9}
                    fontFamily="system-ui, sans-serif"
                    fontWeight="600"
                  >
                    {node.label}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 43}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.2)"
                    fontSize={7.5}
                    fontFamily="system-ui, sans-serif"
                  >
                    {node.sub}
                  </text>
                </motion.g>
              ))}

              {/* Denial label on the branch path */}
              <motion.text
                x={620}
                y={202}
                fill="rgba(248,113,113,0.4)"
                fontSize={8}
                fontFamily="monospace"
                fontWeight="700"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.8 }}
              >
                AUTO-APPEAL
              </motion.text>
            </svg>
          </div>
        </div>

        {/* Bottom stats row */}
        <motion.div
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease, delay: 2.0 }}
        >
          {[
            { label: "First-pass acceptance", value: "94%", delta: "+16pp" },
            { label: "Avg processing time", value: "4.2s", delta: "per claim" },
            { label: "Auto-appeal rate", value: "98%", delta: "of denials" },
            { label: "Recovery on appeal", value: "71%", delta: "success rate" },
          ].map(({ label, value, delta }) => (
            <div
              key={label}
              className="rounded-xl p-4 border border-white/6"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <p className="text-xl font-bold text-white mb-0.5">{value}</p>
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wide">{label}</p>
              <p className="text-[10px] text-zinc-700 mt-1">{delta}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
