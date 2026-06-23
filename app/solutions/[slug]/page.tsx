import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FadeUp,
  Stagger,
  StaggerItem,
  ScaleIn,
  TiltCard,
} from "@/components/motion";
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentCard } from "@/components/ui/agent-card";
import { agentGroups, getAgentBySlug, getAllAgentSlugs } from "@/lib/agents";
import { FAQSection } from "@/components/faq-section";
import { ContactSection } from "@/components/contact-section/ContactSection";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  Brain,
  Zap,
  Users,
  FileText,
} from "lucide-react";
import { HeroCanvas } from "@/components/hero-canvas";
import ImagePlaceholder from "@/components/ui/image-placeholder";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllAgentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) return { title: "Not Found" };
  return { title: `${agent.name} — RCM Kit`, description: agent.description };
}

const executionSteps = [
  {
    icon: Database,
    label: "INPUTS",
    color: "#60a5fa",
    glow: "rgba(59,130,246,0.13)",
    body: "EHR/EMR, billing system, clearinghouse feeds, and payer responses specific to this workflow.",
  },
  {
    icon: Brain,
    label: "HITL GATE",
    color: "#34d399",
    glow: "rgba(52,211,153,0.13)",
    body: "Outputs with regulatory or financial exposure are reviewed by a person before they leave the system.",
  },
  {
    icon: Zap,
    label: "OUTPUTS",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.13)",
    body: "Structured, documented results posted back to connected systems with full audit trail.",
  },
  {
    icon: FileText,
    label: "EVALUATION",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.13)",
    body: "Agent clears evaluation thresholds before going live and is re-evaluated continuously in production.",
  },
];

export default async function AgentPage({ params }: Props) {
  const { slug } = await params;
  const agent = getAgentBySlug(slug);
  if (!agent) notFound();

  const relatedAgents = agent.group.agents
    .filter((a) => a.slug !== slug)
    .slice(0, 3);
  const otherRelated = agentGroups
    .flatMap((g) => g.agents)
    .filter(
      (a) =>
        a.slug !== slug &&
        !relatedAgents.find((r) => r.slug === a.slug) &&
        (a.status === "AVAILABLE" || a.status === "IN_ACTIVE_DEVELOPMENT"),
    )
    .slice(0, Math.max(0, 3 - relatedAgents.length));
  const allRelated = [...relatedAgents, ...otherRelated].slice(0, 3);

  return (
    <div className="bg-black">
      {/* ── Hero (dark) ── */}
      <section className="relative min-h-[60vh] flex flex-col justify-center pt-32 pb-28 px-6 lg:px-10 overflow-hidden dot-grid grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="aurora-1 absolute top-[18%] left-[5%] w-175 h-160 rounded-full blur-[130px]"
            style={{ background: "var(--aurora-1)" }}
          />
          <div
            className="aurora-2 absolute top-[0%] right-[12%] w-130 h-140 rounded-full blur-[120px]"
            style={{ background: "var(--aurora-2)" }}
          />
          <div
            className="aurora-3 absolute bottom-[10%] right-[30%] w-100 h-90 rounded-full blur-[110px]"
            style={{ background: "var(--aurora-3)" }}
          />
        </div>
        <HeroCanvas />

        <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col gap-6">
          <div className="flex lg:flex-row items-stretch gap-10">
            <div className="lg:w-1/2">
              <FadeUp>
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors mb-6 group w-fit"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                  All agents
                </Link>
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span
                    className="text-[11px] font-mono font-semibold"
                    style={{ color: "var(--brand)" }}
                  >
                    {agent.group.name}
                  </span>
                  <span className="text-zinc-700">/</span>
                  <StatusBadge status={agent.status} dark />
                </div>
                <h1 className="text-[clamp(2.75rem,6.5vw,5rem)] font-black leading-[1.03] tracking-tight mb-6 max-w-4xl">
                  <span className="gradient-text">{agent.name}</span>
                </h1>
                <p className="text-[1.125rem] leading-[1.75] text-zinc-400 max-w-2xl mb-8">
                  {agent.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/#contact" className="group btn-cta">
                    Contact
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                  <Link href="/platform" className="btn-outline">
                    See the platform
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

      {/* ── How It Works (light) ── */}
      <section className="relative bg-[#F7F8FA] py-28 px-6 lg:px-10 border-t border-slate-200/70 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-14">
          <FadeUp>
            <p
              className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: "var(--brand)" }}
            >
              How It Works
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-black leading-[1.08] tracking-tight text-slate-900 mb-4">
              Ingest. Reason. Act.{" "}
              <span className="gradient-text">Escalate. Record.</span>
            </h2>
            <p className="text-zinc-500 leading-relaxed max-w-2xl">
              Like every agent in the suite, {agent.name} runs on the shared
              platform execution model — with human-in-the-loop controls,
              evaluation gates, and a complete audit trail.
            </p>
          </FadeUp>

          <Stagger
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            staggerDelay={0.07}
          >
            {executionSteps.map(({ icon: Icon, label, color, glow, body }) => (
              <StaggerItem key={label}>
                <div className="bg-white rounded-xl p-6 flex flex-col gap-3 h-full border border-slate-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.09)] hover:border-slate-300 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{
                        background: glow,
                        boxShadow: `0 0 0 1px ${color}40`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <p
                      className="text-[10px] font-mono font-bold uppercase tracking-[0.15em]"
                      style={{ color }}
                    >
                      {label}
                    </p>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Platform note (dark, compact) ── */}
      <section className="relative py-20 px-6 lg:px-10 border-t border-white/6 overflow-hidden grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="aurora-2 absolute top-[0%] right-[10%] w-125 h-100 rounded-full blur-[120px]"
            style={{ background: "var(--aurora-2)" }}
          />
          <div
            className="aurora-1 absolute bottom-[0%] left-[5%] w-100 h-90 rounded-full blur-[110px]"
            style={{ background: "var(--aurora-1)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <FadeUp className="flex flex-col gap-4">
            <p
              style={{ color: "var(--brand)" }}
              className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em]"
            >
              Platform
            </p>
            <p className="leading-relaxed">
              {agent.name} is one of 18 agents in the RCM Kit suite. Every agent
              inherits the same execution model, control surface, and audit
              substrate — the kit behaves as one system.
            </p>
            <Link
              style={{ color: "var(--brand)" }}
              href="/platform"
              className="text-sm font-medium hover:text-white transition-colors self-start group inline-flex items-center gap-1.5"
            >
              Learn about the platform
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── Related Agents (light) ── */}
      {allRelated.length > 0 && (
        <section className="relative bg-[#F7F8FA] py-24 px-6 lg:px-10 border-t border-slate-200/70 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-10">
            <FadeUp>
              <p
                className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] mb-2"
                style={{ color: "var(--brand)" }}
              >
                Related Agents
              </p>
              <h3 className="text-2xl font-bold text-slate-900">
                Other agents in the suite
              </h3>
            </FadeUp>
            <Stagger
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              staggerDelay={0.07}
            >
              {allRelated.map((a) => (
                <StaggerItem key={a.slug}>
                  <AgentCard
                    name={a.name}
                    description={a.description}
                    status={a.status}
                    href={`/solutions/${a.slug}`}
                    dark
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── CTA (dark) ── */}
      <ContactSection id="contact" />
    </div>
  );
}
