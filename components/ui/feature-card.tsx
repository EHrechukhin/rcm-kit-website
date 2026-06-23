import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
  dark?: boolean;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, body, dark = false, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6 flex flex-col gap-4",
        dark
          ? "bg-[#0a1628] border border-[#122044]"
          : "bg-white border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      <Icon
        className={cn("w-6 h-6", dark ? "text-[#60a5fa]" : "text-[#2563eb]")}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-2">
        <h4 className={cn("text-[1.125rem] font-semibold leading-[1.4]", dark ? "text-[#f8fafc]" : "text-[#0f172a]")}>
          {title}
        </h4>
        <p className={cn("text-[0.875rem] leading-[1.6]", dark ? "text-[#94a3b8]" : "text-[#475569]")}>
          {body}
        </p>
      </div>
    </div>
  );
}
