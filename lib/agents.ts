import { type AgentStatus } from "@/components/ui/status-badge";

export interface Agent {
  slug: string;
  name: string;
  description: string;
  status: AgentStatus;
}

export interface AgentGroup {
  number: number;
  name: string;
  description: string;
  agents: Agent[];
}

export const agentGroups: AgentGroup[] = [
  {
    number: 1,
    name: "Eligibility & Intake",
    description: "Verify, discover, and optimize insurance coverage before care is delivered.",
    agents: [
      {
        slug: "insurance-eligibility-verification",
        name: "Insurance Eligibility Verification",
        description: "Automatically verify active coverage, benefits, and authorization requirements across all payers.",
        status: "ON_THE_ROADMAP",
      },
      {
        slug: "insurance-discovery",
        name: "Insurance Discovery",
        description: "Identify unknown or lapsed coverage for self-pay and uninsured patients.",
        status: "ON_THE_ROADMAP",
      },
      {
        slug: "insurance-optimization",
        name: "Insurance Optimization",
        description: "Sequence and optimize payer billing order to maximize reimbursement.",
        status: "ON_THE_ROADMAP",
      },
    ],
  },
  {
    number: 2,
    name: "Estimation & Patient",
    description: "Provide accurate cost estimates and manage patient financial responsibility.",
    agents: [
      {
        slug: "estimation",
        name: "Estimation",
        description: "Generate accurate patient cost estimates based on verified benefits and historical payer behavior.",
        status: "ON_THE_ROADMAP",
      },
      {
        slug: "private-billing",
        name: "Private Billing",
        description: "Automate patient responsibility billing, payment plans, and collections workflows.",
        status: "ON_THE_ROADMAP",
      },
    ],
  },
  {
    number: 3,
    name: "Coding & Charge",
    description: "Ensure accurate clinical coding and complete charge capture.",
    agents: [
      {
        slug: "coding-hipps-classification",
        name: "Coding / HIPPS Classification",
        description: "Validate and optimize ICD-10, CPT, and HIPPS codes for maximum compliant reimbursement.",
        status: "ON_THE_ROADMAP",
      },
      {
        slug: "charge-capture",
        name: "Charge Capture",
        description: "Identify missing or incomplete charges before claims submission.",
        status: "ON_THE_ROADMAP",
      },
    ],
  },
  {
    number: 4,
    name: "Claims & Submission",
    description: "Build clean claims and eliminate submission errors before they become denials.",
    agents: [
      {
        slug: "claim-management",
        name: "Claim Management",
        description: "Scrub, validate, and submit clean claims with payer-specific edits applied automatically.",
        status: "ON_THE_ROADMAP",
      },
      {
        slug: "census-billing-reconciliation",
        name: "Census ↔ Billing Reconciliation",
        description: "Continuously reconcile census data against billing to catch missed or duplicate claims.",
        status: "ON_THE_ROADMAP",
      },
    ],
  },
  {
    number: 5,
    name: "Posting & Reconciliation",
    description: "Post payments with precision and detect every underpayment.",
    agents: [
      {
        slug: "payment-posting",
        name: "Payment Posting",
        description: "Automate ERA/EOB posting, contractual adjustments, and balance resolution with full audit trails.",
        status: "AVAILABLE",
      },
      {
        slug: "underpayment-detection",
        name: "Underpayment Detection",
        description: "Identify contractual underpayments by comparing posted amounts against expected reimbursement.",
        status: "ON_THE_ROADMAP",
      },
    ],
  },
  {
    number: 6,
    name: "Denials & A/R",
    description: "Resolve denials faster and keep aging A/R from becoming bad debt.",
    agents: [
      {
        slug: "denials-management-appeals",
        name: "Denials Management & Appeals",
        description: "Classify denials by root cause, draft appeals, and track resolution across all payers.",
        status: "ON_THE_ROADMAP",
      },
      {
        slug: "accounts-receivable-follow-up",
        name: "Accounts Receivable Follow-Up",
        description: "Work aged A/R buckets intelligently — prioritizing by payer, balance, and collectibility.",
        status: "IN_ACTIVE_DEVELOPMENT",
      },
      {
        slug: "bad-debt-collection",
        name: "Bad Debt Collection",
        description: "Identify recoverable bad debt and automate collection workflows before write-off.",
        status: "ON_THE_ROADMAP",
      },
    ],
  },
  {
    number: 7,
    name: "Coverage & Enrollment",
    description: "Manage Medicare disenrollment and Medicaid eligibility proactively.",
    agents: [
      {
        slug: "managed-medicare-disenrollment",
        name: "Managed Medicare Disenrollment",
        description: "Detect and resolve managed Medicare disenrollment issues before they result in claim denials.",
        status: "ON_THE_ROADMAP",
      },
      {
        slug: "medicaid-application",
        name: "Medicaid Application",
        description: "Automate Medicaid eligibility screening and application submission for qualifying patients.",
        status: "ON_THE_ROADMAP",
      },
    ],
  },
  {
    number: 8,
    name: "Contracts & Value",
    description: "Maximize contract performance and capture value-based care revenue.",
    agents: [
      {
        slug: "hmo-pharmacy-contract-management",
        name: "HMO / Pharmacy Contract Management",
        description: "Monitor contract compliance and flag deviations from negotiated rates in real time.",
        status: "ON_THE_ROADMAP",
      },
      {
        slug: "quality-vbp-revenue",
        name: "Quality / VBP Revenue",
        description: "Track quality measures and capture all available value-based purchasing incentive payments.",
        status: "ON_THE_ROADMAP",
      },
    ],
  },
];

export function getAgentBySlug(slug: string): (Agent & { group: AgentGroup }) | undefined {
  for (const group of agentGroups) {
    const agent = group.agents.find((a) => a.slug === slug);
    if (agent) return { ...agent, group };
  }
  return undefined;
}

export function getAllAgentSlugs(): string[] {
  return agentGroups.flatMap((g) => g.agents.map((a) => a.slug));
}
