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
import { ArrowRight, Plug, Server, Cable, Radio, Database } from "lucide-react";
import ImagePlaceholder from "@/components/ui/image-placeholder";
import { HeroCanvas } from "@/components/hero-canvas";

export const metadata: Metadata = {
  title: "Integrations — RCM Kit",
  description:
    "Agents execute the existing workflow in the existing stack — EHR/EMR, billing systems, clearinghouses, and payer channels.",
};

const groups = [
  {
    number: "01",
    title: "EHR / EMR",
    icon: Database,
    color: "#60a5fa",
    glow: "rgba(59,130,246,0.13)",
    items: [
      {
        name: "PointClickCare",
        desc: "SNF EHR/EMR — flagship integration depth for census, MDS, therapy, and ancillary data.",
      },
      {
        name: "Leading EHR/EMR platforms",
        desc: "Generic interfaces for hospital, health-system, and physician-group EHRs.",
      },
    ],
  },
  {
    number: "02",
    title: "Billing & Practice Management",
    icon: Server,
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.13)",
    items: [
      {
        name: "Practice-management systems",
        desc: "Read/write integration with the billing system of record for claims, posting, A/R, and patient billing.",
      },
      {
        name: "Charge-master & fee-schedule data",
        desc: "Reference data used by charge capture, posting, and underpayment detection.",
      },
    ],
  },
  {
    number: "03",
    title: "Clearinghouses & EDI",
    icon: Cable,
    color: "#34d399",
    glow: "rgba(52,211,153,0.13)",
    items: [
      { name: "EDI 837 / 837P / 837I", desc: "Claim submission." },
      { name: "EDI 835 / ERA", desc: "Remittance and payment posting." },
      {
        name: "EDI 276 / 277 / 277CA",
        desc: "Claim status and acknowledgment.",
      },
      { name: "EDI 270 / 271", desc: "Eligibility and benefit response." },
    ],
  },
  {
    number: "04",
    title: "Payer Channels",
    icon: Radio,
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.13)",
    items: [
      {
        name: "Direct payer EDI",
        desc: "Where the payer supports it — preferred for reliability and traceability.",
      },
      {
        name: "Payer-portal automation",
        desc: "Where EDI is not available — agents work the portals the team works today.",
      },
      {
        name: "IVR / call channels",
        desc: "For follow-up where status is only reachable by phone.",
      },
    ],
  },
  {
    number: "05",
    title: "Supporting Systems",
    icon: Plug,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.12)",
    items: [
      {
        name: "Bank deposit channels",
        desc: "Used by Payment Posting for daily bank reconciliation.",
      },
      {
        name: "Contract-terms repositories",
        desc: "Structured contract data feeds underpayment detection and posting reconciliation.",
      },
      {
        name: "Document & correspondence channels",
        desc: "Statement, appeal, and application generation and delivery.",
      },
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <div className="bg-black text-white">
      {/* ── Hero (dark) ── */}
      <section className="relative min-h-[60vh] flex flex-col justify-center pt-32 pb-28 px-6 lg:px-10 overflow-hidden dot-grid grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="aurora-1 absolute top-[18%] left-[6%] w-170 h-155 rounded-full blur-[130px]"
            style={{ background: "var(--aurora-1)" }}
          />
          <div
            className="aurora-2 absolute top-[0%] right-[12%] w-130 h-140 rounded-full blur-[120px]"
            style={{ background: "var(--aurora-2)" }}
          />
          <div
            className="aurora-3 absolute bottom-[8%] right-[32%] w-105 h-90 rounded-full blur-[110px]"
            style={{ background: "var(--aurora-3)" }}
          />
        </div>

        <HeroCanvas />
        <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col gap-20">
          <div className="flex lg:flex-row items-stretch gap-10">
            <div className="relative z-10 flex flex-col gap-6 lg:w-1/2">
              <FadeUp>
                <h1 className="text-[clamp(2.75rem,6.5vw,5rem)] font-black leading-[1.03] tracking-tight mt-5 mb-6 max-w-4xl">
                  Works inside the systems
                  <br />
                  <span className="gradient-text">you already run.</span>
                </h1>
                <p className="text-[1.125rem] leading-[1.75] text-zinc-400 max-w-2xl mb-8">
                  Agents execute the existing workflow in the existing stack —
                  EHR/EMR, billing systems, clearinghouses, and payer channels.
                  Hybrid-by-design where the payer hasn&apos;t caught up to EDI.
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

      {/* ── Groups 01–03 (light) ── */}
      <section className="relative bg-[#F7F8FA] py-28 px-6 lg:px-10 border-t border-slate-200/70 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-20">
          {groups.slice(0, 3).map((group) => (
            <FadeUp key={group.number}>
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: group.glow,
                    boxShadow: `0 0 0 1px ${group.color}40`,
                  }}
                >
                  <group.icon
                    className="w-5 h-5"
                    style={{ color: group.color }}
                  />
                </div>
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: group.color }}
                  >
                    {group.number}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    {group.title}
                  </h2>
                </div>
              </div>
              <Stagger
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                staggerDelay={0.06}
              >
                {group.items.map((item) => (
                  <StaggerItem key={item.name}>
                    <div className="bg-white rounded-xl p-5 h-full flex flex-col gap-2 border border-slate-200/60 shadow-[0_2px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.09)] hover:border-slate-300 transition-all duration-300">
                      <p className="text-sm font-semibold text-slate-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Groups 04–05 (dark) ── */}
      <section className="relative py-28 px-6 lg:px-10 border-t border-white/6 overflow-hidden grain">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="aurora-2 absolute top-[5%] left-[8%] w-150 h-135 rounded-full blur-[120px]"
            style={{ background: "var(--aurora-2)" }}
          />
          <div
            className="aurora-1 absolute bottom-[0%] right-[5%] w-140 h-130 rounded-full blur-[130px]"
            style={{ background: "var(--aurora-1)" }}
          />
          <div
            className="aurora-3 absolute top-[40%] left-[35%] w-90 h-75 rounded-full blur-[100px]"
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

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-20">
          {groups.slice(3).map((group) => (
            <FadeUp key={group.number}>
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: group.glow,
                    boxShadow: `0 0 0 1px ${group.color}40`,
                  }}
                >
                  <group.icon
                    className="w-5 h-5"
                    style={{ color: group.color }}
                  />
                </div>
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: group.color }}
                  >
                    {group.number}
                  </span>
                  <h2 className="text-xl font-bold text-white">
                    {group.title}
                  </h2>
                </div>
              </div>
              <Stagger
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                staggerDelay={0.06}
              >
                {group.items.map((item) => (
                  <StaggerItem key={item.name}>
                    <TiltCard maxTilt={3}>
                      <div
                        className="glow-card rounded-xl p-5 h-full flex flex-col gap-2"
                        style={{ border: `1px solid ${group.color}15` }}
                      >
                        <div
                          className="h-px w-12 rounded-full mb-1"
                          style={{
                            background: `linear-gradient(90deg, ${group.color}80, transparent)`,
                          }}
                        />
                        <p className="text-sm font-semibold text-white">
                          {item.name}
                        </p>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </TiltCard>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── Philosophy + CTA (light) ── */}
      <ContactSection id="contact" />
    </div>
  );
}
