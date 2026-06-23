# Underpayment Detection

**Route:** `#/solutions/underpayment-detection`  
**Title:** Underpayment Detection — RCM Kit  
**Group:** Posting & Reconciliation  
**Status:** ON THE ROADMAP  
**Value vector:** REVENUE RECOVERY

---

## Headline

Catch the money payers should have paid but didn't — line-level, continuously.

---

## The Work Today

Largely uncovered work. Staff buried in posting never get to systematic expected-vs-actual reconciliation, so underpayment leakage is real but unmeasured.

---

## What the Agent Does

1. Line-level expected-vs-actual reconciliation against contract terms
2. Variance pattern analysis across payer / plan / service
3. Dispute draft generation for review

---

## How It Works

**Inputs:**
- Posted payments (835)
- Contract terms
- Fee schedules

**Agent Steps:**
1. Compute expected per line
2. Compare to actual
3. Cluster variance patterns
4. Draft disputes for review

**HITL Gate:**  
Pattern analysis runs autonomously; every dispute is human-reviewed before submission, with legal-review escalation defined.

**Outputs:**
- Underpayment register
- Variance patterns by payer
- Draft disputes ready for review

---

## Where It Connects

- Billing system
- Payer contract-terms data
- 835 / ERA
- Fee-schedule reference data
- Dispute tracking

---

## The Impact

**Primary value vector: Revenue recovery**

Recover dollars that are leaking today because no one has the capacity to chase them — denials, underpayments, missed coverage, mis-routed claims.

### SNF Specialized Depth
Managed-plan and MLTSS contract variance patterns characteristic of post-acute books.

*SNF is our flagship proof of depth, not the limit of scope. The same agent extends across broader healthcare RCM.*

---

## Related Agents

- **Payment Posting** · AVAILABLE — Post cash the day it arrives — accurate remittance posting and bank reconciliation.
- **Denials Management & Appeals** · ON THE ROADMAP — Turn denials around in days, not weeks.
- **HMO / Pharmacy Contract Management** · ON THE ROADMAP — Turn contract terms into enforced expectations.
