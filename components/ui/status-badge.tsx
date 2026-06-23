import { cn } from "@/lib/utils";

export type AgentStatus =
  | "AVAILABLE"
  | "IN_ACTIVE_DEVELOPMENT"
  | "ON_THE_ROADMAP"
  | "FLAGSHIP";

const lightConfig: Record<AgentStatus, { label: string; className: string }> = {
  AVAILABLE:            { label: "Available",            className: "badge-available" },
  IN_ACTIVE_DEVELOPMENT:{ label: "In Active Development",className: "badge-dev" },
  ON_THE_ROADMAP:       { label: "On the Roadmap",       className: "badge-roadmap" },
  FLAGSHIP:             { label: "Flagship",             className: "badge-flagship" },
};

const darkConfig: Record<AgentStatus, { label: string; className: string }> = {
  AVAILABLE:            { label: "Available",            className: "badge-available-dark" },
  IN_ACTIVE_DEVELOPMENT:{ label: "In Active Development",className: "badge-dev-dark" },
  ON_THE_ROADMAP:       { label: "On the Roadmap",       className: "badge-roadmap-dark" },
  FLAGSHIP:             { label: "Flagship",             className: "badge-flagship-dark" },
};

interface StatusBadgeProps {
  status: AgentStatus;
  dark?: boolean;
  className?: string;
}

export function StatusBadge({ status, dark = true, className }: StatusBadgeProps) {
  const config = dark ? darkConfig[status] : lightConfig[status];
  return (
    <span
      className={cn(
        "inline-flex w-fit text-zinc-900 border-zinc-900 border items-center rounded-full px-2.5 py-0.5 text-[11px] font-mono font-semibold uppercase tracking-wide",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
