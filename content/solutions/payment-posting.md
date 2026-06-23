# Payment Posting

**Route:** `#/solutions/payment-posting`  
**Title:** Payment Posting — RCM Kit  
**Group:** Posting & Reconciliation  
**Status:** AVAILABLE · FLAGSHIP  
**Value vector:** CAPACITY

---

## Headline

Post cash the day it arrives — accurate remittance posting and bank reconciliation, automatically.

---

## The Work Today

Teams manually post daily remittance files, reconcile to bank deposits, and flag exceptions for follow-up. The clean ERAs are easy; the exceptions are slow; and the team is always a day or two behind.

---

## What the Agent Does

1. Daily cash posting from clearinghouse files
2. ERA reconciliation to bank deposits
3. Line-level allocation across claims and patients
4. Daily bank reconciliations
5. Exception flagging — unmatched payments, takebacks, partial denials — with suggested resolution

---

## How It Works

**Inputs:**
- 835 / ERA files
- Bank deposit data
- Fee-schedule reference
- Open claims

**Agent Steps:**
1. Parse and validate ERAs
2. Allocate at line level
3. Reconcile to deposit
4. Flag exceptions with proposed routing

**HITL Gate:**  
Clean ERAs auto-post; exceptions are human-routed with the agent's proposed resolution and a one-click apply.

**Outputs:**
- Posted cash by day
- Reconciled bank position
- Exception worklist (unmatched, takeback, partial denial) with suggested next action

---

## Where It Connects

- Billing system
- Clearinghouse remittance files
- Bank deposit data
- 835 / ERA
- Fee-schedule reference data

---

## The Impact

**Primary value vector: Capacity**

Move the deterministic majority of this work to the agent so the people who used to do it can work the work that actually needs them.

### SNF Specialized Depth
Multi-payer remittance patterns typical of SNF books, including managed Medicare/Medicaid takebacks.

*SNF is our flagship proof of depth, not the limit of scope. The same agent extends across broader healthcare RCM.*

---

## Related Agents

- **Accounts Receivable (A/R) & Follow-Up** · IN ACTIVE DEVELOPMENT — Work the entire A/R book continuously.
- **Underpayment Detection** · ON THE ROADMAP — Catch the money payers should have paid but didn't — line-level, continuously.
