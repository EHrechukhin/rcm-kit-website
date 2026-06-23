"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";

function formatRevenue(value: number): string {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}B`;
  return `$${value}M`;
}

function calcROI(revenue: number) {
  return {
    low: Math.round(revenue * 0.01),
    high: Math.round(revenue * 0.03),
  };
}

export function ROIEstimator() {
  const [revenue, setRevenue] = useState(150);
  const roi = calcROI(revenue);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-zinc-600">$20M</span>
          <span className="font-medium text-zinc-300">
            Annual net revenue:{" "}
            <span className="text-white font-semibold">{formatRevenue(revenue)}</span>
          </span>
          <span className="font-mono text-zinc-600">$800M</span>
        </div>
        <Slider
          min={20}
          max={800}
          step={10}
          value={[revenue]}
          onValueChange={(v) => setRevenue(Array.isArray(v) ? v[0] : v)}
          className="w-full"
          aria-label="Annual net patient revenue"
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.12em] text-zinc-600">
          Illustrative recovered-revenue band
        </p>
        <AnimatePresence mode="wait">
          <motion.p
            key={`${roi.low}-${roi.high}`}
            initial={{ opacity: 0.5, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[2.75rem] font-black leading-none text-[#22c55e] tabular-nums"
          >
            ≈ {formatRevenue(roi.low)} – {formatRevenue(roi.high)}
            <span className="text-[1.25rem] font-semibold text-[#16a34a] ml-2">/ year</span>
          </motion.p>
        </AnimatePresence>
        <p className="text-xs italic text-zinc-600 leading-relaxed mt-1 max-w-sm">
          Based on published RCM industry research (1–3% revenue leakage recovery).
          Actual results vary by organization, payer mix, and implementation scope.
        </p>
      </div>
    </div>
  );
}
