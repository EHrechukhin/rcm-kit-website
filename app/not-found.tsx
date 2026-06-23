"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileX2 } from "lucide-react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const QUICK_LINKS = [
  { label: "Platform", href: "/platform" },
  { label: "Security", href: "/security" },
  { label: "Integrations", href: "/integrations" },
  { label: "ROI Estimator", href: "/roi-estimator" },
];

export default function NotFound() {
  return (
    <div className="bg-[#0d0d10] text-white">
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden grain">
        {/* ── Aurora atmosphere ── */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div
            className="aurora-1 absolute top-[20%] left-[18%] h-150 w-150 rounded-full blur-[130px]"
            style={{ background: "var(--aurora-1)" }}
          />
          <div
            className="aurora-2 absolute top-[8%] right-[14%] h-125 w-110 rounded-full blur-[120px]"
            style={{ background: "var(--aurora-2)" }}
          />
          <div
            className="aurora-3 absolute bottom-[12%] right-[28%] h-90 w-90 rounded-full blur-[100px]"
            style={{ background: "var(--aurora-3)" }}
          />
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-24 lg:px-10">
          <div className="flex flex-col items-start gap-7">
            {/* ── Denial card ── */}
            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.55, ease, delay: 0.15 }}
              className="w-full max-w-md overflow-hidden rounded-xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
              style={{
                background:
                  "linear-gradient(160deg, rgba(30,30,32,0.95) 0%, rgba(18,18,20,0.98) 100%)",
              }}
            >
              {/* accent strip */}
              <div
                className="h-px w-full shrink-0"
                style={{
                  background:
                    "linear-gradient(90deg, color-mix(in srgb, var(--brand) 80%, transparent), transparent 65%)",
                }}
              />
              {/* titlebar */}
              <div
                className="flex h-9 items-center gap-2 border-b border-white/[0.07] px-4 select-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(50,50,54,0.9) 0%, rgba(38,38,42,0.9) 100%)",
                }}
              >
                <FileX2 className="h-3.5 w-3.5 text-zinc-500" aria-hidden />
                <span className="font-mono text-[11px] font-medium tracking-wide text-zinc-400">
                  EOB · CLAIM STATUS
                </span>
                <span className="ml-auto flex items-center gap-1.5">
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full"
                    style={{ background: "var(--status-warning, #fbbf24)" }}
                  />
                  <span className="font-mono text-[11px] text-zinc-500">REJECTED</span>
                </span>
              </div>
              {/* body */}
              <div className="space-y-2 p-5">
                <p className="font-mono text-[13px] font-semibold tracking-tight text-zinc-200">
                  CARC-404 — CLAIM NOT FOUND
                </p>
                <p className="font-mono text-xs leading-relaxed text-zinc-500">
                  Remark: The requested route was not found in this system. No
                  matching record on file.
                </p>
              </div>
            </motion.div>

            {/* ── 404 headline ── */}
            <h1 className="text-[clamp(4rem,12vw,9rem)] leading-[0.85] font-black tracking-tight">
              <motion.span
                className="gradient-text block"
                initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, ease, delay: 0.3 }}
              >
                404
              </motion.span>
            </h1>

            {/* ── Subhead + copy ── */}
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
              className="max-w-2xl space-y-3"
            >
              <p className="text-[1.5rem] font-bold tracking-tight text-white">
                This page slipped through the clearinghouse.
              </p>
              <p className="text-[1.0625rem] leading-[1.7] text-zinc-400">
                The route you requested doesn&apos;t exist — it may have been moved,
                renamed, or never deployed. Let&apos;s route you back to something
                that resolves.
              </p>
            </motion.div>

            {/* ── CTAs ── */}
            <motion.div
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.55, ease, delay: 0.7 }}
              className="flex flex-col gap-6 pt-1"
            >
              <Link href="/" className="group btn-cta w-fit">
                Back to home
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[11px] tracking-widest text-zinc-600 uppercase">
                  Or jump to
                </span>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {QUICK_LINKS.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors duration-200 hover:text-white"
                    >
                      <span className="font-mono text-xs text-zinc-700 transition-colors duration-200 group-hover:text-[var(--brand)]">
                        {href}
                      </span>
                      <span>{label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
