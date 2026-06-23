import { cn } from "@/lib/utils";

interface StatBlockProps {
  value: string;
  label: string;
  source?: string;
  dark?: boolean;
  className?: string;
}

export function StatBlock({ value, label, source, dark = false, className }: StatBlockProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <p className={cn("text-[3rem] font-bold leading-[1.1]", dark ? "text-[#60a5fa]" : "text-[#2563eb]")}>
        {value}
      </p>
      <p className={cn("text-[0.875rem] font-medium leading-[1.6]", dark ? "text-[#f8fafc]" : "text-[#0f172a]")}>
        {label}
      </p>
      {source && (
        <p className={cn("text-[0.75rem] italic leading-[1.5]", dark ? "text-[#94a3b8]" : "text-[#94a3b8]")}>
          {source}
        </p>
      )}
    </div>
  );
}
