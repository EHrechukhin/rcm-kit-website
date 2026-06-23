import { FadeUp } from "@/components/motion";
import { ContactForm } from "@/components/contact-form";
import {
  CheckCircle2,
  Shield,
  BarChart3,
  Mail,
  Phone,
  Clock,
} from "lucide-react";

const trustIndicators = [
  { icon: Shield, text: "HIPAA compliant" },
  { icon: CheckCircle2, text: "SOC 2 Type II" },
  { icon: BarChart3, text: "40% avg. time saved" },
];

export function ContactSection({ id = "contact" }: { id?: string }) {
  return (
    <section
      id={id}
      className="bg-black relative py-28 px-6 lg:px-10 border-t border-white/6 overflow-hidden grain"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <FadeUp className="lg:sticky lg:top-40">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-black leading-[1.08] tracking-tight mb-6">
            Deploy your{" "}
            <span className="gradient-text">revenue cycle workforce</span>
          </h2>
          <p className="text-sm text-zinc-400 mb-8 max-w-md">
            Eighteen AI agents that integrate with your existing tools. Humans
            stay in the loop where judgment matters.
          </p>

          <div className="flex flex-col gap-4 mb-10">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" style={{ color: "var(--brand)" }} />
              <span className="text-sm text-zinc-300">hello@rcmkit.ai</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" style={{ color: "var(--brand)" }} />
              <span className="text-sm text-zinc-300">+1 (415) 555-0123</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5" style={{ color: "var(--brand)" }} />
              <span className="text-sm text-zinc-300">Mon-Fri, 9am-5pm PT</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            {trustIndicators.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 text-xs text-zinc-500"
              >
                <Icon
                  className="w-3.5 h-3.5"
                  style={{ color: "var(--brand)" }}
                />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp className="lg:col-span-2" delay={0.15}>
          <ContactForm />
        </FadeUp>
      </div>
    </section>
  );
}
