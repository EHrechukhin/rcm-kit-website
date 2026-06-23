"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeUp } from "@/components/motion";
import { FileX, Clock, EyeOff } from "lucide-react";
import { useColorTheme, type ColorTheme } from "@/components/theme-provider";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const GAUGE_PATH = "M 16.7 85 A 50 50 0 1 1 103.3 85";

function ArcGauge({ fillFraction, color }: { fillFraction: number; color: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-60px" });

  return (
    <svg ref={svgRef} viewBox="0 0 120 96" className="w-full" aria-hidden="true">
      <path d={GAUGE_PATH} stroke="#E2E8F0" strokeWidth="7" strokeLinecap="round" fill="none" />
      <motion.path
        d={GAUGE_PATH}
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView ? fillFraction : 0 }}
        transition={{ duration: 1.6, ease, delay: 0.25 }}
      />
      <text x="60" y="58" textAnchor="middle" dominantBaseline="middle"
        style={{ fontSize: "13px", fontWeight: "800", fill: color, fontFamily: "var(--font-inter, system-ui)", letterSpacing: "-0.02em" }}>
        15%
      </text>
      <text x="60" y="74" textAnchor="middle" dominantBaseline="middle"
        style={{ fontSize: "7px", fontWeight: "600", fill: "#94A3B8", fontFamily: "var(--font-geist-mono, monospace)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
        MAX
      </text>
    </svg>
  );
}

function RangeBar({ minVal, maxVal, scaleMax, color }: { minVal: number; maxVal: number; scaleMax: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const leftPct = (minVal / scaleMax) * 100;
  const widthPct = ((maxVal - minVal) / scaleMax) * 100;

  return (
    <div ref={ref} className="relative h-1.5 rounded-full bg-slate-100 overflow-hidden">
      <div className="absolute inset-y-0 left-0 rounded-full bg-slate-200" style={{ width: `${leftPct}%` }} />
      <motion.div
        className="absolute inset-y-0 rounded-full"
        style={{ left: `${leftPct}%`, backgroundColor: color }}
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: `${widthPct}%`, opacity: 0.85 } : {}}
        transition={{ duration: 1.1, ease, delay: 0.4 }}
      />
    </div>
  );
}

/* ── Per-theme color palettes ─────────────────────────────────────── */

type CardPalette = {
  main: string
  light: string
  border: string
  stripe: string
  divider: string
}

type SectionPalette = {
  cards: [CardPalette, CardPalette, CardPalette]
  pillBg: string
  pillBorder: string
  pillText: string
  pillDot: string
  headingGradient: string
  signalLine: string
}

const PALETTES: Record<ColorTheme, SectionPalette> = {
  default: {
    cards: [
      { main: "#E11D48", light: "rgba(225,29,72,0.06)", border: "rgba(225,29,72,0.18)", stripe: "linear-gradient(to right, #E11D48, #FB7185, #FFE4E6)", divider: "linear-gradient(to right, rgba(225,29,72,0.12), rgba(226,232,240,0.5), transparent)" },
      { main: "#D97706", light: "rgba(217,119,6,0.06)", border: "rgba(217,119,6,0.18)", stripe: "linear-gradient(to right, #D97706, #FCD34D, #FEF3C7)", divider: "linear-gradient(to right, rgba(217,119,6,0.12), rgba(226,232,240,0.5), transparent)" },
      { main: "#7C3AED", light: "rgba(124,58,237,0.06)", border: "rgba(124,58,237,0.18)", stripe: "linear-gradient(to right, #7C3AED, #A78BFA, #EDE9FE)", divider: "linear-gradient(to right, rgba(124,58,237,0.12), rgba(226,232,240,0.5), transparent)" },
    ],
    pillBg: "rgba(225,29,72,0.06)", pillBorder: "rgba(225,29,72,0.22)", pillText: "#BE123C", pillDot: "#E11D48",
    headingGradient: "linear-gradient(125deg, #e11d48 0%, #d97706 50%, #7c3aed 100%)",
    signalLine: "rgba(251,113,133,0.55)",
  },
  teal: {
    cards: [
      { main: "#0F766E", light: "rgba(15,118,110,0.06)", border: "rgba(15,118,110,0.18)", stripe: "linear-gradient(to right, #0F766E, #2DD4BF, #CCFBF1)", divider: "linear-gradient(to right, rgba(15,118,110,0.12), rgba(226,232,240,0.5), transparent)" },
      { main: "#0284C7", light: "rgba(2,132,199,0.06)", border: "rgba(2,132,199,0.18)", stripe: "linear-gradient(to right, #0284C7, #38BDF8, #E0F2FE)", divider: "linear-gradient(to right, rgba(2,132,199,0.12), rgba(226,232,240,0.5), transparent)" },
      { main: "#6366F1", light: "rgba(99,102,241,0.06)", border: "rgba(99,102,241,0.18)", stripe: "linear-gradient(to right, #6366F1, #A5B4FC, #EEF2FF)", divider: "linear-gradient(to right, rgba(99,102,241,0.12), rgba(226,232,240,0.5), transparent)" },
    ],
    pillBg: "rgba(15,118,110,0.06)", pillBorder: "rgba(15,118,110,0.22)", pillText: "#0F766E", pillDot: "#14B8A6",
    headingGradient: "linear-gradient(125deg, #0F766E 0%, #0284C7 50%, #6366F1 100%)",
    signalLine: "rgba(45,212,191,0.55)",
  },
  indigo: {
    cards: [
      { main: "#4F46E5", light: "rgba(79,70,229,0.06)", border: "rgba(79,70,229,0.18)", stripe: "linear-gradient(to right, #4F46E5, #818CF8, #E0E7FF)", divider: "linear-gradient(to right, rgba(79,70,229,0.12), rgba(226,232,240,0.5), transparent)" },
      { main: "#7C3AED", light: "rgba(124,58,237,0.06)", border: "rgba(124,58,237,0.18)", stripe: "linear-gradient(to right, #7C3AED, #C4B5FD, #EDE9FE)", divider: "linear-gradient(to right, rgba(124,58,237,0.12), rgba(226,232,240,0.5), transparent)" },
      { main: "#DB2777", light: "rgba(219,39,119,0.06)", border: "rgba(219,39,119,0.18)", stripe: "linear-gradient(to right, #DB2777, #F472B6, #FCE7F3)", divider: "linear-gradient(to right, rgba(219,39,119,0.12), rgba(226,232,240,0.5), transparent)" },
    ],
    pillBg: "rgba(79,70,229,0.06)", pillBorder: "rgba(79,70,229,0.22)", pillText: "#4338CA", pillDot: "#6366F1",
    headingGradient: "linear-gradient(125deg, #4F46E5 0%, #7C3AED 50%, #DB2777 100%)",
    signalLine: "rgba(129,140,248,0.55)",
  },
  emerald: {
    cards: [
      { main: "#059669", light: "rgba(5,150,105,0.06)", border: "rgba(5,150,105,0.18)", stripe: "linear-gradient(to right, #059669, #34D399, #D1FAE5)", divider: "linear-gradient(to right, rgba(5,150,105,0.12), rgba(226,232,240,0.5), transparent)" },
      { main: "#0F766E", light: "rgba(15,118,110,0.06)", border: "rgba(15,118,110,0.18)", stripe: "linear-gradient(to right, #0F766E, #2DD4BF, #CCFBF1)", divider: "linear-gradient(to right, rgba(15,118,110,0.12), rgba(226,232,240,0.5), transparent)" },
      { main: "#2563EB", light: "rgba(37,99,235,0.06)", border: "rgba(37,99,235,0.18)", stripe: "linear-gradient(to right, #2563EB, #93C5FD, #DBEAFE)", divider: "linear-gradient(to right, rgba(37,99,235,0.12), rgba(226,232,240,0.5), transparent)" },
    ],
    pillBg: "rgba(5,150,105,0.06)", pillBorder: "rgba(5,150,105,0.22)", pillText: "#047857", pillDot: "#10B981",
    headingGradient: "linear-gradient(125deg, #059669 0%, #0F766E 50%, #2563EB 100%)",
    signalLine: "rgba(52,211,153,0.55)",
  },
  amber: {
    cards: [
      { main: "#D97706", light: "rgba(217,119,6,0.06)", border: "rgba(217,119,6,0.18)", stripe: "linear-gradient(to right, #D97706, #FCD34D, #FEF3C7)", divider: "linear-gradient(to right, rgba(217,119,6,0.12), rgba(226,232,240,0.5), transparent)" },
      { main: "#DC2626", light: "rgba(220,38,38,0.06)", border: "rgba(220,38,38,0.18)", stripe: "linear-gradient(to right, #DC2626, #FCA5A5, #FEE2E2)", divider: "linear-gradient(to right, rgba(220,38,38,0.12), rgba(226,232,240,0.5), transparent)" },
      { main: "#9333EA", light: "rgba(147,51,234,0.06)", border: "rgba(147,51,234,0.18)", stripe: "linear-gradient(to right, #9333EA, #D8B4FE, #F3E8FF)", divider: "linear-gradient(to right, rgba(147,51,234,0.12), rgba(226,232,240,0.5), transparent)" },
    ],
    pillBg: "rgba(217,119,6,0.06)", pillBorder: "rgba(217,119,6,0.22)", pillText: "#B45309", pillDot: "#F59E0B",
    headingGradient: "linear-gradient(125deg, #D97706 0%, #DC2626 50%, #9333EA 100%)",
    signalLine: "rgba(252,211,77,0.55)",
  },
};

export function TheProblemSection() {
  const { colorTheme } = useColorTheme();
  const pal = PALETTES[colorTheme];
  const [c1, c2, c3] = pal.cards;

  return (
    <section id="the-problem" className="relative overflow-hidden bg-white text-[#0f172a] py-28 px-6 lg:px-10">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(15,23,42,0.038) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="absolute top-0 left-0 right-0 h-px transition-colors duration-700" style={{ background: `linear-gradient(to right, transparent, ${pal.signalLine}, transparent)` }} />
      </div>

      <div className="relative z-10 max-w-none mx-auto flex flex-col gap-14">

        {/* ── Header ── */}
        <FadeUp className="max-w-3xl">
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-[1.06] tracking-tight mb-5 text-[#090c12]">
            The revenue cycle is a massive{" "}
            <span className="bg-clip-text text-transparent transition-all duration-500" style={{ backgroundImage: pal.headingGradient }}>
              transactional labor engine
            </span>
            .
          </h2>
          <p className="text-[1rem] leading-[1.8] text-zinc-500 max-w-lg">
            Revenue leaks invisibly — because people never get to all of it.
          </p>
        </FadeUp>

        {/* ── 3-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── Card 1: Denials ── */}
          <FadeUp delay={0.05} className="h-full">
            <div className="h-full flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-[3px] flex-shrink-0 transition-all duration-500" style={{ background: c1.stripe }} />

              <div className="flex flex-col flex-1 p-7 gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300" style={{ background: c1.light, border: `1px solid ${c1.border}` }}>
                    <FileX className="w-[18px] h-[18px] transition-colors duration-500" style={{ color: c1.main }} />
                  </div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.13em] transition-colors duration-500" style={{ color: c1.main }}>
                    Denials
                  </span>
                </div>

                <div>
                  <p className="text-[3.75rem] font-black leading-none tracking-tight transition-colors duration-500" style={{ color: c1.main }}>
                    5–15%
                  </p>
                  <p className="text-[0.9375rem] font-semibold text-zinc-800 mt-3 leading-snug">First-pass denial rate</p>
                  <p className="text-[11px] text-zinc-400 mt-1 font-medium">Published RCM industry research</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400">Industry benchmark range</span>
                    <span className="text-[10px] font-mono font-semibold transition-colors duration-500" style={{ color: c1.main }}>5% → 15%</span>
                  </div>
                  <RangeBar minVal={5} maxVal={15} scaleMax={20} color={c1.main} />
                  <div className="flex justify-between text-[9px] font-mono text-zinc-300 select-none">
                    <span>0%</span><span>5%</span><span>10%</span><span>15%</span><span>20%</span>
                  </div>
                </div>

                <div className="h-px transition-all duration-500" style={{ background: c1.divider }} />

                <p className="text-[0.9375rem] leading-[1.78] text-zinc-500 flex-1">
                  First-pass denial rates across healthcare RCM sit at roughly{" "}
                  <strong className="text-zinc-700 font-semibold">5–15%</strong> — and the share
                  that ever gets worked, much less appealed within timely-filing windows, is far lower.
                </p>

                <p className="text-[11px] font-mono text-zinc-400 pt-4 border-t border-slate-100 leading-relaxed">
                  Cited industry-benchmark range · Attribution shown inline ·{" "}
                  <span className="text-zinc-300">No RCM Kit performance numbers</span>
                </p>
              </div>
            </div>
          </FadeUp>

          {/* ── Card 2: Aging A/R ── */}
          <FadeUp delay={0.1} className="h-full">
            <div className="h-full flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-[3px] transition-all duration-500" style={{ background: c2.stripe }} />

              <div className="flex flex-col flex-1 p-7 gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-300" style={{ background: c2.light, border: `1px solid ${c2.border}` }}>
                    <Clock className="w-4 h-4 transition-colors duration-500" style={{ color: c2.main }} />
                  </div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.13em] transition-colors duration-500" style={{ color: c2.main }}>
                    Aging A/R
                  </span>
                </div>

                <div className="flex items-baseline gap-2.5">
                  <span className="text-[3.75rem] font-black leading-none tracking-tight transition-colors duration-500" style={{ color: c2.main }}>
                    35–55
                  </span>
                  <span className="text-lg font-bold text-zinc-400">days</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400">Days in A/R range</span>
                    <span className="text-[10px] font-mono font-semibold transition-colors duration-500" style={{ color: c2.main }}>35 → 55 days</span>
                  </div>
                  <RangeBar minVal={35} maxVal={55} scaleMax={90} color={c2.main} />
                  <div className="flex justify-between text-[9px] font-mono text-zinc-300 select-none">
                    <span>0</span><span>30</span><span>60</span><span>90 days</span>
                  </div>
                </div>

                <p className="text-[0.875rem] leading-[1.72] text-zinc-500">
                  Days in A/R typically run{" "}
                  <strong className="text-zinc-700 font-semibold">35–55 days</strong>. The aging
                  report is always longer than the team that has to work it.
                </p>

                <p className="text-[11px] font-mono text-zinc-400 pt-3 border-t border-slate-100">
                  General healthcare RCM statistics
                </p>
              </div>
            </div>
          </FadeUp>

          {/* ── Card 3: Invisible Leakage ── */}
          <FadeUp delay={0.15} className="h-full">
            <div className="h-full flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="h-[3px] transition-all duration-500" style={{ background: c3.stripe }} />

              <div className="flex flex-col flex-1 p-7 gap-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-300" style={{ background: c3.light, border: `1px solid ${c3.border}` }}>
                    <EyeOff className="w-4 h-4 transition-colors duration-500" style={{ color: c3.main }} />
                  </div>
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.13em] transition-colors duration-500" style={{ color: c3.main }}>
                    Invisible Leakage
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-[2.625rem] font-black leading-none tracking-tight transition-colors duration-500" style={{ color: c3.main }}>1–3%</p>
                    <p className="text-[11px] font-semibold text-zinc-600 mt-1.5 leading-snug">of net revenue</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Underpayments</p>
                  </div>
                  <div>
                    <p className="text-[2.625rem] font-black leading-none tracking-tight transition-colors duration-500" style={{ color: c3.main }}>5–10%</p>
                    <p className="text-[11px] font-semibold text-zinc-600 mt-1.5 leading-snug">self-pay recovery</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Recoverable coverage</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                      <span>Underpayments</span>
                      <span className="font-semibold transition-colors duration-500" style={{ color: c3.main }}>1–3% net rev.</span>
                    </div>
                    <RangeBar minVal={1} maxVal={3} scaleMax={10} color={c3.main} />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                      <span>Self-pay recovery</span>
                      <span className="font-semibold transition-colors duration-500" style={{ color: c3.main }}>5–10% of accounts</span>
                    </div>
                    <RangeBar minVal={5} maxVal={10} scaleMax={20} color={c3.main} />
                  </div>
                </div>

                <p className="text-[0.875rem] leading-[1.72] text-zinc-500">
                  Underpayments at roughly{" "}
                  <strong className="text-zinc-700 font-semibold">1–3% of net revenue</strong> and
                  recoverable coverage on roughly{" "}
                  <strong className="text-zinc-700 font-semibold">5–10%</strong> of self-pay
                  accounts — leakage no one has capacity to chase.
                </p>

                <p className="text-[11px] font-mono text-zinc-400 pt-3 border-t border-slate-100">
                  Industry benchmarks · Attribution shown inline
                </p>
              </div>
            </div>
          </FadeUp>

        </div>

        {/* ── Footer disclaimer ── */}
        <FadeUp delay={0.1}>
          <p className="text-center text-[11px] font-mono text-zinc-400 max-w-2xl mx-auto leading-[1.9]">
            Cited industry-benchmark ranges. Attribution shown inline. No RCM Kit performance
            numbers — see{" "}
            <span className="text-zinc-500 font-medium">ROI Estimator</span> for illustrative modeling.
          </p>
        </FadeUp>

      </div>
    </section>
  );
}
