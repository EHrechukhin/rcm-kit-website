"use client";

import Link from "next/link";
import { agentGroups } from "@/lib/agents";
import { StatusBadge } from "@/components/ui/status-badge";

interface SolutionsDropdownProps {
  onClose?: () => void;
}

export function SolutionsDropdown({ onClose }: SolutionsDropdownProps) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[800px] max-w-[calc(100vw-2rem)] bg-black/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
        <p className="text-xs font-mono font-semibold uppercase tracking-[0.12em] text-zinc-400">
          18 agents · 8 lifecycle groups
        </p>
        <Link
          href="/solutions"
          onClick={onClose}
          className="text-xs font-medium text-[#60a5fa] hover:text-white transition-colors"
        >
          See all →
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 max-h-[500px] overflow-y-auto">
        {agentGroups.map((group) => (
          <div key={group.number} className="flex flex-col gap-1.5 p-4 border-b border-r border-white/[0.04]">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold text-[#3b82f6]">
                {String(group.number).padStart(2, "0")}
              </span>
              <span className="text-[11px] font-semibold text-zinc-300 leading-tight">
                {group.name}
              </span>
            </div>
            {group.agents.map((agent) => (
              <Link
                key={agent.slug}
                href={`/solutions/${agent.slug}`}
                onClick={onClose}
                className="flex flex-col gap-1 py-1 group"
              >
                <span className="text-[12px] text-zinc-400 group-hover:text-white transition-colors leading-snug">
                  {agent.name}
                </span>
                <StatusBadge status={agent.status} dark className="self-start" />
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
