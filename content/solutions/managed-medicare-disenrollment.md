# Managed Medicare Disenrollment

**Route:** `#/solutions/managed-medicare-disenrollment`  
**Title:** Managed Medicare Disenrollment — RCM Kit  
**Group:** Coverage & Enrollment  
**Status:** ON THE ROADMAP  
**Value vector:** REVENUE RECOVERY

---

## Headline

Track disenrollment so claims go to the right payer and revenue isn't lost to coverage changes.

---

## The Work Today

Disenrollment is tracked manually and inconsistently, causing misrouted claims, late discovery, and write-offs that trace back to a coverage change no one logged.

---

## What the Agent Does

1. Disenrollment monitoring across managed plans
2. Payer-routing correction
3. Affected-claim surfacing for rework

---

## How It Works

**Inputs:**
- Resident coverage history
- Eligibility responses
- Plan-change notices

**Agent Steps:**
1. Detect disenrollment
2. Update routing
3. Identify affected claims
4. Stage corrections

**HITL Gate:**  
Routing changes are reviewed before applying to in-flight claims.

**Outputs:**
- Updated coverage routing
- Affected-claim list
- Disenrollment audit

---

## Where It Connects

- Eligibility EDI
- Payer portals
- Billing system
- EHR/EMR

---

## The Impact

**Primary value vector: Revenue recovery**

Recover dollars that are leaking today because no one has the capacity to chase them — denials, underpayments, missed coverage, mis-routed claims.

### SNF Specialized Depth
Managed Medicare/Medicaid plan-change patterns common in long-stay residents.

*SNF is our flagship proof of depth, not the limit of scope. The same agent extends across broader healthcare RCM.*

---

## Related Agents

- **Insurance (Eligibility) Verification** · ON THE ROADMAP — Verify coverage and benefits automatically, before service.
- **Claim Management** · ON THE ROADMAP — Clean, complete claims out the door faster — fewer first-pass denials.
