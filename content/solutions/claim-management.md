# Claim Management

**Route:** `#/solutions/claim-management`  
**Title:** Claim Management — RCM Kit  
**Group:** Claims & Submission  
**Status:** ON THE ROADMAP  
**Value vector:** REVENUE RECOVERY

---

## Headline

Clean, complete claims out the door faster — fewer first-pass denials.

---

## The Work Today

Staff run pre-submission edits, submit to the clearinghouse, generate secondary claims after adjudication, and manually reconcile authorization data — usually in the last hours before a payer cutoff.

---

## What the Agent Does

1. Pre-submission edit checks and resolution
2. Primary submission via 837
3. Secondary claim generation post-adjudication
4. Multi-source authorization / eligibility cross-check
5. Submission tracking

---

## How It Works

**Inputs:**
- Charged encounters
- Eligibility and authorization records
- Payer edit rules

**Agent Steps:**
1. Apply edits
2. Submit primary
3. Generate secondaries from 835
4. Cross-check auth and eligibility

**HITL Gate:**  
Edit failures and high-dollar claims are reviewed; a human-review window on secondary generation runs before confidence-based autonomy is granted.

**Outputs:**
- Submitted 837 claims
- Secondary claim batch
- Edit-resolution log

---

## Where It Connects

- Billing system
- Clearinghouse APIs
- 837P/837I generation
- EHR/EMR for cross-check

---

## The Impact

**Primary value vector: Revenue recovery**

Recover dollars that are leaking today because no one has the capacity to chase them — denials, underpayments, missed coverage, mis-routed claims.

### SNF Specialized Depth
Census × authorization × service-date triple-checks common in managed long-term services.

*SNF is our flagship proof of depth, not the limit of scope. The same agent extends across broader healthcare RCM.*

---

## Related Agents

- **Coding / HIPPS Classification** · ON THE ROADMAP — Automate deterministic coding and HIPPS/PDPM classification.
- **Denials Management & Appeals** · ON THE ROADMAP — Turn denials around in days, not weeks.
- **Accounts Receivable (A/R) & Follow-Up** · IN ACTIVE DEVELOPMENT — Work the entire A/R book continuously.
