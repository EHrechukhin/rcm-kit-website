"use client";

import { ContactForm } from "@/components/contact-form/ContactForm";
import { FadeUp } from "@/components/motion";
import { useModeTheme } from "@/components/theme-provider";

export default function ContactFormPage() {
  const { modeTheme } = useModeTheme()
  const isLight = modeTheme === 'light'

  return (
    <div className={`min-h-screen relative overflow-hidden ${isLight ? 'bg-white' : 'bg-black'}`}>
      {!isLight && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full blur-[130px]" style={{ background: "var(--aurora-1)", opacity: 0.25 }} />
          <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: "var(--aurora-2)", opacity: 0.2 }} />
        </div>
      )}

      <div className={`relative z-10 max-w-none mx-auto px-6 lg:px-10 py-28 lg:py-36`}>
        <FadeUp className="max-w-2xl mx-auto mb-16 text-center">
          <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.15em] mb-4" style={{ color: "var(--brand)" }}>
            Contact
          </p>
          <h1 className={`text-[clamp(2rem, 5vw, 3.5rem)] font-black leading-[1.1] tracking-tight mb-6 ${isLight ? 'text-slate-900' : 'text-[var(--text-primary)]'}`}>
            Let&apos;s talk revenue cycle.
          </h1>
          <p className={`text-body-xl max-w-lg mx-auto ${isLight ? 'text-slate-500' : 'text-[var(--text-secondary)]'}`}>
            Tell us about your challenges. We&apos;ll show you exactly how RCM Kit fits your operation.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <ContactForm />
        </FadeUp>
      </div>
    </div>
  );
}
