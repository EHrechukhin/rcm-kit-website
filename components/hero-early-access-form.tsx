"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type HeroEarlyAccessFormProps = {
  delay?: number;
};

export function HeroEarlyAccessForm({ delay = 1.15 }: HeroEarlyAccessFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (value: string) => {
    if (!value.trim()) return "Email is required.";
    if (!emailRe.test(value.trim())) return "Enter a valid email address.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const err = validate(email);
    setError(err);
    if (err) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.45, ease }}
        className="flex items-center gap-3 rounded-xl px-5 py-4 border border-emerald-500/20 bg-emerald-500/[0.06]"
      >
        <div className="w-9 h-9 shrink-0 rounded-full bg-emerald-500/15 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold text-white">You&apos;re on the list</p>
          <p className="text-xs text-zinc-400 mt-0.5">
            We&apos;ll reach out as early access opens.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      className="w-full max-w-xl"
      initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease, delay }}
    >
      <div className="liquid-glass relative flex items-center h-12 overflow-hidden rounded-xl">
        <label htmlFor="hero-email" className="sr-only">
          Work email
        </label>
        <Mail className="ml-4 w-4 h-4 shrink-0 text-zinc-500" aria-hidden="true" />
        <input
          id="hero-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Enter your work email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (touched) setError(validate(e.target.value));
          }}
          onBlur={() => {
            setTouched(true);
            setError(validate(email));
          }}
          disabled={submitting}
          aria-invalid={!!error}
          className="min-w-0 flex-1 h-full bg-transparent pl-2.5 pr-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={submitting}
          className="group btn-cta h-full rounded-none shrink-0 justify-center whitespace-nowrap disabled:opacity-60 disabled:pointer-events-none"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Request access
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>

      <div className="min-h-[1.25rem] mt-2 text-left">
        <AnimatePresence mode="wait">
          {touched && error ? (
            <motion.p
              key="err"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-red-400"
            >
              {error}
            </motion.p>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-zinc-500"
            >
              Join the early-access list — limited spots.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.form>
  );
}
