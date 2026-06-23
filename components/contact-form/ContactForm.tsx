"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FormData = {
  name: string;
  email: string;
  company: string;
  phone: string;
  services: string[];
  message: string;
  privacyAccepted: boolean;
};

const services = [
  { value: "insurance-eligibility", label: "Insurance (Eligibility) Verification" },
  { value: "insurance-discovery", label: "Insurance Discovery" },
  { value: "insurance-optimization", label: "Insurance Optimization" },
  { value: "estimation", label: "Estimation" },
  { value: "private-billing", label: "Private Billing (Patient Responsibility)" },
  { value: "coding-hipps", label: "Coding / HIPPS Classification" },
  { value: "charge-capture", label: "Charge Capture" },
  { value: "claim-management", label: "Claim Management" },
  { value: "census-billing", label: "Census ↔ Billing Reconciliation" },
  { value: "payment-posting", label: "Payment Posting" },
  { value: "underpayment-detection", label: "Underpayment Detection" },
  { value: "denials-management", label: "Denials Management & Appeals" },
  { value: "ar-follow-up", label: "Accounts Receivable (A/R) & Follow-Up" },
  { value: "bad-debt-collection", label: "Bad Debt Collection" },
  { value: "medicare-disenrollment", label: "Managed Medicare Disenrollment" },
  { value: "medicaid-application", label: "Medicaid Application" },
  { value: "hmo-pharmacy", label: "HMO / Pharmacy Contract Management" },
  { value: "quality-vbp", label: "Quality / VBP Revenue" },
];

type FormErrors = Partial<Record<keyof FormData, string>>;

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const fieldClass = [
  "w-full rounded-lg px-4 py-3 text-sm transition-all duration-200",
  "bg-[var(--surface-sunken)] border border-[var(--border-default)]",
  "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
  "focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20",
  "disabled:opacity-50 disabled:pointer-events-none",
].join(" ");

const labelClass = "block text-xs font-medium text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide";

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = "Full name is required (min 2 characters).";
  }
  if (!data.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (data.phone.trim() && !/^[\d\s\-+().]{7,20}$/.test(data.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errors.message = "Message is required (min 10 characters).";
  }
  if (!data.privacyAccepted) {
    errors.privacyAccepted = "You must accept the privacy policy to submit the form.";
  }
  return errors;
};

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    services: [],
    message: "",
    privacyAccepted: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = useCallback(
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (touched[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [touched]
  );

  const handleBlur = useCallback(
    (field: keyof FormData) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const fieldErrors = validateForm(formData);
      if (fieldErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [formData]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Partial<Record<keyof FormData, boolean>> = {
      name: true,
      email: true,
      company: true,
      phone: true,
      message: true,
      privacyAccepted: true,
    };
    setTouched(allTouched);

    const fieldErrors = validateForm(formData);
    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) return;

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", company: "", phone: "", services: [], message: "", privacyAccepted: false });
    setErrors({});
    setTouched({});
    setIsSuccess(false);
  };

  return (
    <div className="border-beam-card rounded-2xl w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
            className="card-glass rounded-2xl p-8 lg:p-10"
          >
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
              {/* Name & Email row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="contact-name" className={labelClass}>
                    Full Name <span className="text-[var(--destructive)]">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)] pointer-events-none" />
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      placeholder="John Carter"
                      value={formData.name}
                      onChange={handleChange("name")}
                      onBlur={handleBlur("name")}
                      disabled={isSubmitting}
                      className={cn(fieldClass, "pl-10", touched.name && errors.name && "border-[var(--destructive)]! ring-[var(--destructive)]/20!")}
                      aria-invalid={!!(touched.name && errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                    />
                  </div>
                  <AnimatePresence>
                    {touched.name && errors.name && (
                      <motion.p
                        id="contact-name-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1.5 text-xs text-[var(--destructive)]"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="contact-email" className={labelClass}>
                    Email <span className="text-[var(--destructive)]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)] pointer-events-none" />
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      placeholder="john@hospital.com"
                      value={formData.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      disabled={isSubmitting}
                      className={cn(fieldClass, "pl-10", touched.email && errors.email && "border-[var(--destructive)]! ring-[var(--destructive)]/20!")}
                      aria-invalid={!!(touched.email && errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                    />
                  </div>
                  <AnimatePresence>
                    {touched.email && errors.email && (
                      <motion.p
                        id="contact-email-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1.5 text-xs text-[var(--destructive)]"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Company & Phone row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="contact-company" className={labelClass}>
                    Company <span className="text-[var(--text-tertiary)] normal-case tracking-normal font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)] pointer-events-none" />
                    <input
                      id="contact-company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Meridian Health"
                      value={formData.company}
                      onChange={handleChange("company")}
                      onBlur={handleBlur("company")}
                      disabled={isSubmitting}
                      className={cn(fieldClass, "pl-10")}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="contact-phone" className={labelClass}>
                    Phone <span className="text-[var(--text-tertiary)] normal-case tracking-normal font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)] pointer-events-none" />
                    <input
                      id="contact-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      disabled={isSubmitting}
                      className={cn(fieldClass, "pl-10", touched.phone && errors.phone && "border-[var(--destructive)]! ring-[var(--destructive)]/20!")}
                      aria-invalid={!!(touched.phone && errors.phone)}
                      aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                    />
                  </div>
                  <AnimatePresence>
                    {touched.phone && errors.phone && (
                      <motion.p
                        id="contact-phone-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1.5 text-xs text-[var(--destructive)]"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Service chips */}
              <div className="flex flex-col gap-3">
                <label className={labelClass}>
                  Service Interest <span className="text-[var(--text-tertiary)] normal-case tracking-normal font-normal">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => {
                    const isSelected = formData.services.includes(service.value);
                    return (
                      <button
                        key={service.value}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            services: isSelected
                              ? prev.services.filter((s) => s !== service.value)
                              : [...prev.services, service.value],
                          }));
                        }}
                        disabled={isSubmitting}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 cursor-pointer",
                          isSelected
                            ? "bg-white border-[var(--brand)] text-black"
                            : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                        )}
                      >
                        <span className={cn(
                          "inline-flex items-center justify-center w-3.5 h-3.5 rounded-sm border",
                          isSelected ? "border-[var(--brand)] bg-[var(--brand)]" : "border-[var(--border-default)] bg-transparent"
                        )}>
                          {isSelected && (
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </span>
                        {service.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label htmlFor="contact-message" className={labelClass}>
                  Message <span className="text-[var(--destructive)]">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-4 w-4 h-4 text-[var(--text-tertiary)] pointer-events-none" />
                  <textarea
                    id="contact-message"
                    rows={5}
                    maxLength={500}
                    placeholder="Tell us about your revenue cycle challenges, goals, or questions..."
                    value={formData.message}
                    onChange={handleChange("message")}
                    onBlur={handleBlur("message")}
                    disabled={isSubmitting}
                    className={cn(
                      fieldClass,
                      "pl-10 pt-3.5 resize-none",
                      touched.message && errors.message && "border-[var(--destructive)]! ring-[var(--destructive)]/20!"
                    )}
                    aria-invalid={!!(touched.message && errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                </div>
                <div className="flex justify-between items-center mt-1.5">
                  <AnimatePresence>
                    {touched.message && errors.message && (
                      <motion.p
                        id="contact-message-error"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs text-[var(--destructive)]"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <span className="text-[11px] text-[var(--text-tertiary)] ml-auto">
                    {formData.message.length} / 500
                  </span>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "group btn-brand w-full md:w-auto inline-flex items-center justify-center gap-2",
                    "h-12 px-8 text-sm font-semibold",
                    "disabled:opacity-60 disabled:pointer-events-none"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    id="contact-privacy"
                    type="checkbox"
                    checked={formData.privacyAccepted}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, privacyAccepted: e.target.checked }));
                      if (touched.privacyAccepted) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.privacyAccepted;
                          return next;
                        });
                      }
                    }}
                    disabled={isSubmitting}
                    className={cn(
                      "w-4 h-4 rounded border-[var(--border-default)] bg-[var(--surface-sunken)]",
                      "text-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 focus:outline-none",
                      "disabled:opacity-50 disabled:pointer-events-none",
                      touched.privacyAccepted && errors.privacyAccepted && "border-[var(--destructive)]!"
                    )}
                  />
                  <span className="text-xs text-[var(--text-secondary)] leading-snug">
                    By submitting, you agree to our <span className="underline underline-offset-2 cursor-pointer hover:text-[var(--text-primary)]">privacy policy</span>. We&apos;ll never share your data without permission.
                  </span>
                </label>
                <AnimatePresence>
                  {touched.privacyAccepted && errors.privacyAccepted && (
                    <motion.p
                      id="contact-privacy-error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-[var(--destructive)]"
                    >
                      {errors.privacyAccepted}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="card-glass rounded-2xl p-10 lg:p-14 flex flex-col items-center text-center gap-5"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="w-16 h-16 rounded-full bg-[var(--status-success-bg)] flex items-center justify-center"
            >
              <CheckCircle2 className="w-8 h-8 text-[var(--status-success)]" />
            </motion.div>
            <h3 className="text-h3 font-semibold text-[var(--text-primary)]">
              Message sent successfully
            </h3>
            <p className="text-body-sm text-[var(--text-secondary)] max-w-md leading-relaxed">
              Thanks for reaching out. Our team will review your inquiry and respond within one business day.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="btn-outline mt-2"
            >
              Send another message
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
