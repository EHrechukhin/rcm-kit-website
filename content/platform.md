# Platform

**Route:** `#/platform`  
**Title:** Platform — RCM Kit

---

## Hero

**Section:** PLATFORM

### Headline
A coordinated system of agents — not a model in a box.

RCM Kit is built as one platform. Each agent is shaped to a specific revenue-cycle workflow, but every agent inherits the same execution model, the same control surface, and the same audit substrate.

**CTAs:**
- Request Early Access →
- See the 18 agents →

---

## Agentic Execution

How an agent actually runs an RCM workflow, end to end.

**01 — Ingest**  
Pull from the EHR/EMR, billing system, clearinghouse feeds, payer responses — the data the work depends on, already where it lives.

**02 — Reason**  
Apply payer-specific rules, contract terms, clinical context, and learned patterns to the encounter at hand.

**03 — Act**  
Execute the next step in the connected system — submit a claim, post an ERA, query status, draft an appeal, stage a correction.

**04 — Escalate**  
Hand off to a person on defined conditions — confidence threshold, regulated output, dollar threshold, edge category.

**05 — Record**  
Log every decision, input, output, and human touch for audit, training, and continuous evaluation.

---

## Human-in-the-Loop

Agents replace steps. People keep judgment.

Outputs with regulatory or financial exposure are reviewed by a person before they leave the system. Where the decision is judgmental — clinical, coding, appeal — the agent prepares; the person commits.

Autonomy expands only as measured confidence accrues for a specific agent on a specific workflow. Gates are not lifted based on optimism.

**HITL Triggers — Examples:**
- Any appeal, before submission
- Any Medicaid application, before submission
- Claim edits above a defined dollar threshold
- Posting exceptions: unmatched payments, takebacks
- Discovered coverage before re-billing
- Confidence below the live-gate threshold

---

## Evaluation Gates

An agent must clear evaluation thresholds to go live — and to stay live.

Every agent has a defined evaluation suite tied to its workflow: accuracy on held-out cases, behavior on edge categories, escalation correctness, and the rate at which human reviewers accept its outputs. The agent must pass to go live, and is re-evaluated continuously.

Drift triggers an alert and tightens the gate, not a press release. A regression doesn't get explained away; it gets re-gated.

---

## Audit & Observability

If it happened, it's logged. If a person touched it, that's logged too.

Every action and every decision is logged and retained with input context, rule trace, model output, and human review state. Compliance and internal audit can reconstruct any case end to end.

Performance is monitored per agent and per workflow — first-pass success, escalation rate, reviewer-acceptance rate, drift. Observability is built in; it isn't a separate product.

---

## Shared Platform

One reference architecture. New agents come online on a steady cadence.

- **One execution model** — Every agent inherits the same ingest / reason / act / escalate / record pattern. The kit behaves as one system.
- **One control surface** — HITL configuration, evaluation thresholds, and autonomy gates are administered consistently across agents.
- **One audit substrate** — All logs land in one place. Cross-agent investigations and cross-workflow analytics are first-class.

---

## Deployment

Phased, inside your systems. Shadow-run before autonomy.

Deployment is sequenced agent by agent against your priorities — not a single big-bang switchover. Most agents shadow-run alongside the existing team before any autonomy, so we can measure first-pass success against ground truth and lift gates only when the numbers justify it.
