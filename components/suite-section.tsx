"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { agentGroups } from "@/lib/agents";
import { AgentCard } from "@/components/ui/agent-card";
import { FadeUp } from "@/components/motion";
import { cn } from "@/lib/utils";

const ease = [0.21, 0.47, 0.32, 0.98] as const;
const HEADER_H = 64;

export function TheSuiteSection() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { rootMargin: `-${HEADER_H}px 0px 0px 0px`, threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const filteredGroups =
    activeStage === null
      ? agentGroups
      : agentGroups.filter((g) => g.number === activeStage);

  const agentCount = filteredGroups.reduce((acc, g) => acc + g.agents.length, 0);

  function handlePill(n: number) {
    setActiveStage((prev) => (prev === n ? null : n));
    if (sentinelRef.current) {
      const rect = sentinelRef.current.getBoundingClientRect();
      if (rect.top < HEADER_H) {
        const target = window.scrollY + rect.top - HEADER_H;
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    }
  }

  return (
    <section className="relative bg-[#F7F8FA] py-28 px-6 lg:px-10" style={{ overflowAnchor: "none" }}>

      {/* -- Background -- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(15,23,42,0.045) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Top edge signal */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, var(--suite-signal), transparent)" }} />
      </div>

      <div className="relative z-10 max-w-none mx-auto flex flex-col gap-14">

        {/* -- Header -- */}
        <FadeUp className="max-w-3xl">
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-[1.06] tracking-tight mb-5 text-[#090c12]">
            18 agents.{" "}
            <span
              className="gradient-text"
            >
              One coordinated workforce.
            </span>
          </h2>
          <p className="text-[1rem] leading-[1.8] text-zinc-500 max-w-xl">
            Eight lifecycle stages executed end-to-end. Select a stage to explore
            the agents that power it.
          </p>
        </FadeUp>

        {/* -- Pipeline track -- */}
        <FadeUp delay={0.08}>
          <div className="overflow-x-auto">
            <div className="flex items-center min-w-max pb-0.5">
              {agentGroups.map((group, i) => (
                <div key={group.number} className="flex items-center">
                  {/* Node */}
                  <motion.button
                    onClick={() => handlePill(group.number)}
                    className="flex flex-col items-center gap-2 group focus-visible:outline-none"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ duration: 0.18, ease }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-250"
                      style={{
                        backgroundColor:
                          activeStage === null || activeStage === group.number
                            ? "var(--brand)"
                            : "#dde1ea",
                        boxShadow:
                          activeStage === group.number
                            ? "0 0 0 4px var(--brand-subtle)"
                            : "none",
                      }}
                    >
                      <span
                        className={cn(
                          "font-mono text-[10px] font-bold leading-none transition-colors duration-200",
                          activeStage === null || activeStage === group.number
                            ? "text-white"
                            : "text-zinc-400"
                        )}
                      >
                        {String(group.number).padStart(2, "0")}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "text-[9px] font-mono uppercase tracking-widest whitespace-nowrap transition-colors duration-200",
                        activeStage === null || activeStage === group.number
                          ? "font-semibold"
                          : "text-zinc-400"
                      )}
                      style={
                        activeStage === null || activeStage === group.number
                          ? { color: "var(--brand)" }
                          : undefined
                      }
                    >
                      {group.name.split(" ")[0]}
                    </span>
                  </motion.button>

                  {/* Connector */}
                  {i < agentGroups.length - 1 && (
                    <div
                      className="w-9 h-px mx-0.5 shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: activeStage === null ? "var(--brand)" : "#dde1ea",
                        opacity: activeStage === null ? 0.35 : 0.6,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* -- Filter pills + Agent groups (shared container so sticky has room) -- */}
        <div>
          <div ref={sentinelRef} className="h-0" />
          <LayoutGroup id="suite-filters">
            {/* Sticky filter bar */}
            <div
              className={cn(
                "filter-steps sticky top-16 z-20 -mx-6 lg:-mx-10 px-6 lg:px-10 py-3 bg-[#F7F8FA]/90 backdrop-blur-md border-b border-zinc-200/60 transition-shadow duration-300",
                isSticky && "shadow-[0_6px_28px_-4px_rgba(0,0,0,0.10),0_2px_8px_-2px_rgba(0,0,0,0.06)]"
              )}
            >
              <div className="flex items-center gap-2 flex-wrap">

                {/* All */}
                <button
                  onClick={() => setActiveStage(null)}
                  className={cn(
                    "relative h-9 px-4 rounded-full text-sm font-semibold transition-colors duration-150 shrink-0",
                    activeStage === null
                      ? "text-white"
                      : "text-zinc-500 bg-white border border-zinc-200 hover:border-zinc-300 hover:text-zinc-800 shadow-sm"
                  )}
                >
                  {activeStage === null && (
                    <motion.span
                      layoutId="suite-filter-bg"
                      className="absolute inset-0 rounded-full bg-[#0f172a]"
                      transition={{ duration: 0.28, ease }}
                    />
                  )}
                  <span className="relative z-10">All stages</span>
                </button>

                {agentGroups.map((group) => (
                  <button
                    key={group.number}
                    onClick={() => handlePill(group.number)}
                    className={cn(
                      "relative h-9 px-4 rounded-full text-sm font-medium transition-colors duration-150 shrink-0",
                      activeStage === group.number
                        ? "text-white"
                        : "text-zinc-500 bg-white border border-zinc-200 hover:border-zinc-300 hover:text-zinc-800 shadow-sm"
                    )}
                  >
                    {activeStage === group.number && (
                      <motion.span
                        layoutId="suite-filter-bg"
                        className="absolute inset-0 rounded-full bg-[#0f172a]"
                        transition={{ duration: 0.28, ease }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span className="font-mono text-[10px] opacity-50">
                        {String(group.number).padStart(2, "0")}
                      </span>
                      {group.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Context text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={String(activeStage)}
                initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                transition={{ duration: 0.22, ease }}
                className="text-[11px] font-mono text-zinc-400 leading-none pt-3"
              >
                {activeStage === null
                  ? "18 agents \u00b7 8 lifecycle stages"
                  : `${agentCount} agent${agentCount !== 1 ? "s" : ""} \u00b7 ${filteredGroups[0]?.name} \u2014 ${filteredGroups[0]?.description}`}
              </motion.p>
            </AnimatePresence>
          </LayoutGroup>

          {/* -- Agent groups -- */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage ?? "all"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease }}
              className="flex flex-col gap-16 mt-14"
            >
            {filteredGroups.map((group, gi) => (
              <div key={group.number} className="flex flex-col gap-6">

                {/* Group header */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center" style={{ border: "1px solid var(--brand-subtle)" }}>
                    <span className="font-mono text-[11px] font-bold" style={{ color: "var(--brand)" }}>
                      {String(group.number).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[1.125rem] font-bold text-zinc-900 leading-[1.3]">
                      {group.name}
                    </h3>
                    <p className="text-[0.875rem] text-zinc-500 mt-1 max-w-lg leading-relaxed">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.agents.map((agent, ai) => (
                    <motion.div
                      key={agent.slug}
                      initial={{ opacity: 0, y: 16, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.42,
                        ease,
                        delay: ai * 0.06 + gi * 0.04,
                      }}
                    >
                      <AgentCard
                        name={agent.name}
                        description={agent.description}
                        status={agent.status}
                        href={`/solutions/${agent.slug}`}
                        dark={false}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
