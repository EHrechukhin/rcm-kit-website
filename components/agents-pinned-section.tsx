"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { agentGroups } from "@/lib/agents";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Circle, ArrowRight } from "lucide-react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const allAgents = agentGroups.flatMap((group) =>
  group.agents.map((agent) => ({ ...agent, group }))
);

const STATUS_CONFIG = {
  AVAILABLE: { label: "Available", color: "#4ade80" },
  IN_ACTIVE_DEVELOPMENT: { label: "In active development", color: "#fbbf24" },
  ON_THE_ROADMAP: { label: "On the roadmap", color: "#3f3f46" },
};

const SCROLL_PER_AGENT = 240;

export function AgentsPinnedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * allAgents.length),
        allAgents.length - 1
      );
      setActiveIdx(idx);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const activeEl = list.querySelector<HTMLElement>(`[data-agent-idx="${activeIdx}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeIdx]);

  const activeAgent = allAgents[activeIdx];
  const statusCfg = STATUS_CONFIG[activeAgent.status];

  return (
    <section
      ref={sectionRef}
      className="relative bg-black border-t border-white/6"
      style={{ height: `calc(100vh + ${allAgents.length * SCROLL_PER_AGENT}px)` }}
      aria-label="All 18 RCM agents"
    >
      <div className="sticky top-0 h-screen flex overflow-hidden">

        {/* ── Left: Agent index ── */}
        <aside className="w-[264px] shrink-0 border-r border-white/6 flex flex-col bg-black/60 backdrop-blur-xl">

          {/* Header */}
          <div className="px-5 pt-8 pb-4 border-b border-white/6">
            <p className="text-[9px] font-mono font-bold uppercase tracking-[0.18em] text-zinc-700 mb-3">
              Agent Explorer
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-white tabular-nums">
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-zinc-700 font-mono">/ {allAgents.length}</span>
            </div>
            <div className="mt-3 h-0.5 bg-white/6 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-blue-500"
                animate={{ width: `${((activeIdx + 1) / allAgents.length) * 100}%` }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Scrollable list */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto py-2"
            style={{ scrollbarWidth: "none" }}
          >
            {agentGroups.map((group) => (
              <div key={group.number}>
                <div className="px-5 pt-3 pb-1">
                  <span className="text-[8.5px] font-mono font-bold uppercase tracking-[0.16em] text-zinc-800">
                    {String(group.number).padStart(2, "0")} · {group.name}
                  </span>
                </div>
                {group.agents.map((agent) => {
                  const globalIdx = allAgents.findIndex((a) => a.slug === agent.slug);
                  const isActive = activeIdx === globalIdx;
                  const isPast = activeIdx > globalIdx;
                  return (
                    <div
                      key={agent.slug}
                      data-agent-idx={globalIdx}
                      className={cn(
                        "mx-2 px-3 py-2 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-white/8"
                          : "hover:bg-white/3"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300"
                          style={{
                            background: isActive
                              ? "#3b82f6"
                              : isPast
                              ? "#27272a"
                              : "#18181b",
                            boxShadow: isActive
                              ? "0 0 8px rgba(59,130,246,0.7)"
                              : "none",
                          }}
                        />
                        <span
                          className={cn(
                            "text-[11px] font-medium leading-tight truncate transition-colors duration-200",
                            isActive
                              ? "text-white"
                              : isPast
                              ? "text-zinc-700"
                              : "text-zinc-800"
                          )}
                        >
                          {agent.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
            <div className="h-4" />
          </div>
        </aside>

        {/* ── Right: Agent detail ── */}
        <div className="flex-1 relative flex items-center overflow-hidden grain">

          {/* Grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          {/* Ambient glow (changes position slightly per agent) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`glow-${activeAgent.group.number}`}
              className="absolute pointer-events-none rounded-full blur-[140px]"
              style={{
                width: 600,
                height: 600,
                top: "10%",
                right: "-5%",
                background:
                  activeAgent.group.number <= 2
                    ? "rgba(59,130,246,0.09)"
                    : activeAgent.group.number <= 4
                    ? "rgba(34,211,238,0.07)"
                    : activeAgent.group.number <= 6
                    ? "rgba(167,139,250,0.08)"
                    : "rgba(52,211,153,0.07)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            />
          </AnimatePresence>

          {/* Content */}
          <div className="relative z-10 w-full px-12 lg:px-20 py-12 max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 32, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.38, ease }}
              >
                {/* Stage badge */}
                <div className="flex items-center gap-3 mb-7">
                  <span
                    className="text-[9px] font-mono font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-md border"
                    style={{
                      background: "rgba(59,130,246,0.08)",
                      color: "#60a5fa",
                      borderColor: "rgba(59,130,246,0.18)",
                    }}
                  >
                    Stage {String(activeAgent.group.number).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-zinc-600">{activeAgent.group.name}</span>
                </div>

                {/* Large index watermark */}
                <div
                  className="select-none leading-none font-black tabular-nums mb-1"
                  style={{
                    fontSize: "clamp(5rem, 12vw, 9rem)",
                    color: "rgba(255,255,255,0.035)",
                  }}
                >
                  {String(activeIdx + 1).padStart(2, "0")}
                </div>

                {/* Agent name */}
                <h3
                  className="font-bold text-white leading-[1.08] -mt-6 mb-5 relative z-10"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
                >
                  {activeAgent.name}
                </h3>

                {/* Group description */}
                <p className="text-sm font-mono text-zinc-700 mb-3">
                  {activeAgent.group.description}
                </p>

                {/* Agent description */}
                <p className="text-[1.0625rem] text-zinc-400 leading-[1.75] mb-8 max-w-lg">
                  {activeAgent.description}
                </p>

                {/* Status */}
                <div className="flex items-center gap-2.5 mb-10">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: statusCfg.color,
                      boxShadow: activeAgent.status !== "ON_THE_ROADMAP"
                        ? `0 0 6px ${statusCfg.color}99`
                        : "none",
                    }}
                  />
                  <span className="text-xs font-mono text-zinc-600">{statusCfg.label}</span>
                </div>

                {/* Dot progress */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {allAgents.map((_, i) => (
                    <div
                      key={i}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === activeIdx ? 20 : 4,
                        height: 4,
                        background:
                          i === activeIdx
                            ? "#3b82f6"
                            : i < activeIdx
                            ? "#27272a"
                            : "#18181b",
                      }}
                    />
                  ))}
                </div>

                <p className="mt-4 text-[9px] font-mono uppercase tracking-[0.16em] text-zinc-800">
                  Scroll to advance
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: group context card */}
          <div className="hidden xl:flex absolute right-12 top-1/2 -translate-y-1/2 flex-col gap-2 w-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAgent.group.number}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.35, ease }}
                className="rounded-xl border border-white/6 p-5"
                style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(16px)" }}
              >
                <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-700 mb-3">
                  Stage {String(activeAgent.group.number).padStart(2, "0")} Agents
                </p>
                <div className="flex flex-col gap-1.5">
                  {activeAgent.group.agents.map((a) => {
                    const isCurrent = a.slug === activeAgent.slug;
                    return (
                      <div
                        key={a.slug}
                        className={cn(
                          "flex items-center gap-2 text-xs rounded-md px-2 py-1.5 transition-colors",
                          isCurrent ? "bg-white/6 text-white" : "text-zinc-700"
                        )}
                      >
                        <ArrowRight
                          className="w-3 h-3 shrink-0"
                          style={{ opacity: isCurrent ? 1 : 0.2 }}
                        />
                        <span className="truncate">{a.name}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
