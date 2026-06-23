"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useContactModal } from "./useContactModal";

type Fields = { name: string; email: string };
type Errors = Partial<Fields>;

const inputClass =
  "w-full rounded-lg px-4 py-3 text-sm bg-white/[0.05] border border-white/[0.10] text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/25 focus:bg-white/[0.07] transition-all duration-200 disabled:opacity-50";

const labelClass = "block text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500 mb-1.5";

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim() || f.name.trim().length < 2) e.name = "Full name is required.";
  if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Valid email is required.";
  return e;
}

export function BookDemoForm() {
  const { close } = useContactModal();
  const [fields, setFields] = useState<Fields>({ name: "", email: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((p) => ({ ...p, [k]: e.target.value }));
    if (touched[k]) setErrors((p) => { const n = { ...p }; delete n[k]; return n; });
  };

  const blur = (k: keyof Fields) => () => {
    setTouched((p) => ({ ...p, [k]: true }));
    const errs = validate(fields);
    if (errs[k]) setErrors((p) => ({ ...p, [k]: errs[k] }));
    else setErrors((p) => { const n = { ...p }; delete n[k]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true });
    const errs = validate(fields);
    setErrors(errs);
    setConsentError(!consent);
    if (Object.keys(errs).length || !consent) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center gap-4 py-4"
      >
        <div className="w-12 h-12 rounded-full bg-blue-500/15 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Demo requested</p>
          <p className="text-xs text-zinc-400 mt-1">We&apos;ll reach out within one business day to schedule.</p>
        </div>
        <button onClick={close} className="text-xs text-zinc-500 hover:text-white transition-colors mt-1">
          Close
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <p className="text-xs text-zinc-400 -mt-1 mb-1">
        Leave your details and we&apos;ll schedule a personalized walkthrough.
      </p>

      <div>
        <label htmlFor="bd-name" className={labelClass}>Name</label>
        <input
          id="bd-name"
          type="text"
          placeholder="John Carter"
          autoComplete="name"
          value={fields.name}
          onChange={set("name")}
          onBlur={blur("name")}
          disabled={submitting}
          className={inputClass}
        />
        <AnimatePresence>
          {touched.name && errors.name && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-1.5 text-xs text-red-400">{errors.name}</motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label htmlFor="bd-email" className={labelClass}>Work email</label>
        <input
          id="bd-email"
          type="email"
          placeholder="john@hospital.com"
          autoComplete="email"
          value={fields.email}
          onChange={set("email")}
          onBlur={blur("email")}
          disabled={submitting}
          className={inputClass}
        />
        <AnimatePresence>
          {touched.email && errors.email && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-1.5 text-xs text-red-400">{errors.email}</motion.p>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label htmlFor="bd-consent" className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            id="bd-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => { setConsent(e.target.checked); if (e.target.checked) setConsentError(false); }}
            disabled={submitting}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-white/[0.05] accent-[var(--brand,#6366f1)] focus:outline-none focus:ring-1 focus:ring-white/25 disabled:opacity-50"
          />
          <span className="text-xs leading-relaxed text-zinc-400">
            By submitting this form, you agree to our{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-zinc-300 underline underline-offset-2 hover:text-white transition-colors">
              Privacy Policy
            </a>{" "}
            and consent to being contacted about your demo request.
          </span>
        </label>
        <AnimatePresence>
          {consentError && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-1.5 text-xs text-red-400">Please accept to continue.</motion.p>
          )}
        </AnimatePresence>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="group btn-brand mt-1 w-full inline-flex items-center justify-center gap-2 h-11 px-6 text-sm font-semibold disabled:opacity-50 disabled:pointer-events-none"
      >
        {submitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Requesting…</>
        ) : (
          <>Book a demo <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" /></>
        )}
      </button>
    </form>
  );
}
