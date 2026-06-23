import type { Metadata } from "next";
import Link from "next/link";
import {
  FadeUp,
  Stagger,
  StaggerItem,
  TiltCard,
} from "@/components/motion";
import {
  ArrowRight,
  Database,
  Brain,
  Zap,
  Users,
  FileText,
  ShieldCheck,
  Eye,
  BarChart3,
  GitBranch,
  Layers,
} from "lucide-react";
import { HeroCanvas } from "@/components/hero-canvas";
import ImagePlaceholder  from "@/components/ui/image-placeholder";
import { FAQSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section/ContactSection";

export const metadata: Metadata = {
  title: "Platform — RCM Kit",
  description:
    "A coordinated system of agents: Ingest, Reason, Act, Escalate, Record.",
};

const steps = [
  {
    number: "01",
    title: "Ingest",
    icon: Database,
    description:
      "Pull from EHR/EMR, billing systems, clearinghouse feeds, payer responses — the data the work depends on, already where it lives.",
    color: "#60a5fa",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    number: "02",
    title: "Reason",
    icon: Brain,
    description:
      "Apply payer-specific rules, contract terms, clinical context, and learned patterns to the encounter at hand.",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.13)",
  },
  {
    number: "03",
    title: "Act",
    icon: Zap,
    description:
      "Execute the next step in the connected system — submit a claim, post an ERA, query status, draft an appeal, stage a correction.",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.13)",
  },
  {
    number: "04",
    title: "Escalate",
    icon: Users,
    description:
      "Hand off to a person on defined conditions — confidence threshold, regulated output, dollar threshold, edge category.",
    color: "#34d399",
    glow: "rgba(52,211,153,0.13)",
  },
  {
    number: "05",
    title: "Record",
    icon: FileText,
    description:
      "Log every decision, input, output, and human touch for audit, training, and continuous evaluation.",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.12)",
  },
];

const features = [
  {
    title: "Human-in-the-Loop",
    body: "Outputs with regulatory or financial exposure are reviewed by a person before they leave the system. Autonomy expands only as measured confidence accrues.",
    icon: ShieldCheck,
    color: "#34d399",
    glow: "rgba(52,211,153,0.13)",
  },
  {
    title: "Evaluation Gates",
    body: "Every agent has a defined evaluation suite. It must pass to go live, and is re-evaluated continuously. Drift tightens gates — it doesn't get explained away.",
    icon: Eye,
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.13)",
  },
  {
    title: "Audit & Observability",
    body: "Every action and decision is logged with input context, rule trace, model output, and human review state. Compliance can reconstruct any case end to end.",
    icon: BarChart3,
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.13)",
  },
  {
    title: "One Execution Model",
    body: "Every agent inherits the same ingest / reason / act / escalate / record pattern. The kit behaves as one system, not a kit-bag of point tools.",
    icon: Layers,
    color: "#60a5fa",
    glow: "rgba(59,130,246,0.15)",
  },
  {
    title: "Phased Deployment",
    body: "Deployment is sequenced agent by agent — not a big-bang switchover. Most agents shadow-run before any autonomy.",
    icon: GitBranch,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.12)",
  },
  {
    title: "Shared Audit Substrate",
    body: "All logs land in one place. Cross-agent investigations and cross-workflow analytics are first-class, not bolted-on afterthoughts.",
    icon: FileText,
    color: "#fb7185",
    glow: "rgba(251,113,133,0.12)",
  },
];

export default function PlatformPage() {
  return (
    <div className="bg-black text-white">
      {/* ── Hero (dark) ── */}
      <section className="relative min-h-[65vh] flex flex-col justify-center pt-32 pb-28 px-6 lg:px-10 overflow-hidden dot-grid grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="aurora-1 absolute top-[20%] left-[8%] w-175 h-160 rounded-full blur-[130px]"
            style={{ background: "var(--aurora-1)" }}
          />
          <div
            className="aurora-2 absolute top-[5%] right-[10%] w-135 h-135 rounded-full blur-[120px]"
            style={{ background: "var(--aurora-2)" }}
          />
          <div
            className="aurora-3 absolute bottom-[10%] right-[28%] w-105 h-95 rounded-full blur-[110px]"
            style={{ background: "var(--aurora-3)" }}
          />
        </div>
        <HeroCanvas />
        <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col gap-6">
          <div className="flex lg:flex-row items-stretch gap-10">
            <div className="lg:w-1/2">
              <FadeUp>
                <h1 className="text-[clamp(2.75rem,6.5vw,5rem)] font-black leading-[1.03] tracking-tight mt-5 mb-6 max-w-4xl">
                  A coordinated system of agents —{" "}
                  <span className="gradient-text">not a model in a box.</span>
                </h1>
                <p className="text-[1.125rem] leading-[1.75] text-zinc-400 max-w-2xl mb-8">
                  RCM Kit is built as one platform. Each agent is shaped to a
                  specific revenue-cycle workflow, but every agent inherits the
                  same execution model, control surface, and audit substrate.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/#contact" className="group btn-cta">
                    Contact
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                  <Link href="/solutions" className="btn-outline">
                    See the 18 agents
                  </Link>
                </div>
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

      {/* ── Execution Steps (light) ── */}
      <section className="relative bg-[#F7F8FA] py-28 px-6 lg:px-10 border-t border-slate-200/70 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <HeroCanvas />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16">
          <FadeUp>
            <p
              className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: "var(--brand)" }}
            >
              Agentic Execution
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-black leading-[1.08] tracking-tight text-slate-900">
              How an agent runs an RCM workflow,{" "}
              <span className="gradient-text">end to end.</span>
            </h2>
          </FadeUp>

          <div className="relative">
            <div
              className="absolute left-2.75 top-6 bottom-6 w-px hidden lg:block"
              style={{ background: "var(--step-line)" }}
            />
            <Stagger className="flex flex-col gap-5" staggerDelay={0.1}>
              {steps.map((step) => (
                <StaggerItem key={step.number}>
                  <div className="lg:pl-10 flex flex-col lg:flex-row gap-6 items-start">
                    <div className="hidden lg:flex flex-col items-center">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{
                          background: step.glow,
                          boxShadow: `0 0 0 1px ${step.color}40`,
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: step.color }}
                        />
                      </div>
                    </div>
                    <TiltCard maxTilt={2} className="flex-1">
                      <div className="bg-white rounded-xl p-6 flex gap-5 items-start border border-slate-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.10)] hover:border-slate-300 transition-all duration-300">
                        <div
                          className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{
                            background: step.glow,
                            boxShadow: `0 0 0 1px ${step.color}30`,
                          }}
                        >
                          <step.icon
                            className="w-5 h-5"
                            style={{ color: step.color }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className="text-[11px] font-mono font-bold"
                              style={{ color: step.color }}
                            >
                              {step.number}
                            </span>
                            <h3 className="text-base font-bold text-slate-900">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-sm leading-[1.75] text-slate-500">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* ── Controls (dark) ── */}
      <section className="relative py-28 px-6 lg:px-10 border-t border-white/6 overflow-hidden grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="aurora-3 absolute top-[5%] right-[5%] w-150 h-140 rounded-full blur-[130px]"
            style={{ background: "var(--aurora-1)" }}
          />
          <div
            className="aurora-1 absolute bottom-[0%] left-[8%] w-130 h-125 rounded-full blur-[120px]"
            style={{ background: "var(--aurora-2)" }}
          />
          <div
            className="aurora-2 absolute top-[40%] right-[28%] w-95 h-80 rounded-full blur-[100px]"
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

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-14">
          <FadeUp>
            <p
              className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: "var(--brand)" }}
            >
              Controls
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-black leading-[1.08] tracking-tight">
              Control and auditability{" "}
              <span className="gradient-text">in every agent.</span>
            </h2>
          </FadeUp>

          <Stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            staggerDelay={0.07}
          >
            {features.map((f) => (
              <StaggerItem key={f.title}>
                <TiltCard maxTilt={4}>
                  <div
                    className="glow-card rounded-xl overflow-hidden group h-full"
                    style={{
                      background: "var(--glow-card-tint)",
                      border: "1px solid var(--glow-card-tint-border)",
                    }}
                  >
                    <div
                      className="h-px"
                      style={{
                        background: `linear-gradient(90deg, ${f.color}80, transparent 60%)`,
                      }}
                    />
                    <div className="p-6 flex flex-col gap-4">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: f.glow,
                          boxShadow: `0 0 0 1px ${f.color}40`,
                        }}
                      >
                        <f.icon
                          className="w-4 h-4"
                          style={{ color: f.color }}
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1.5">
                          {f.title}
                        </h4>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                          {f.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <FAQSection />
      <ContactSection />
    </div>
  );
}
