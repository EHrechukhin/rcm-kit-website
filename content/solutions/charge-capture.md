# Charge Capture

**Route:** `#/solutions/charge-capture`  
**Title:** Charge Capture — RCM Kit  
**Group:** Coding & Charge  
**Status:** ON THE ROADMAP  
**Value vector:** REVENUE RECOVERY

---

## Headline

Make sure every billable service is captured and charged — close the silent revenue leakage.

---

## The Work Today

Charges are generated manually from multiple sources; missed charges leak revenue invisibly because no one reconciles services delivered against services billed at the line level.

---

## What the Agent Does

1. Charge generation from clinical and service data
2. Missing-charge detection across sources
3. Reconciliation against services actually delivered
4. Therapy, ancillary, and vaccine charge patterns

---

## How It Works

**Inputs:**
- Clinical and service event data
- Charge master
- Prior billed charges

**Agent Steps:**
1. Map events to charges
2. Compare to billed
3. Detect missing or duplicate
4. Stage corrections

**HITL Gate:**  
Corrections above a threshold are reviewed; deterministic auto-additions are logged but reversible.

**Outputs:**
- Captured charges
- Missing-charge report
- Reconciliation audit

---

## Where It Connects

- EHR/EMR
- Ancillary / therapy / vaccine administration data
- Billing system

---

## The Impact

**Primary value vector: Revenue recovery**

Recover dollars that are leaking today because no one has the capacity to chase them — denials, underpayments, missed coverage, mis-routed claims.

### SNF Specialized Depth
Therapy, ancillary, and vaccine charge patterns common across SNF books.

*SNF is our flagship proof of depth, not the limit of scope. The same agent extends across broader healthcare RCM.*

---

## Related Agents

- **Coding / HIPPS Classification** · ON THE ROADMAP — Automate deterministic coding and HIPPS/PDPM classification.
- **Census ↔ Billing Reconciliation** · ON THE ROADMAP — Keep census and billing in agreement so nothing is billed wrong or missed.
