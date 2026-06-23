import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}

export function SectionLabel({ children, dark = false, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-xs font-mono font-semibold uppercase tracking-[0.15em]",
        dark ? "text-[#60a5fa]" : "text-[#2563eb]",
        className
      )}
    >
      {children}
    </p>
  );
}
