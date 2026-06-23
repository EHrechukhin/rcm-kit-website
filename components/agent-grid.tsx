"use client";

import { agentGroups } from "@/lib/agents";
import { AgentCard } from "@/components/ui/agent-card";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils";

interface AgentGridProps {
  dark?: boolean;
  className?: string;
}

export function AgentGrid({ dark = true, className }: AgentGridProps) {
  return (
    <div className={cn("flex flex-col gap-20", className)}>
      {agentGroups.map((group, i) => (
        <div key={group.number} className="flex flex-col gap-6">
          <FadeUp delay={0}>
            <div className="flex items-baseline gap-3 mb-2">
              <span className={cn(
                "font-mono text-xs font-bold tabular-nums",
                dark ? "text-[#3b82f6]" : "text-[#2563eb]"
              )}>
                {String(group.number).padStart(2, "0")}
              </span>
              <h3 className={cn(
                "text-[1.25rem] font-bold leading-[1.3]",
                dark ? "text-white" : "text-[#09090b]"
              )}>
                {group.name}
              </h3>
            </div>
            <p className={cn(
              "text-[0.875rem] leading-[1.6] max-w-xl",
              dark ? "text-zinc-500" : "text-zinc-500"
            )}>
              {group.description}
            </p>
          </FadeUp>
          <Stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            delay={0.05}
            staggerDelay={0.06}
          >
            {group.agents.map((agent) => (
              <StaggerItem key={agent.slug}>
                <AgentCard
                  name={agent.name}
                  description={agent.description}
                  status={agent.status}
                  href={`/solutions/${agent.slug}`}
                  dark={dark}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      ))}
    </div>
  );
}
