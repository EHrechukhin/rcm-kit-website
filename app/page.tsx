"use client";

import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ContactSection } from "@/components/contact-section/ContactSection";
import { FAQSection } from "@/components/faq-section";
import {
  FadeUp,
  Stagger,
  StaggerItem,
  ScaleIn,
  TiltCard,
} from "@/components/motion";
import { TheSuiteSection } from "@/components/suite-section";
import { TheProblemSection } from "@/components/problem-section";
import { HeroCanvas } from "@/components/hero-canvas";
import { HeroTagline } from "@/components/hero-tagline";
import { ROIEstimator } from "@/components/roi-estimator";
import { useContactModal } from "@/components/contact-modal/useContactModal";
import { ContactForm } from "@/components/contact-modal/ContactForm";
import { BookDemoForm } from "@/components/contact-modal/BookDemoForm";
import {
  ShieldCheck,
  Eye,
  GitBranch,
  BarChart3,
  Layers,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const ACTIVITIES = [
  {
    id: 1,
    icon: CheckCircle2,
    color: "#4ade80",
    agent: "ERA Posting",
    action: "Posted 14 EOBs — Blue Cross",
    time: "2s",
  },
  {
    id: 2,
    icon: CheckCircle2,
    color: "#4ade80",
    agent: "Denial Detection",
    action: "Flagged CARC 97 — Aetna",
    time: "6s",
  },
  {
    id: 3,
    icon: Clock,
    color: "#fbbf24",
    agent: "Prior Auth",
    action: "Checking UHC auth #882",
    time: "now",
  },
  {
    id: 4,
    icon: CheckCircle2,
    color: "#4ade80",
    agent: "Eligibility",
    action: "Verified 3 — Cigna",
    time: "15s",
  },
  {
    id: 5,
    icon: Zap,
    color: "#60a5fa",
    agent: "AR Follow-up",
    action: "Queued 6 claims — BCBS",
    time: "1m",
  },
  {
    id: 6,
    icon: CheckCircle2,
    color: "#4ade80",
    agent: "Payment Posting",
    action: "Reconciled $14,280",
    time: "2m",
  },
];

type WindowState = "normal" | "minimized" | "closed" | "expanded";

function AgentActivityFeed() {
  const { open } = useContactModal();
  const [startIndex, setStartIndex] = useState(0);
  const [windowState, setWindowState] = useState<WindowState>("normal");
  const [dotsHovered, setDotsHovered] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setStartIndex((i) => i + 1), 2800);
    return () => clearInterval(id);
  }, []);

  const visible = Array.from({ length: 5 }, (_, i) => {
    const globalIndex = startIndex + i;
    return { ...ACTIVITIES[globalIndex % ACTIVITIES.length], uid: globalIndex };
  });

  const isMinimized = windowState === "minimized";
  const isClosed = windowState === "closed";
  const isExpanded = windowState === "expanded";

  if (isClosed) {
    return (
      <AnimatePresence>
        <motion.button
          key="pill"
          initial={{ opacity: 0, scale: 0.85, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 8 }}
          transition={{ duration: 0.3, ease }}
          onClick={() => setWindowState("normal")}
          className="fixed bottom-2 right-6 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 backdrop-blur-xl cursor-pointer select-none"
          style={{
            background: "rgba(24,24,26,0.9)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#4ade80" }}
          />
          <span className="text-[11px] font-medium text-zinc-400">
            6 agents running
          </span>
        </motion.button>
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: 60, filter: "blur(8px)" }}
      transition={{ duration: 0.38, ease }}
      className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl"
      style={{
        background:
          "linear-gradient(160deg, rgba(30,30,32,0.95) 0%, rgba(18,18,20,0.98) 100%)",
      }}
    >
      {/* Titlebar */}
      <div
        className="flex items-center gap-0 px-4 h-9 border-b border-white/[0.07] select-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(50,50,54,0.9) 0%, rgba(38,38,42,0.9) 100%)",
          borderBottom: isMinimized ? "none" : undefined,
        }}
        onClick={() => {
          if (isMinimized) setWindowState("normal");
        }}
      >
        <div
          className="flex items-center gap-1.5 mr-4"
          onMouseEnter={() => setDotsHovered(true)}
          onMouseLeave={() => setDotsHovered(false)}
        >
          {/* Red — close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setWindowState("closed");
            }}
            className="relative w-3 h-3 rounded-full bg-[#ff5f57] ring-1 ring-black/20 flex items-center justify-center cursor-pointer transition-[filter] duration-150 hover:brightness-110"
          >
            <span
              className="text-[7px] font-bold text-[#7a1a17] leading-none transition-opacity duration-150"
              style={{ opacity: dotsHovered ? 1 : 0 }}
            >
              ✕
            </span>
          </button>

          {/* Yellow — minimize */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setWindowState((s) => (s === "minimized" ? "normal" : "minimized"));
            }}
            className="relative w-3 h-3 rounded-full bg-[#febc2e] ring-1 ring-black/20 flex items-center justify-center cursor-pointer transition-[filter] duration-150 hover:brightness-110"
          >
            <span
              className="text-[9px] font-bold text-[#7a5a00] leading-none transition-opacity duration-150"
              style={{ opacity: dotsHovered ? 1 : 0, marginTop: "-1px" }}
            >
              −
            </span>
          </button>

          {/* Green — expand / CTA */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setWindowState((s) => (s === "expanded" ? "normal" : "expanded"));
            }}
            className="relative w-3 h-3 rounded-full bg-[#28c840] ring-1 ring-black/20 flex items-center justify-center cursor-pointer transition-[filter] duration-150 hover:brightness-110"
          >
            <span
              className="text-[8px] font-bold text-[#0a4a14] leading-none transition-opacity duration-150"
              style={{ opacity: dotsHovered ? 1 : 0 }}
            >
              +
            </span>
          </button>
        </div>

        <div className="flex-1 flex items-center justify-end gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--status-success)" }}
          />
          <span className="text-[11px] font-medium text-zinc-400 tracking-wide">
            Live Agent Activity
          </span>
        </div>
      </div>

      {/* Body */}
      <AnimatePresence initial={false}>
        {!isMinimized && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease }}
            style={{ overflow: "hidden" }}
          >
            <div className="p-5">
              <div className="flex flex-col gap-2.5">
                <AnimatePresence initial={false} mode="popLayout">
                  {visible.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.uid}
                        layout
                        initial={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        transition={{ duration: 0.38, ease }}
                        className="flex items-start gap-3.5 rounded-lg px-4 py-3"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <Icon
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: item.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-zinc-300 truncate">
                            {item.agent}
                          </p>
                          <p className="text-xs text-zinc-400 truncate mt-0.5">
                            {item.action}
                          </p>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-700 shrink-0 mt-0.5">
                          {item.time} ago
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* CTA strip — expanded state */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  key="cta"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    className="mx-4 mb-4 rounded-lg px-4 py-3 flex items-center justify-between gap-3"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.03))",
                      border: "1px solid rgba(34,197,94,0.15)",
                    }}
                  >
                    <div>
                      <p className="text-[11px] font-semibold text-zinc-300 mb-0.5">
                        Ready to deploy agents?
                      </p>
                      <p className="text-[11px] text-zinc-600 leading-relaxed">
                        See how it works in your system.
                      </p>
                    </div>
                    <button
                      className="btn-outline shrink-0 whitespace-nowrap cursor-pointer"
                      style={{ fontSize: "11px", padding: "6px 12px" }}
                      onClick={() => { open(<BookDemoForm />, "Book a demo"); setWindowState("normal"); }}
                    >
                      Book a demo →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


export default function HomePage() {
  const { open } = useContactModal();
  const { scrollY } = useScroll();
  const glowOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const glowScale = useTransform(scrollY, [0, 500], [1, 0.7]);
  return (
    <div className="bg-[#0d0d10] text-white">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grain">
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div
            className="aurora-1 absolute top-[25%] left-[20%] w-175 h-175 rounded-full blur-[130px]"
            style={{ background: "var(--aurora-1)" }}
          />
          <div
            className="aurora-2 absolute top-[10%] right-[15%] w-125 h-150 rounded-full blur-[110px]"
            style={{ background: "var(--aurora-2)" }}
          />
          <div
            className="aurora-3 absolute bottom-[15%] right-[25%] w-100 h-100 rounded-full blur-[100px]"
            style={{ background: "var(--aurora-3)" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <HeroCanvas />
        </motion.div>

        {/* Centered green glow that blurs where the canvas lines originate; fades out on scroll */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[42%] pointer-events-none z-[2]"
          style={{
            opacity: glowOpacity,
            scale: glowScale,
            transformOrigin: "50% 100%",
            background:
              "radial-gradient(55% 130% at 50% 100%, color-mix(in srgb, var(--brand) 30%, transparent), transparent 70%)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            maskImage:
              "radial-gradient(55% 130% at 50% 100%, #000 0%, #000 40%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(55% 130% at 50% 100%, #000 0%, #000 40%, transparent 72%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="flex flex-col gap-6">
            <motion.h1
              className="text-[clamp(3.25rem,7.5vw,6.5rem)] font-black leading-[0.9] tracking-tight max-w-5xl"
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, ease, delay: 0.2 }}
              >
                Stop staffing your revenue cycle.
              </motion.span>
              <motion.span
                className="gradient-text block mt-2"
                initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.65, ease, delay: 0.5 }}
              >
                Deploy it.
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-[1.0625rem] leading-[1.75] text-zinc-400 max-w-2xl"
              initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.65, ease, delay: 0.95 }}
            >
              Eighteen coordinated AI agents that execute the transactional work
              of revenue cycle management — inside your existing systems, with
              humans in the loop where judgment matters.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3 pt-1"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.55, ease, delay: 1.15 }}
            >
              <button onClick={() => open(<ContactForm />, "Contact us")} className="group btn-cta">
                Contact
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              <Link href="/platform" className="btn-outline">
                See the platform
              </Link>
            </motion.div>

            <HeroTagline delay={1.35} />
          </div>
        </div>

        <motion.div
          className="hidden xl:block absolute right-16 bottom-12 z-10 w-116"
          initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease, delay: 1.1 }}
        >
          <AgentActivityFeed />
        </motion.div>

      </section>

      {/* ── The Problem ── */}
      <TheProblemSection />

      {/* ── The Shift ── */}
      <section className="relative py-28 px-6 lg:px-10 border-t border-white/6 overflow-hidden grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="aurora-1 absolute top-[5%] left-[5%] w-165 h-155 rounded-full blur-[130px]"
            style={{ background: "var(--aurora-1)" }}
          />
          <div
            className="aurora-2 absolute top-[0%] right-[8%] w-130 h-130 rounded-full blur-[120px]"
            style={{ background: "var(--aurora-2)" }}
          />
          <div
            className="aurora-3 absolute bottom-[0%] right-[22%] w-105 h-85 rounded-full blur-[100px]"
            style={{ background: "var(--aurora-3)" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <FadeUp>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-black leading-[1.08] tracking-tight mb-6">
                Stop staffing the revenue cycle.{" "}
                <span className="gradient-text">Start deploying it.</span>
              </h2>
              <p className="text-[1rem] leading-[1.75] text-zinc-400 mb-4">
                Most RCM work is deterministic. Eligibility lookups, ERA
                posting, status queries, appeal drafting — the work is
                repetitive enough to model, regulated enough to require control,
                and large enough that staffing alone never catches up.
              </p>
              <p className="text-[1rem] leading-[1.75] text-zinc-500">
                Payers have been deploying automation against providers for a
                decade. Standing still is not neutral.
              </p>
            </FadeUp>
          </div>

          <Stagger className="flex flex-col gap-2.5" delay={0.1}>
            {[
              {
                icon: Layers,
                title: "Agentic execution",
                body: "Agents that execute multi-step workflows, orchestrated together, with evaluation gates.",
                color: "#60a5fa",
                glow: "rgba(59,130,246,0.15)",
                ring: "rgba(59,130,246,0.2)",
              },
              {
                icon: ShieldCheck,
                title: "Human-in-the-loop",
                body: "Outputs with regulatory exposure are reviewed by a person before they leave the system.",
                color: "#34d399",
                glow: "rgba(52,211,153,0.13)",
                ring: "rgba(52,211,153,0.2)",
              },
              {
                icon: Eye,
                title: "Evaluation gates",
                body: "An agent must clear evaluation thresholds before it goes live, and to stay live.",
                color: "#fbbf24",
                glow: "rgba(251,191,36,0.13)",
                ring: "rgba(251,191,36,0.2)",
              },
              {
                icon: BarChart3,
                title: "Audit & observability",
                body: "Every action and decision is logged and retained, monitored continuously.",
                color: "#a78bfa",
                glow: "rgba(167,139,250,0.13)",
                ring: "rgba(167,139,250,0.2)",
              },
              {
                icon: GitBranch,
                title: "Coordinated suite",
                body: "18 agents sharing a common architecture — the kit behaves as one system.",
                color: "#22d3ee",
                glow: "rgba(34,211,238,0.12)",
                ring: "rgba(34,211,238,0.2)",
              },
            ].map(({ icon: Icon, title, body, color, glow, ring }, idx) => (
              <StaggerItem key={title}>
                <TiltCard maxTilt={3}>
                  <div
                    className="glow-card rounded-xl overflow-hidden group"
                    style={{
                      background: "var(--glow-card-tint)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid var(--glow-card-tint-border)",
                    }}
                  >
                    <div
                      className="h-px shrink-0"
                      style={{
                        background: `linear-gradient(90deg, ${color}80, transparent 60%)`,
                      }}
                    />
                    <div className="relative p-4 flex gap-4 items-start">
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle 44px at 32px 50%, ${glow} 0%, transparent 100%)`,
                        }}
                      />
                      <span className="absolute top-3 right-4 text-[10px] font-mono text-zinc-800 tabular-nums select-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div
                        className="relative shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          background: glow,
                          boxShadow: `0 0 0 1px ${ring}`,
                        }}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color }}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="relative">
                        <p className="text-sm font-semibold text-white mb-0.5">
                          {title}
                        </p>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                          {body}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── The Suite ── */}
      <TheSuiteSection />

      {/* ── ROI Estimator ── */}
      <section className="relative py-28 px-6 lg:px-10 border-t border-white/6 overflow-hidden grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="aurora-3 absolute top-[5%] right-[5%] w-150 h-140 rounded-full blur-[130px]"
            style={{ background: "var(--aurora-1)" }}
          />
          <div
            className="aurora-1 absolute bottom-[0%] left-[8%] w-130 h-125 rounded-full blur-[120px]"
            style={{ background: "var(--aurora-2)" }}
          />
          <div
            className="aurora-2 absolute top-[40%] right-[28%] w-95 h-80 rounded-full blur-[100px]"
            style={{ background: "var(--aurora-3)" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeUp>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-black leading-[1.08] tracking-tight mb-6">
              See the illustrative{" "}
              <motion.span
                className="gradient-text"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease, delay: 0.3 }}
              >
                revenue opportunity
              </motion.span>
              .
            </h2>
            <p className="text-[1rem] leading-[1.75] text-zinc-400 mb-3">
              Move the slider to model the recovery band at your
              organization&apos;s scale. Built on published industry benchmarks.
            </p>
            <p className="text-[1rem] leading-[1.75] text-zinc-500 mb-8">
              An illustrative floor to frame the conversation — not a guarantee
              of results.
            </p>
            <Link
              href="/roi-estimator"
              className="text-sm font-medium text-zinc-500 hover:text-white transition-colors duration-200"
            >
              Open full estimator →
            </Link>
          </FadeUp>

          <ScaleIn>
            <TiltCard maxTilt={2}>
              <div className="glow-card rounded-2xl p-8 lg:p-12">
                <ROIEstimator />
              </div>
            </TiltCard>
          </ScaleIn>
        </div>
      </section>
      {/* ── FAQ ── */}
      <FAQSection />

      <ContactSection />
    </div>
  );
}
