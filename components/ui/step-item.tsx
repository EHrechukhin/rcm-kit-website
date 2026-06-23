import { cn } from "@/lib/utils";

interface StepItemProps {
  number: number;
  title: string;
  description: string;
  dark?: boolean;
  className?: string;
}

export function StepItem({ number, title, description, dark = false, className }: StepItemProps) {
  const num = String(number).padStart(2, "0");
  return (
    <div className={cn("flex gap-6", className)}>
      <div className="flex-shrink-0">
        <span className={cn("font-mono text-5xl font-bold leading-none", dark ? "text-[#60a5fa]" : "text-[#2563eb]")}>
          {num}
        </span>
      </div>
      <div className="flex flex-col gap-2 pt-2">
        <h3 className={cn("text-[1.5rem] font-semibold leading-[1.3]", dark ? "text-[#f8fafc]" : "text-[#0f172a]")}>
          {title}
        </h3>
        <p className={cn("text-[1rem] leading-[1.7]", dark ? "text-[#94a3b8]" : "text-[#475569]")}>
          {description}
        </p>
      </div>
    </div>
  );
}
