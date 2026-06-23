"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Types ─────────────────────────────────────────────────────────── */
interface SearchItem {
  label: string;
  section: string;
  href: string;
  icon: string;
  desc: string;
}

const SECTION_COLORS: Record<string, { color: string; glow: string }> = {
  Platform:     { color: "#60a5fa", glow: "rgba(96,165,250,0.15)" },
  Integrations: { color: "#34d399", glow: "rgba(52,211,153,0.13)" },
  Security:     { color: "#a78bfa", glow: "rgba(167,139,250,0.13)" },
  Tools:        { color: "#fb923c", glow: "rgba(251,146,60,0.13)" },
  Solutions:    { color: "#2dd4bf", glow: "rgba(45,212,191,0.13)" },
};

/* ── Data ───────────────────────────────────────────────────────────── */
const ITEMS: SearchItem[] = [
  {
    label: "AI Denial Prevention",
    section: "Platform",
    href: "/platform",
    icon: "shield",
    desc: "Predict and prevent claim denials before submission",
  },
  {
    label: "Revenue Cycle Automation",
    section: "Platform",
    href: "/platform",
    icon: "zap",
    desc: "End-to-end RCM automation powered by AI agents",
  },
  {
    label: "Payer Integrations",
    section: "Integrations",
    href: "/integrations",
    icon: "plug",
    desc: "Connect with 900+ payers and clearinghouses",
  },
  {
    label: "Security & Compliance",
    section: "Security",
    href: "/security",
    icon: "lock",
    desc: "HIPAA-compliant, SOC 2 Type II certified platform",
  },
  {
    label: "ROI Estimator",
    section: "Tools",
    href: "/roi-estimator",
    icon: "chart",
    desc: "Calculate your revenue recovery potential",
  },
  {
    label: "Prior Authorization",
    section: "Solutions",
    href: "/solutions/prior-auth",
    icon: "check",
    desc: "Automate prior auth workflows end-to-end",
  },
  {
    label: "Claims Management",
    section: "Solutions",
    href: "/solutions/claims",
    icon: "file",
    desc: "Intelligent claim scrubbing and tracking",
  },
];

const AI_ANSWERS: Record<string, string> = {
  shield:
    "RCMKit's AI Denial Prevention uses predictive models trained on 50M+ claims to flag high-risk submissions before they're sent — reducing denial rates by up to 40%.",
  zap: "Our Revenue Cycle Automation agents handle coding, eligibility, submission, and follow-up across the full RCM workflow with minimal human intervention.",
  plug: "RCMKit connects to 900+ payers via direct EDI, API, and clearinghouse rails. New payer connections are provisioned within 48 hours.",
  lock: "RCMKit is HIPAA-compliant, SOC 2 Type II certified, and undergoes annual penetration testing. All PHI is encrypted at rest and in transit.",
  chart:
    "Use the ROI Estimator to input your current denial rate, volume, and staff cost. Most practices recover $80K–$400K in additional revenue annually.",
  check:
    "Prior auth automation handles intake, payer lookup, clinical criteria matching, and status tracking — reducing turnaround time from days to hours.",
  file: "AI-powered claim scrubbing catches coding errors, missing modifiers, and bundling issues before submission — boosting first-pass acceptance rates.",
};

const DEFAULT_AI =
  "Ask me anything about RCMKit — denial prevention, payer integrations, compliance, or ROI. I can surface answers from our platform documentation instantly.";

/* ── Icons ──────────────────────────────────────────────────────────── */
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const cls = className ?? "w-4 h-4";
  switch (name) {
    case "shield":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5 L13.5 3.5 L13.5 8 C13.5 11 11 13.5 8 14.5 C5 13.5 2.5 11 2.5 8 L2.5 3.5 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M5.5 8 L7 9.5 L10.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "zap":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none">
          <path d="M9 1.5 L4 9 H8 L7 14.5 L12 7 H8 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      );
    case "plug":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none">
          <path d="M5.5 2 V6 M10.5 2 V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="3" y="6" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 10 V14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "lock":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none">
          <rect x="3" y="8" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5 8 V5.5 A3 3 0 0 1 11 5.5 V8" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="8" cy="11.5" r="1" fill="currentColor" />
        </svg>
      );
    case "chart":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none">
          <path d="M2 13 L5 9 L8 11 L12 5 L14 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 13 H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "check":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5.5 8 L7 9.5 L10.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "file":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none">
          <path d="M4 2 H9.5 L13 5.5 V14 H4 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M9 2 V6 H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M6 9 H10 M6 11.5 H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );
    case "search":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10.5 10.5 L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "close":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none">
          <path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "star":
      return (
        <svg className={cls} viewBox="0 0 16 16" fill="none">
          <path d="M8 1.5 L9.5 6 H14 L10.5 8.5 L12 13 L8 10.5 L4 13 L5.5 8.5 L2 6 H6.5 Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" fill="currentColor" opacity="0.8" />
        </svg>
      );
    default:
      return null;
  }
};

/* ── useTypewriter ──────────────────────────────────────────────────── */
function useTypewriter(text: string, running: boolean, speed = 18) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDisplayed("");
    setDone(false);

    if (!running || !text) return;

    let i = 0;
    const tick = () => {
      if (i === 0) {
        timerRef.current = setTimeout(() => {
          i++;
          setDisplayed(text.slice(0, i));
          timerRef.current = setTimeout(function loop() {
            if (i >= text.length) { setDone(true); return; }
            i++;
            setDisplayed(text.slice(0, i));
            timerRef.current = setTimeout(loop, speed);
          }, speed);
        }, 300);
      }
    };
    tick();

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [text, running, speed]);

  return { displayed, done };
}

/* ── SearchBar ──────────────────────────────────────────────────────── */
const EASING = [0.16, 1, 0.3, 1] as const;

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Debounce query for AI answer */
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => setDebouncedQuery(query), 600);
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [query]);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ESC to close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  /* Focus input when opened */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
    else setQuery("");
  }, [open]);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  /* Filter results */
  const results = query
    ? ITEMS.filter(
        (it) =>
          it.label.toLowerCase().includes(query.toLowerCase()) ||
          it.desc.toLowerCase().includes(query.toLowerCase()) ||
          it.section.toLowerCase().includes(query.toLowerCase())
      )
    : ITEMS.slice(0, 5);

  /* AI answer */
  const matchedItem = debouncedQuery
    ? ITEMS.find((it) => it.label.toLowerCase().includes(debouncedQuery.toLowerCase()))
    : null;
  const aiText = matchedItem ? AI_ANSWERS[matchedItem.icon] ?? DEFAULT_AI : DEFAULT_AI;
  const aiRunning = open;

  const { displayed: aiDisplayed, done: aiDone } = useTypewriter(aiText, aiRunning);

  /* Typing indicator — show while waiting for debounce or typewriter start */
  const showDots = open && query.length > 0 && !aiDone && aiDisplayed.length === 0;

  return (
    <div ref={wrapperRef} className="relative flex items-center">
      {/* ── Expanding container ── */}
      <motion.div
        animate={{ width: open ? 280 : 36 }}
        transition={{ duration: 0.5, ease: EASING }}
        className="relative overflow-hidden"
        style={{ height: 36, borderRadius: 12 }}
      >
        {/* Input background + border */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: open ? "rgba(255,255,255,0.04)" : "transparent",
            border: open ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
            boxShadow: open ? "0 0 0 1px rgba(255,255,255,0.04) inset" : "none",
            transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
          }}
        />

        {/* Shimmer overlay when open */}
        {open && (
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
              backgroundSize: "200% 100%",
              animation: "search-shimmer 2s linear infinite",
            }}
          />
        )}

        {/* Search icon button */}
        <button
          onClick={toggle}
          aria-label={open ? "Close search" : "Open search"}
          className="absolute left-0 top-0 flex items-center justify-center z-10"
          style={{ width: 36, height: 36 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Icon name="close" className="w-3.5 h-3.5" />
              </motion.span>
            ) : (
              <motion.span
                key="search"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Icon name="search" className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Text input */}
        <motion.input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask AI or search…"
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.18, delay: open ? 0.1 : 0 }}
          style={{
            pointerEvents: open ? "auto" : "none",
            position: "absolute",
            left: 36,
            right: 8,
            top: 0,
            bottom: 0,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--text-primary, #F1F5F9)",
            fontSize: "0.875rem",
          }}
          className="placeholder:text-zinc-500"
        />
      </motion.div>

      {/* ── Dropdown panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: EASING }}
            className="absolute top-[calc(100%+8px)] right-0 z-50 flex flex-col overflow-hidden"
            style={{
              width: 380,
              borderRadius: 16,
              background:
                "linear-gradient(155deg, rgba(7,13,11,0.97) 0%, rgba(4,9,8,0.99) 100%)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow:
                "0 32px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08) inset",
            }}
          >
            {/* Results list */}
            <div className="p-2">
              <div className="px-2 py-1.5 mb-1">
                <span className="text-[11px] font-semibold tracking-widest uppercase text-zinc-600">
                  {query ? "Results" : "Suggested"}
                </span>
              </div>

              {results.length > 0 ? (
                results.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: i * 0.04, ease: EASING }}
                    className="flex items-center gap-3 px-2.5 py-2 rounded-lg transition-colors group"
                    style={{ textDecoration: "none" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                    onClick={() => setOpen(false)}
                  >
                    {/* Icon container */}
                    <div
                      className="flex items-center justify-center flex-shrink-0 rounded-lg"
                      style={{
                        width: 28,
                        height: 28,
                        background: SECTION_COLORS[item.section]?.glow,
                        color: SECTION_COLORS[item.section]?.color,
                        border: `1px solid ${SECTION_COLORS[item.section]?.color}30`,
                      }}
                    >
                      <Icon name={item.icon} className="w-3.5 h-3.5" />
                    </div>

                    {/* Label + description */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-medium text-white leading-tight truncate">
                        {item.label}
                      </div>
                      <div className="text-[12px] text-zinc-500 leading-tight truncate mt-0.5">
                        {item.desc}
                      </div>
                    </div>

                    {/* Section badge */}
                    <span
                      className="flex-shrink-0 text-[11px] font-medium px-1.5 py-0.5 rounded-full"
                      style={{
                        background: SECTION_COLORS[item.section]?.glow,
                        color: SECTION_COLORS[item.section]?.color,
                        border: `1px solid ${SECTION_COLORS[item.section]?.color}30`,
                      }}
                    >
                      {item.section}
                    </span>
                  </motion.a>
                ))
              ) : (
                <div className="px-2.5 py-4 text-center text-zinc-500 text-sm">
                  No results for &quot;{query}&quot;
                </div>
              )}
            </div>

            {/* ── AI Answer block ── */}
            <div
              className="mx-2 mb-2 p-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="flex items-center justify-center w-5 h-5 rounded-md flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, var(--brand), var(--brand-hover))",
                    border: "1px solid color-mix(in srgb, var(--brand) 40%, transparent)",
                  }}
                >
                  <Icon name="star" className="w-3 h-3 text-white" />
                </div>
                <span
                  className="text-[11px] font-bold tracking-widest uppercase"
                  style={{ color: "var(--brand-subtle-text)" }}
                >
                  AI Answer
                </span>
              </div>

              {/* Content */}
              <div className="text-[13px] leading-relaxed text-zinc-400 min-h-[3.5rem]">
                {showDots ? (
                  <span className="flex items-center gap-1 h-5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="inline-block w-1 h-1 rounded-full"
                        style={{ background: "var(--brand)" }}
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </span>
                ) : (
                  <>
                    {aiDisplayed}
                    {!aiDone && (
                      <motion.span
                        className="inline-block w-0.5 h-3 ml-0.5 rounded-sm align-middle"
                        style={{ background: "var(--brand)" }}
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* ── Footer ── */}
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            >
              <span className="text-[12px] text-zinc-700">
                Press{" "}
                <kbd className="px-1 py-0.5 text-[10px] rounded bg-white/[0.05] text-zinc-500 font-mono">
                  ESC
                </kbd>{" "}
                to close
              </span>
              <span
                className="text-[12px] font-medium"
                style={{ color: "var(--brand-subtle-text)" }}
              >
                <a href="https://nextigent.ai" target="_blank" rel="noreferrer">
                  Powered by <span className="underline">NextiGent AI</span>
                </a>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
