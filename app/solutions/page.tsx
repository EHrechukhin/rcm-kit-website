import type { Metadata } from "next";
import { FadeUp } from "@/components/motion";
import { AgentGrid } from "@/components/agent-grid";
import { HeroCanvas } from "@/components/hero-canvas";
import ImagePlaceholder from "@/components/ui/image-placeholder";

export const metadata: Metadata = {
  title: "Solutions — RCM Kit",
  description: "18 AI agents organized into 8 lifecycle groups. The full revenue cycle, end to end.",
};

export default function SolutionsPage() {
  return (
    <div className="bg-black text-white">
      {/* ── Hero (dark) ── */}
      <section className="relative min-h-[55vh] flex flex-col justify-center pt-32 pb-24 px-6 lg:px-10 overflow-hidden dot-grid grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="aurora-1 absolute top-[15%] left-[5%] w-175 h-155 rounded-full blur-[130px]" style={{ background: "var(--aurora-1)" }} />
          <div className="aurora-2 absolute top-[0%] right-[10%] w-130 h-135 rounded-full blur-[120px]"  style={{ background: "var(--aurora-2)" }} />
          <div className="aurora-3 absolute bottom-[5%] right-[30%] w-100 h-90 rounded-full blur-[110px]" style={{ background: "var(--aurora-3)" }} />
        </div>
        <HeroCanvas />
        <div className="relative z-10 max-w-none w-full mx-auto flex flex-col gap-6">
          <div className="flex lg:flex-row items-stretch gap-10">
            <div className="lg:w-1/2">
              <FadeUp>
            <h1 className="text-[clamp(2.75rem,6.5vw,5rem)] font-black leading-[1.03] tracking-tight mt-5 mb-6 max-w-4xl">
              A coordinated workforce
              <br />
              <span className="gradient-text">across the revenue cycle.</span>
            </h1>
            <p className="text-[1.125rem] leading-[1.75] text-zinc-400 max-w-2xl">
              Eighteen agents organized into eight lifecycle groups. Each agent is purpose-built for a
              specific workflow and inherits the same human-in-the-loop, eval-gate, and audit substrate.
            </p>
              </FadeUp>
            </div>
            <div className="relative z-10 lg:w-1/2">
              <FadeUp className="h-full">
                <div className="h-full rounded-2xl border-2 border-zinc-800 p-3">
                  <ImagePlaceholder className="h-full w-full aspect-video rounded-2xl border-2 border-zinc-800 p-3" tone="onBrand" />
                </div>
              </FadeUp>
            </div>  
          </div>  
        </div>
      </section>

      {/* ── Agent Grid (light) ── */}
      <section className="relative bg-[#F7F8FA] py-20 px-6 lg:px-10 border-t border-slate-200/70 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="relative z-10 max-w-none mx-auto">
          <AgentGrid dark />
        </div>
      </section>

    </div>
  );
}
