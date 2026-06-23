# Census ↔ Billing Reconciliation

**Route:** `#/solutions/census-billing-reconciliation`  
**Title:** Census ↔ Billing Reconciliation — RCM Kit  
**Group:** Claims & Submission  
**Status:** ON THE ROADMAP · SNF CORE  
**Value vector:** REVENUE RECOVERY

---

## Headline

Keep census and billing in agreement so nothing is billed wrong or missed.

---

## The Work Today

Census and billing are reconciled manually — when at all — and mismatches cause missed days, incorrect levels of care, and downstream denials.

---

## What the Agent Does

1. Continuous census-to-billing reconciliation
2. Discrepancy detection and routing
3. Bed and level-of-care change tracking

---

## How It Works

**Inputs:**
- Daily census
- Billing record
- Bed/level-of-care change events

**Agent Steps:**
1. Match census days to billing
2. Detect missing or extra days
3. Apply LOC change rules
4. Route discrepancies

**HITL Gate:**  
Material discrepancies are resolved by staff with the agent's diff and rule trace.

**Outputs:**
- Reconciled billing position
- Discrepancy worklist
- Reconciliation audit

---

## Where It Connects

- EHR/EMR census
- Billing system

---

## The Impact

**Primary value vector: Revenue recovery**

Recover dollars that are leaking today because no one has the capacity to chase them — denials, underpayments, missed coverage, mis-routed claims.

### Core SNF Strength
Core SNF strength — daily census-driven billing and bed/level changes are the heart of SNF revenue.

*SNF is our flagship proof of depth, not the limit of scope. The same agent extends across broader healthcare RCM.*

---

## Related Agents

- **Charge Capture** · ON THE ROADMAP — Make sure every billable service is captured and charged.
- **Claim Management** · ON THE ROADMAP — Clean, complete claims out the door faster — fewer first-pass denials.
