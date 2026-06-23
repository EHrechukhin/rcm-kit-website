"use client";

import { useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { TrendingDown, DollarSign, CheckSquare } from "lucide-react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setDisplayed(parseFloat(v.toFixed(decimals)));
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayed.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

const METRICS = [
  {
    Icon: CheckSquare,
    value: 14280,
    decimals: 0,
    prefix: "",
    suffix: "",
    label: "Claims processed today",
    color: "#60a5fa",
  },
  {
    Icon: TrendingDown,
    value: 4.2,
    decimals: 1,
    prefix: "",
    suffix: "%",
    label: "Average denial rate",
    color: "#4ade80",
    note: "industry avg 12.4%",
  },
  {
    Icon: DollarSign,
    value: 2.4,
    decimals: 1,
    prefix: "$",
    suffix: "M",
    label: "Recovered this month",
    color: "#a78bfa",
  },
];

export function MetricsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative border-t border-white/6 overflow-hidden">
      {/* Top signal line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(59,130,246,0.4) 30%, rgba(167,139,250,0.3) 70%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/6">
          {METRICS.map(({ Icon, value, decimals, prefix, suffix, label, color, note }, i) => (
            <motion.div
              key={label}
              className="flex items-start gap-4 py-8 px-0 sm:px-8 first:pl-0 last:pr-0"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease, delay: i * 0.1 }}
            >
              <div
                className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                style={{
                  background: `${color}12`,
                  border: `1px solid ${color}20`,
                }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <div>
                <p className="text-3xl font-black text-white leading-none mb-1.5">
                  <Counter value={value} decimals={decimals} prefix={prefix} suffix={suffix} />
                </p>
                <p className="text-xs font-mono text-zinc-600 uppercase tracking-[0.12em]">
                  {label}
                </p>
                {note && (
                  <p className="text-[10px] text-zinc-800 mt-0.5">{note}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.04)" }}
      />
    </div>
  );
}
