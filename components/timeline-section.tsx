"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeUp } from "@/components/motion";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const COMPARISONS = [
  {
    metric: "Days to denial resolution",
    before: { value: 45, label: "45 days", pct: 100 },
    after:  { value: 12, label: "12 days", pct: 27  },
    unit: "days",
  },
  {
    metric: "First-pass claim acceptance",
    before: { value: 78, label: "78%", pct: 78 },
    after:  { value: 94, label: "94%", pct: 94 },
    unit: "%",
    higherIsBetter: true,
  },
  {
    metric: "A/R days outstanding",
    before: { value: 52, label: "52 days", pct: 100 },
    after:  { value: 31, label: "31 days", pct: 60  },
    unit: "days",
  },
  {
    metric: "Manual touchpoints per claim",
    before: { value: 8, label: "8 steps", pct: 100 },
    after:  { value: 1, label: "1 step",  pct: 12  },
    unit: "steps",
  },
];

export function TimelineSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 px-6 lg:px-10 border-t border-white/6 overflow-hidden grain">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(52,211,153,0.3) 40%, rgba(59,130,246,0.2) 70%, transparent)",
          }}
        />
        <div
          className="absolute top-[-100px] left-[10%] w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: "rgba(52,211,153,0.05)" }}
        />
        <div
          className="absolute bottom-[-60px] right-[5%] w-[400px] h-[400px] rounded-full blur-[120px]"
          style={{ background: "rgba(59,130,246,0.06)" }}
        />
      </div>

      <div className="relative z-10 max-w-none mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: copy */}
          <FadeUp>
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-zinc-700 mb-4">
              Before → After
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold text-white leading-[1.08] mb-6">
              What changes when you{" "}
              <span className="gradient-text">deploy the kit.</span>
            </h2>
            <p className="text-zinc-500 leading-[1.75] mb-8">
              Built on published industry benchmarks and early customer data.
              Results vary by organization size, payer mix, and existing RCM maturity.
            </p>
            <div className="flex items-center gap-5 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-3 h-2.5 rounded-sm bg-red-900/60 border border-red-800/40" />
                <span className="text-zinc-600">Before</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-2.5 rounded-sm bg-emerald-900/60 border border-emerald-700/40" />
                <span className="text-zinc-600">After RCM Kit</span>
              </div>
            </div>
          </FadeUp>

          {/* Right: comparison bars */}
          <div ref={ref} className="flex flex-col gap-7">
            {COMPARISONS.map(({ metric, before, after, higherIsBetter }, i) => (
              <motion.div
                key={metric}
                initial={{ opacity: 0, x: 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: i * 0.12 }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    {metric}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-red-500/70 line-through">
                      {before.label}
                    </span>
                    <span className="text-zinc-700">→</span>
                    <span className="text-xs font-bold text-emerald-400">
                      {after.label}
                    </span>
                  </div>
                </div>

                {/* Before bar */}
                <div className="mb-1.5">
                  <div className="h-5 rounded-md overflow-hidden bg-white/3 relative">
                    <motion.div
                      className="h-full rounded-md"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(239,68,68,0.25), rgba(239,68,68,0.12))",
                        border: "1px solid rgba(239,68,68,0.18)",
                      }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${before.pct}%` } : {}}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 + 0.15 }}
                    />
                  </div>
                </div>

                {/* After bar */}
                <div>
                  <div className="h-5 rounded-md overflow-hidden bg-white/3 relative">
                    <motion.div
                      className="h-full rounded-md"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(52,211,153,0.3), rgba(52,211,153,0.12))",
                        border: "1px solid rgba(52,211,153,0.22)",
                      }}
                      initial={{ width: 0 }}
                      animate={
                        inView
                          ? { width: `${higherIsBetter ? after.pct : after.pct}%` }
                          : {}
                      }
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 + 0.35 }}
                    />
                    {/* Improvement badge */}
                    <motion.span
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-emerald-500"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: i * 0.12 + 0.9 }}
                    >
                      {higherIsBetter
                        ? `+${after.value - before.value}pp`
                        : `-${Math.round(((before.value - after.value) / before.value) * 100)}%`}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
