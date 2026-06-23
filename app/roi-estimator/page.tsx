import type { Metadata } from "next";
import { FadeUp, Stagger, StaggerItem, ScaleIn, TiltCard } from "@/components/motion";
import { ROIEstimator } from "@/components/roi-estimator";
import { HeroCanvas } from "@/components/hero-canvas";
import ImagePlaceholder from "@/components/ui/image-placeholder";

export const metadata: Metadata = {
  title: "ROI Estimator — RCM Kit",
  description: "Illustrative revenue recovery model based on published industry benchmarks.",
};

const vectors = [
  { number: "01", label: "CAPACITY", title: "Reclaimed capacity",       body: "Around 50–70% of transactional RCM is plausibly automatable. Automate the deterministic majority and redeploy the people who used to do it.",              source: "General healthcare RCM statistics",          color: "#60a5fa", glow: "rgba(59,130,246,0.13)"  },
  { number: "02", label: "REVENUE",  title: "Recovered revenue",        body: "Denials worked faster, underpayments caught at line level, eligibility recovered on accounts that would have been written off.",                                 source: "Denial recovery: 60–70% of worked denials", color: "#34d399", glow: "rgba(52,211,153,0.13)"  },
  { number: "03", label: "GROWTH",   title: "Growth without headcount", body: "Absorb more volume — more facilities, more lines of business — without scaling RCM headcount linearly.",                                                         source: null,                                         color: "#a78bfa", glow: "rgba(167,139,250,0.13)" },
];

export default function ROIEstimatorPage() {
  return (
    <div className="bg-black text-white">

      {/* ── Hero (dark) ── */}
      <section className="relative min-h-[55vh] flex flex-col justify-center pt-32 pb-24 px-6 lg:px-10 overflow-hidden dot-grid grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="aurora-1 absolute top-[20%] left-[6%] w-170 h-155 rounded-full blur-[130px]" style={{ background: "var(--aurora-1)" }} />
          <div className="aurora-2 absolute top-[5%] right-[12%] w-130 h-130 rounded-full blur-[120px]"  style={{ background: "var(--aurora-2)" }} />
          <div className="aurora-3 absolute bottom-[10%] right-[28%] w-100 h-90 rounded-full blur-[110px]" style={{ background: "var(--aurora-3)" }} />
        </div>
        <HeroCanvas />
        <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col gap-6">
          <div className="flex lg:flex-row items-stretch gap-10">
            <div className="lg:w-1/2">
              <FadeUp>
            <h1 className="text-[clamp(2.75rem,6.5vw,5rem)] font-black leading-[1.03] tracking-tight mt-5 mb-6 max-w-4xl">
              See the illustrative
              <br />
              <span className="gradient-text">revenue opportunity.</span>
            </h1>
            <p className="text-[1.125rem] leading-[1.75] text-zinc-400 max-w-2xl">
              Built on published industry benchmarks. Illustrative estimate based on 1–3% revenue
              leakage recovery. Not a guarantee of results.
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

      {/* ── ROI Tool (light) ── */}
      <section className="relative bg-[#F7F8FA] py-28 px-6 lg:px-10 border-t border-slate-200/70 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-black leading-[1.08] tracking-tight text-slate-900 mb-6">
              Model your{" "}
              <span style={{ color: "var(--brand)" }}>recovery band.</span>
            </h2>
            <p className="text-[1rem] leading-[1.75] text-slate-500 mb-4">
              Move the slider to model the recovery band at your organization&apos;s scale. Built on published industry benchmarks.
            </p>
            <p className="text-[0.9375rem] leading-[1.75] text-slate-400">
              An illustrative floor to frame the conversation — not a guarantee of results.
            </p>
          </FadeUp>

          <ScaleIn>
            <TiltCard maxTilt={2}>
              <div className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200/60 shadow-[0_4px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_48px_rgba(0,0,0,0.12)] transition-all duration-300">
                <ROIEstimator />
              </div>
            </TiltCard>
          </ScaleIn>
        </div>
      </section>

      {/* ── Value Vectors (dark) ── */}
      <section className="relative py-28 px-6 lg:px-10 border-t border-white/6 overflow-hidden grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="aurora-1 absolute top-[5%] left-[5%] w-165 h-145 rounded-full blur-[130px]" style={{ background: "var(--aurora-1)" }} />
          <div className="aurora-2 absolute top-[0%] right-[8%] w-125 h-130 rounded-full blur-[120px]"  style={{ background: "var(--aurora-2)" }} />
          <div className="aurora-3 absolute bottom-[0%] right-[24%] w-100 h-85 rounded-full blur-[100px]" style={{ background: "var(--aurora-3)" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.10) 3px, rgba(0,0,0,0.10) 4px)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-14">
          <FadeUp>
            <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] mb-3" style={{ color: "var(--brand)" }}>The Three Value Vectors</p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-black leading-[1.08] tracking-tight">
              Where the value{" "}
              <span className="gradient-text">comes from.</span>
            </h2>
          </FadeUp>

          <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-5" staggerDelay={0.1}>
            {vectors.map(({ number, label, title, body, source, color }) => (
              <StaggerItem key={number}>
                <TiltCard maxTilt={4} className="h-full">
                  <div className="glow-card rounded-xl overflow-hidden h-full group" style={{ background: "var(--glow-card-tint)", border: `1px solid ${color}15` }}>
                    <div className="h-px" style={{ background: `linear-gradient(90deg, ${color}80, transparent 60%)` }} />
                    <div className="p-6 flex flex-col gap-4 h-full">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-2xl font-black" style={{ color }}>{number}</span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-zinc-600">{label}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed flex-1">{body}</p>
                      {source && <p className="text-[11px] italic text-zinc-700">{source}</p>}
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

    </div>
  );
}
