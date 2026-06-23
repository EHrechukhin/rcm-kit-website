import { cn } from "@/lib/utils";

interface Integration {
  name: string;
  logo?: string;
}

interface IntegrationLogoGridProps {
  integrations: Integration[];
  dark?: boolean;
  className?: string;
}

export function IntegrationLogoGrid({ integrations, dark = false, className }: IntegrationLogoGridProps) {
  return (
    <div className={cn("flex flex-wrap gap-6 items-center", className)}>
      {integrations.map((integration) => (
        <div
          key={integration.name}
          className={cn(
            "flex items-center justify-center px-6 py-3 rounded-lg border text-sm font-medium",
            "grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-200",
            dark
              ? "border-[#122044] bg-[#0a1628] text-[#94a3b8] hover:text-[#f8fafc]"
              : "border-[#e2e8f0] bg-white text-[#475569] hover:text-[#0f172a]"
          )}
          title={integration.name}
        >
          {integration.name}
        </div>
      ))}
    </div>
  );
}
