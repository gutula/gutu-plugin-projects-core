# Projects Core TODO

**Maturity Tier:** `Hardened`

## Shipped Now

- Exports 3 governed actions: `projects.projects.create`, `projects.milestones.complete`, `projects.billing.request`.
- Owns 3 resource contracts: `projects.projects`, `projects.milestones`, `projects.billing-requests`.
- Publishes 2 job definitions with explicit queue and retry policy metadata.
- Publishes 1 workflow definition with state-machine descriptions and mandatory steps.
- Adds richer admin workspace contributions on top of the base UI surface.
- Ships explicit SQL migration or rollback helpers alongside the domain model.
- Documents 7 owned entity surface(s): `Project`, `Task`, `Milestone`, `Timesheet`, `Budget`, `Change Request`, and more.
- Carries 4 report surface(s) and 3 exception queue(s) for operator parity and reconciliation visibility.
- Tracks ERPNext reference parity against module(s): `Projects`.
- Operational scenario matrix includes `project-setup`, `time-and-expense-capture`, `milestone-billing-request`, `change-order-governance`.
- Governs 3 settings or policy surface(s) for operator control and rollout safety.

## Current Gaps

- Repo-local documentation verification entrypoints were missing before this pass and need to stay green as the repo evolves.

## Recommended Next

- Deepen budget, change, and timesheet-aware delivery flows before project-backed billing becomes production critical.
- Add stronger portfolio and commitment views where multi-project delivery coordination matters.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Project`, `Task`, `Timesheet`.

## Later / Optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
