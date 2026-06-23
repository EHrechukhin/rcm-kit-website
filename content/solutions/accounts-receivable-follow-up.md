# Accounts Receivable (A/R) & Follow-Up

**Route:** `#/solutions/accounts-receivable-follow-up`  
**Title:** Accounts Receivable (A/R) & Follow-Up — RCM Kit  
**Group:** Denials & A/R  
**Status:** IN ACTIVE DEVELOPMENT · FLAGSHIP  
**Value vector:** CAPACITY

---

## Headline

Work the entire A/R book continuously — prioritized, pursued, and documented — instead of whatever staff can reach this week.

---

## The Work Today

A/R specialists manually work aging reports, prioritize by age × dollar × payer, query portals or call payers for status, document outcomes, and escalate disputes. The book is always bigger than the team.

---

## What the Agent Does

1. A/R aging analysis and payer-specific work-list prioritization
2. Follow-up workflow generation per claim
3. Status queries — EDI where supported, portal and IVR where not
4. Dispute initiation and outcome documentation

---

## How It Works

**Inputs:**
- Open A/R book
- Payer behavior history
- Status sources (276/277, portals, IVR)

**Agent Steps:**
1. Prioritize by age × dollar × payer × predicted yield
2. Query status across channels
3. Document outcomes
4. Initiate disputes / escalations as defined

**HITL Gate:**  
Low-confidence or complex interactions are human-escalated; autonomy grows as measured outcome confidence accrues per payer and follow-up type.

**Outputs:**
- Worked claims with documented status
- Disputes initiated
- Outcome metrics per payer

---

## Where It Connects

- Billing system
- Payer portals
- 276/277 status EDI
- EHR/EMR
- Call/IVR channels

---

## The Impact

**Primary value vector: Capacity**

Move the deterministic majority of this work to the agent so the people who used to do it can work the work that actually needs them.

### SNF Specialized Depth
Aged managed-plan and pending-coverage follow-up patterns where post-acute revenue lives or dies.

*SNF is our flagship proof of depth, not the limit of scope. The same agent extends across broader healthcare RCM.*

---

## Related Agents

- **Payment Posting** · AVAILABLE — Post cash the day it arrives — accurate remittance posting and bank reconciliation, automatically.
- **Denials Management & Appeals** · ON THE ROADMAP — Turn denials around in days, not weeks.
- **Claim Management** · ON THE ROADMAP — Clean, complete claims out the door faster — fewer first-pass denials.
