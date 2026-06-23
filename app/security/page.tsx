import type { Metadata } from "next";
import Link from "next/link";
import {
  FadeUp,
  Stagger,
  StaggerItem,
  ScaleIn,
  TiltCard,
} from "@/components/motion";
import { FAQSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section/ContactSection";
import {
  ArrowRight,
  ShieldCheck,
  Eye,
  FileText,
  BarChart3,
  Users,
  AlertTriangle,
} from "lucide-react";
import { HeroCanvas } from "@/components/hero-canvas";
import ImagePlaceholder from "@/components/ui/image-placeholder";

export const metadata: Metadata = {
  title: "Security & Compliance — RCM Kit",
  description:
    "Security and compliance are architecture — not a trust badge. HIPAA-aligned, human-in-the-loop, fully auditable.",
};

const features = [
  {
    icon: ShieldCheck,
    title: "PHI Handling",
    body: "Data segregation, least-privilege access, encryption in transit and at rest. PHI is treated as a first-class data class with stricter controls.",
    color: "#34d399",
    glow: "rgba(52,211,153,0.13)",
  },
  {
    icon: Users,
    title: "Human-in-the-Loop",
    body: "Claim content, appeal language, applications — anything carrying regulatory exposure — is reviewed by a person before it leaves the system.",
    color: "#60a5fa",
    glow: "rgba(59,130,246,0.13)",
  },
  {
    icon: FileText,
    title: "Auditability",
    body: "Every agent action and decision is logged — inputs, rules applied, model output, human review state, and the final outbound result.",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.13)",
  },
  {
    icon: BarChart3,
    title: "Model-Risk & Quality",
    body: "Agents pass an evaluation suite before going live, monitored continuously in production at confidence-based autonomy levels.",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.13)",
  },
  {
    icon: AlertTriangle,
    title: "Responsible AI",
    body: "No uncontrolled autonomous submission of regulated outputs. Agents make the work tractable; they don't substitute for your compliance program.",
    color: "#fb7185",
    glow: "rgba(251,113,133,0.12)",
  },
  {
    icon: Eye,
    title: "Compliance Roadmap",
    body: "Operating under HIPAA-aligned controls today. Formal third-party security assurance is part of our launch path.",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.12)",
  },
];

const hitlTriggers = [
  "Any appeal, before submission",
  "Any Medicaid application, before submission",
  "Claim edits above a defined dollar threshold",
  "Posting exceptions: unmatched payments, tailbacks",
  "Discovered coverage before re-billing",
  "Confidence below the live-gate threshold",
];

export default function SecurityPage() {
  return (
    <div className="bg-black text-white">
      {/* ── Hero (dark) ── */}
      <section className="relative min-h-[60vh] flex flex-col justify-center pt-32 pb-28 px-6 lg:px-10 overflow-hidden dot-grid grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="aurora-1 absolute top-[20%] left-[5%] w-175 h-160 rounded-full blur-[130px]"
            style={{ background: "var(--aurora-1)" }}
          />
          <div
            className="aurora-2 absolute top-[5%] right-[12%] w-135 h-140 rounded-full blur-[120px]"
            style={{ background: "var(--aurora-2)" }}
          />
          <div
            className="aurora-3 absolute bottom-[8%] right-[30%] w-100 h-90 rounded-full blur-[110px]"
            style={{ background: "var(--aurora-3)" }}
          />
        </div>
        <HeroCanvas />
        <div className="relative z-10 max-w-none w-full mx-auto flex flex-col gap-6">
          <div className="flex lg:flex-row items-stretch gap-10">
            <div className="lg:w-1/2">
              <FadeUp>
                <h1 className="text-[clamp(2.75rem,6.5vw,5rem)] font-black leading-[1.03] tracking-tight mt-5 mb-6 max-w-4xl">
                  Security and compliance are{" "}
                  <span className="gradient-text">
                    architecture — not a trust badge.
                  </span>
                </h1>
                <p className="text-[1.125rem] leading-[1.75] text-zinc-400 max-w-2xl mb-8">
                  We are building for regulated buyers. Control and auditability
                  are part of every agent&apos;s design, not a separate
                  workstream bolted on at the end.
                </p>
                <Link href="/#contact" className="group btn-cta self-start">
                  Contact
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </FadeUp>
            </div>
            <div className="relative z-10 lg:w-1/2">
              <FadeUp className="h-full">
                <div className="h-full rounded-2xl border-2 border-zinc-800 p-3">
                  <ImagePlaceholder
                    className="h-full w-full aspect-video rounded-2xl border-2 border-zinc-800 p-3"
                    tone="onBrand"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── Controls (light) ── */}
      <section className="relative bg-[#F7F8FA] py-28 px-6 lg:px-10 border-t border-slate-200/70 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 max-w-none mx-auto flex flex-col gap-14">
          <FadeUp>
            <p
              className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: "var(--brand)" }}
            >
              Controls
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-black leading-[1.08] tracking-tight text-slate-900">
              Built for <span className="gradient-text">regulated buyers.</span>
            </h2>
          </FadeUp>

          <Stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            staggerDelay={0.07}
          >
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <div className="bg-white rounded-xl p-6 h-full flex flex-col gap-4 border border-slate-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.09)] hover:border-slate-300 transition-all duration-300 group">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: f.glow,
                      boxShadow: `0 0 0 1px ${f.color}40`,
                    }}
                  >
                    <f.icon className="w-4 h-4" style={{ color: f.color }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                      {f.title}
                    </h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {f.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── HITL Triggers (dark) ── */}
      <section className="relative py-28 px-6 lg:px-10 border-t border-white/6 overflow-hidden grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="aurora-3 absolute top-[5%] right-[5%] w-145 h-135 rounded-full blur-[130px]"
            style={{ background: "var(--aurora-1)" }}
          />
          <div
            className="aurora-1 absolute bottom-[0%] left-[8%] w-125 h-120 rounded-full blur-[120px]"
            style={{ background: "var(--aurora-2)" }}
          />
          <div
            className="aurora-2 absolute top-[45%] right-[30%] w-90 h-75 rounded-full blur-[100px]"
            style={{ background: "var(--aurora-3)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.10) 3px, rgba(0,0,0,0.10) 4px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-none mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeUp>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-black leading-[1.08] tracking-tight mb-6">
              When a human is{" "}
              <span className="gradient-text">always in the loop.</span>
            </h2>
            <p className="text-[1rem] leading-[1.75] text-zinc-400">
              These conditions always trigger human review before any output
              leaves the system — regardless of model confidence level.
            </p>
          </FadeUp>

          <Stagger className="flex flex-col gap-3" staggerDelay={0.07}>
            {hitlTriggers.map((trigger, idx) => (
              <StaggerItem key={trigger}>
                <TiltCard maxTilt={2}>
                  <div
                    className="glow-card rounded-xl px-5 py-4 flex items-center gap-4 group"
                    style={{
                      background: "var(--glow-card-tint)",
                      border: "1px solid var(--glow-card-tint-border)",
                    }}
                  >
                    <div
                      className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: "var(--brand-subtle)" }}
                    >
                      <span
                        className="text-[10px] font-mono font-bold"
                        style={{ color: "var(--brand)" }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-sm text-zinc-300">{trigger}</span>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── CTA (light) ── */}
      <ContactSection id="contact" />
    </div>
  );
}
