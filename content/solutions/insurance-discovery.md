# Insurance Discovery

**Route:** `#/solutions/insurance-discovery`  
**Title:** Insurance Discovery — RCM Kit  
**Group:** Eligibility & Intake  
**Status:** ON THE ROADMAP  
**Value vector:** REVENUE RECOVERY

---

## Headline

Find billable coverage that would otherwise be written off as self-pay or unfunded.

---

## The Work Today

Missing or unknown coverage is rarely chased systematically — capacity for it doesn't exist, so the revenue is written off long before anyone notices it was recoverable.

---

## What the Agent Does

1. Coverage discovery across payers using minimum demographic data
2. Match confirmation against payer responses
3. Route discovered coverage into billing and follow-up
4. Continuous re-check for previously self-pay accounts

---

## How It Works

**Inputs:**
- Self-pay / unfunded account list
- Patient demographics
- Prior coverage history

**Agent Steps:**
1. Search across payer panels
2. Confirm match via 270/271
3. Confidence-score each candidate
4. Stage discovered coverage for review

**HITL Gate:**  
Discovered coverage is staged for billing review before being applied to claims — the agent surfaces, it does not auto-rebill.

**Outputs:**
- Confirmed new coverage records
- Re-routable balances
- Discovery audit trail

---

## Where It Connects

- 270/271
- Payer portals
- EHR/EMR

---

## The Impact

**Primary value vector: Revenue recovery**

Recover dollars that are leaking today because no one has the capacity to chase them — denials, underpayments, missed coverage, mis-routed claims.

### SNF Specialized Depth
Medicaid and MLTSS discovery patterns common in long-stay and dual-eligible residents.

*SNF is our flagship proof of depth, not the limit of scope. The same agent extends across broader healthcare RCM.*

---

## Related Agents

- **Insurance (Eligibility) Verification** · ON THE ROADMAP — Verify coverage and benefits automatically, before service.
- **Medicaid Application** · ON THE ROADMAP — Prepare Medicaid applications and redeterminations end to end, with human sign-off.
- **Bad Debt Collection** · ON THE ROADMAP — Recover more from accounts that would otherwise be written off.
