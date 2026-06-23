"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StatusBadge, type AgentStatus } from "./status-badge";

interface AgentCardProps {
  name: string;
  description: string;
  status: AgentStatus;
  href?: string;
  dark?: boolean;
  className?: string;
}

export function AgentCard({ name, description, status, href, dark = true, className }: AgentCardProps) {
  const content = (
    <motion.div
      className={cn(
        "rounded-xl p-5 flex flex-col gap-3 cursor-default",
        dark
          ? "glow-card"
          : "bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-md transition-all duration-200",
        href && "cursor-pointer",
        className
      )}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <StatusBadge status={status} dark={dark} />
      <div className="flex flex-col gap-1.5 flex-1">
        <h4 className={cn(
          "text-[0.9375rem] font-semibold leading-[1.4] text-zinc-900"
        )}>
          {name}
        </h4>
        <p className={cn(
          "text-[0.8125rem] leading-[1.6] text-zinc-500"
        )}>
          {description}
        </p>
      </div>
      {href && (
        <span className={cn(
          "text-xs font-medium mt-auto",
          dark ? "text-zinc-600 group-hover:text-[#60a5fa]" : "text-zinc-400"
        )}>
          Learn more →
        </span>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className="block group">
        {content}
      </Link>
    );
  }
  return content;
}
