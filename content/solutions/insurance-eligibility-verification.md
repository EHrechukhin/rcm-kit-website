# Insurance (Eligibility) Verification

**Route:** `#/solutions/insurance-eligibility-verification`  
**Title:** Insurance (Eligibility) Verification — RCM Kit  
**Group:** Eligibility & Intake  
**Status:** ON THE ROADMAP  
**Value vector:** REVENUE RECOVERY

---

## Headline

Verify coverage and benefits automatically, before service, so fewer claims fail for eligibility reasons.

---

## The Work Today

Staff manually check payer portals and eligibility responses, re-key coverage and benefit detail, and miss secondary coverage and benefit changes — driving downstream denials and write-offs that no one ever traces back to intake.

---

## What the Agent Does

1. Automated eligibility and benefit verification across payers
2. Coverage and benefit-change detection between encounters
3. Exception surfacing for human review on ambiguous responses
4. Structured write-back into the billing system and EHR

---

## How It Works

**Inputs:**
- Scheduled or admitted patient list
- Existing coverage records
- Payer responses

**Agent Steps:**
1. Query payers via 270 eligibility
2. Parse 271 responses + portal data
3. Reconcile against existing record
4. Detect benefit changes and secondary coverage

**HITL Gate:**  
Exceptions and ambiguous benefit responses are routed to staff with the parsed response and suggested resolution; the agent never overwrites verified coverage without review.

**Outputs:**
- Verified coverage and benefit record
- Exception list with payer source
- Downstream eligibility flags for claims

---

## Where It Connects

- 270/271 eligibility EDI
- Payer portals
- EHR/EMR (e.g., PointClickCare for SNF)
- Billing system

---

## The Impact

**Primary value vector: Revenue recovery**

Recover dollars that are leaking today because no one has the capacity to chase them — denials, underpayments, missed coverage, mis-routed claims.

### SNF Specialized Depth
Payer-mix and benefit nuances common in long-term and post-acute coverage, including dual-eligible and managed-plan patterns.

*SNF is our flagship proof of depth, not the limit of scope. The same agent extends across broader healthcare RCM.*

---

## Related Agents

- **Insurance Discovery** · ON THE ROADMAP — Find billable coverage that would otherwise be written off as self-pay or unfunded.
- **Insurance Optimization** · ON THE ROADMAP — Ensure each encounter is billed to the right payer in the right order.
- **Claim Management** · ON THE ROADMAP — Clean, complete claims out the door faster — fewer first-pass denials.
