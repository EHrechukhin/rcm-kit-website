"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp, Stagger, StaggerItem } from "@/components/motion";

const faqs = [
  {
    question: "How do you handle accuracy and hallucination risk?",
    answer: "Every output with regulatory or financial exposure is reviewed by a person before it leaves the system. Agents must clear evaluation gates before they go live and to stay live, and autonomy expands only as measured confidence accrues for that agent on that workflow.",
  },
  {
    question: "How is data and PHI handled?",
    answer: "Agents handle protected health information per HIPAA-aligned practices: data segregation, least-privilege access, encryption in transit and at rest, and complete audit logging. Security and compliance are part of the architecture, not bolted on. See the Security page for full detail.",
  },
  {
    question: "How heavy is the integration lift?",
    answer: "Agents execute the workflow inside your existing systems — EHR/EMR, billing, clearinghouses, payer channels. Deployment is phased, agent by agent, often shadow-running before any autonomy. You are not adopting a new operating system; you are deploying a workforce inside the one you have.",
  },
  {
    question: "What's available now vs. on the roadmap?",
    answer: "Payment Posting is available today. Accounts Receivable & Follow-Up is in active development with an early-access cohort forming. The other 16 agents are on the roadmap — the waitlist is how you get in early and influence priority.",
  },
  {
    question: "How does pricing work?",
    answer: "There is no public pricing yet. Early-access conversations are how we shape pricing with the first cohort. Join the waitlist and we will be in touch.",
  },
  {
    question: "How is this different from RCM AI tools that failed before?",
    answer: "Prior generations were sales-led, horizontal, shallow on domain, and uncontrolled — autonomy without a safety story. RCM Kit is specialized (SNF-flagship, extending across healthcare RCM), deeply integrated into the systems where the work actually happens, and control-first: human-in-the-loop, evaluation gates, full audit. Different architecture, different result.",
  },
];

export function FAQSection() {
  return (
    <section className="relative bg-white text-[#0f172a] py-28 px-6 lg:px-10">
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <FadeUp>
          <div>
            <div className="eyebrow mb-5">Questions</div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-[1.06] tracking-tight mb-5 max-w-[14ch] text-[#090c12]">
              Honest answers to the obvious objections.
            </h2>
            <p className="text-[1rem] leading-[1.75] text-zinc-500 mt-5 max-w-[40ch]">
              We&apos;ve heard most of these. Here&apos;s where we stand.
            </p>
          </div>
        </FadeUp>

        <Stagger delay={0.1} className="flex flex-col">
          {faqs.map((item, index) => (
            <StaggerItem key={index}>
              <FAQItem question={item.question} answer={item.answer} defaultOpen={index === 0} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function FAQItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <details
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
      className="border-b border-zinc-200 py-4 transition-all duration-200"
    >
      <summary className="cursor-pointer list-none flex justify-between items-center gap-4 font-medium text-[1.04rem] outline-none">
        <span className="flex-1">{question}</span>
        <span
          aria-hidden="true"
          className="text-[var(--brand)] font-mono text-[1.4rem] leading-none transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
        >
          +
        </span>
      </summary>
      <p className="text-zinc-500 mt-3 max-w-[60ch] text-[0.9375rem] leading-[1.72]">
        {answer}
      </p>
    </details>
  );
}