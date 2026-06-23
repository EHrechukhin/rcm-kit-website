# Coding / HIPPS Classification

**Route:** `#/solutions/coding-hipps-classification`  
**Title:** Coding / HIPPS Classification — RCM Kit  
**Group:** Coding & Charge  
**Status:** ON THE ROADMAP · SNF CORE  
**Value vector:** CAPACITY

---

## Headline

Automate deterministic coding and HIPPS/PDPM classification, with human review where judgment is required.

---

## The Work Today

Classification and coding pull data across clinical and therapy systems and re-key it; the deterministic parts are slow, the judgment parts are bottlenecked, and accuracy depends on who happens to be at the desk.

---

## What the Agent Does

1. PDPM and HIPPS scoring support from clinical and therapy data
2. Diagnosis ingestion and normalization
3. Coding assistance with human review on edge cases
4. Surfacing of evidence supporting each code

---

## How It Works

**Inputs:**
- MDS assessments
- Therapy minutes and discipline data
- Clinical documentation

**Agent Steps:**
1. Aggregate clinical + therapy inputs
2. Compute candidate HIPPS
3. Surface supporting evidence
4. Flag uncertain components for review

**HITL Gate:**  
Every assessment with a judgment component is reviewed before final classification; deterministic components auto-flow.

**Outputs:**
- HIPPS classification with rationale
- Coding suggestions with evidence
- Review-needed list

---

## Where It Connects

- EHR/EMR
- Therapy data sources
- Billing system

---

## The Impact

**Primary value vector: Capacity**

Move the deterministic majority of this work to the agent so the people who used to do it can work the work that actually needs them.

### Core SNF Strength
Core SNF strength — PDPM components, HIPPS coding, MDS-driven classification.

*SNF is our flagship proof of depth, not the limit of scope. The same agent extends across broader healthcare RCM.*

---

## Related Agents

- **Charge Capture** · ON THE ROADMAP — Make sure every billable service is captured and charged.
- **Claim Management** · ON THE ROADMAP — Clean, complete claims out the door faster — fewer first-pass denials.
