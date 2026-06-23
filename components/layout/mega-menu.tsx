"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertCircle,
  TrendingUp,
  CreditCard,
  Calendar,
  ChevronRight,
  Zap,
} from "lucide-react";
import { agentGroups } from "@/lib/agents";
import { useContactModal } from "@/components/contact-modal/useContactModal";
import { BookDemoForm } from "@/components/contact-modal/BookDemoForm";

interface MegaMenuProps {
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const FEATURED = [
  {
    slug: "insurance-eligibility-verification",
    name: "Eligibility Verification",
    tagline: "Verify active coverage across all payers before care.",
    icon: ShieldCheck,
    color: "#60a5fa",
    glow: "rgba(59,130,246,0.15)",
    ring: "rgba(59,130,246,0.15)",
  },
  {
    slug: "denials-management-appeals",
    name: "Denials & Appeals",
    tagline: "Classify by root cause, draft appeals, track resolution.",
    icon: AlertCircle,
    color: "#fbbf24",
    glow: "rgba(245,158,11,0.13)",
    ring: "rgba(245,158,11,0.15)",
  },
  {
    slug: "accounts-receivable-follow-up",
    name: "A/R Follow-Up",
    tagline: "Work aged buckets by payer, balance, and collectibility.",
    icon: TrendingUp,
    color: "#34d399",
    glow: "rgba(16,185,129,0.12)",
    ring: "rgba(16,185,129,0.15)",
  },
  {
    slug: "payment-posting",
    name: "Payment Posting",
    tagline: "Auto-post ERA/EOB with full audit trail and reconciliation.",
    icon: CreditCard,
    color: "#a78bfa",
    glow: "rgba(139,92,246,0.13)",
    ring: "rgba(139,92,246,0.15)",
  },
];

const STATS = [
  { value: "18", label: "AI agents" },
  { value: "8", label: "Lifecycle stages" },
  { value: "96%", label: "Clean claim rate" },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.04 },
  },
};

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.26, ease },
  },
};

const agentVariants = {
  hidden: { opacity: 0, x: -6 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease },
  },
};

export function MegaMenu({ onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  const { open } = useContactModal();
  const pathname = usePathname();
  return (
    <div
      id="solutions-menu"
      role="dialog"
      aria-modal="false"
      aria-label="Solutions navigation"
      className="absolute top-full mt-3 rounded-2xl border border-white/[0.12] overflow-hidden"
      style={{
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(980px, calc(100vw - 2rem))",
        background:
          "linear-gradient(155deg, rgba(7,13,11,0.97) 0%, rgba(4,9,8,0.99) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:
          "0 32px 90px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08) inset",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* ── Featured section ── */}
      <div className="p-5 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center justify-between mb-4 px-0.5">
          <p className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-400">
            Featured Solutions
          </p>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
            <span className="w-1 h-1 rounded-full bg-[#3b82f6] animate-pulse" aria-hidden="true" />
            18 agents live in the suite
          </span>
        </div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-2"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {FEATURED.map((f) => {
            const Icon = f.icon;
            const active = pathname === `/solutions/${f.slug}`;
            return (
              <motion.div key={f.slug} variants={cardVariants}>
                <Link
                  href={`/solutions/${f.slug}`}
                  onClick={onClose}
                  className={cn(
                    "group relative flex flex-col gap-3.5 p-4 rounded-xl border transition-all duration-250 overflow-hidden",
                    active
                      ? "border-white/[0.22]"
                      : "border-white/[0.08] hover:border-white/[0.16]"
                  )}
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  {/* hover/active glow */}
                  <div
                    className={cn(
                      "absolute inset-0 transition-opacity duration-300 pointer-events-none",
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}
                    style={{
                      background: `radial-gradient(ellipse at 20% 20%, ${f.glow} 0%, transparent 70%)`,
                    }}
                  />

                  <div
                    className="relative w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${f.glow}`,
                      boxShadow: `0 0 0 1px ${f.ring}`,
                    }}
                  >
                    <Icon className="w-[18px] h-[18px]" style={{ color: f.color }} aria-hidden="true" />
                  </div>

                  <div className="relative flex flex-col gap-1 flex-1">
                    <p className="text-[14px] font-semibold text-white transition-colors leading-tight">
                      {f.name}
                    </p>
                    <p className="text-[12px] text-zinc-300 group-hover:text-zinc-100 transition-colors leading-snug">
                      {f.tagline}
                    </p>
                  </div>

                  <div
                    className="relative inline-flex items-center gap-1 text-[12px] font-semibold transition-all duration-200 group-hover:gap-1.5"
                    style={{ color: f.color }}
                  >
                    Learn more<span className="sr-only"> about {f.name}</span>
                    <ChevronRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── All agents + CTA ── */}
      <div className="flex">
        {/* agents grid */}
        <div className="flex-1 min-w-0 p-5">
          <p className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 mb-4">
            All 18 Agents
          </p>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-4"
            variants={{ show: { transition: { staggerChildren: 0.025, delayChildren: 0.15 } }, hidden: {} }}
            initial="hidden"
            animate="show"
          >
            {agentGroups.map((group) => (
              <motion.div key={group.number} className="flex flex-col gap-0.5" variants={agentVariants}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#3b82f6]/80 tabular-nums">
                    {String(group.number).padStart(2, "0")}
                  </span>
                  <span className="text-[12px] font-semibold text-zinc-200 leading-tight truncate">
                    {group.name}
                  </span>
                </div>
                {group.agents.map((agent) => {
                  const agentActive = pathname === `/solutions/${agent.slug}`;
                  return (
                    <Link
                      key={agent.slug}
                      href={`/solutions/${agent.slug}`}
                      onClick={onClose}
                      className={cn(
                        "group/a flex items-center gap-1.5 py-[3px] text-[12px] transition-colors leading-snug",
                        agentActive ? "text-white" : "text-zinc-400 hover:text-white"
                      )}
                    >
                      <span
                        className={cn(
                          "w-1 h-1 rounded-full transition-colors flex-shrink-0",
                          agentActive ? "bg-[#3b82f6]" : "bg-zinc-600 group-hover/a:bg-[#3b82f6]"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{agent.name}</span>
                    </Link>
                  );
                })}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA sidebar */}
        <motion.div
          className="w-[196px] flex-shrink-0 flex flex-col border-l border-white/[0.08]"
          style={{ background: "rgba(255,255,255,0.03)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {/* stats */}
          <div className="p-5 pb-4 border-b border-white/[0.08] flex flex-col gap-3">
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[24px] font-black text-white leading-none tabular-nums">
                  {value}
                </span>
                <span className="text-[12px] text-zinc-300">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="p-4 flex flex-col gap-2 mt-auto">
            <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-zinc-400 mb-1">
              Get started
            </p>
            <button
              onClick={() => { open(<BookDemoForm />, "Book a demo"); onClose?.(); }}
              className="group btn-nav !text-[13px] w-full"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book a Demo
            </button>
            <Link
              href="/solutions"
              onClick={onClose}
              className={cn(
                "flex items-center justify-center gap-2 h-9 px-4 text-[13px] font-medium rounded-lg border transition-all duration-200",
                pathname === "/solutions"
                  ? "bg-white/[0.08] border-white/[0.22] text-white"
                  : "border-white/[0.12] text-zinc-300 hover:bg-white/[0.08] hover:border-white/[0.22] hover:text-white"
              )}
            >
              <Zap className="w-3.5 h-3.5" />
              All 18 agents
            </Link>
          </div>

          {/* footer note */}
          <div className="px-4 pb-4">
            <p className="text-[11px] text-zinc-400 leading-snug">
              Human-in-the-loop · Auditable · Built for healthcare
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
