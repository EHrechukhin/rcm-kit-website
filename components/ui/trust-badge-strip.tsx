import { cn } from "@/lib/utils";

interface TrustBadgeStripProps {
  badges: string[];
  className?: string;
}

export function TrustBadgeStrip({ badges, className }: TrustBadgeStripProps) {
  return (
    <p
      className={cn(
        "text-xs font-mono font-semibold uppercase tracking-[0.12em] text-[#94a3b8]",
        className
      )}
    >
      {badges.join(" · ")}
    </p>
  );
}
