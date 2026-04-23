# Projects Core

<p align="center">
  <img src="./docs/assets/gutu-mascot.png" alt="Gutu mascot" width="220" />
</p>

Project plans, milestones, budget posture, execution visibility, and project-driven billing readiness for delivery-centric work.

![Maturity: Hardened](https://img.shields.io/badge/Maturity-Hardened-2563eb) ![Verification: Build+Typecheck+Lint+Test+Contracts+Migrations+Integration](https://img.shields.io/badge/Verification-Build%2BTypecheck%2BLint%2BTest%2BContracts%2BMigrations%2BIntegration-2563eb) ![DB: postgres+sqlite](https://img.shields.io/badge/DB-postgres%2Bsqlite-2563eb) ![Integration Model: Actions+Resources+Jobs+Workflows+UI](https://img.shields.io/badge/Integration%20Model-Actions%2BResources%2BJobs%2BWorkflows%2BUI-2563eb)

## Part Of The Gutu Stack

| Aspect | Value |
| --- | --- |
| Repo kind | First-party plugin |
| Domain group | Operational Data |
| Default category | Business / Projects & Delivery |
| Primary focus | project execution, milestones, billing readiness |
| Best when | You need a governed domain boundary with explicit contracts and independent release cadence. |
| Composes through | Actions+Resources+Jobs+Workflows+UI |

- Gutu keeps plugins as independent repos with manifest-governed boundaries, compatibility channels, and verification lanes instead of hiding everything behind one giant mutable codebase.
- This plugin is meant to compose through explicit actions, resources, jobs, workflows, and runtime envelopes, not through undocumented hook chains.

## What It Does Now

Owns project execution, milestone progress, and delivery-driven billing readiness without collapsing into sales or accounting truth.

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

## Maturity

**Maturity Tier:** `Hardened`

This tier is justified because unit coverage exists, contract coverage exists, integration coverage exists, migration coverage exists, job definitions are exported, and workflow definitions are exported.

## Verified Capability Summary

- Domain group: **Operational Data**
- Default category: **Business / Projects & Delivery**
- Verification surface: **Build+Typecheck+Lint+Test+Contracts+Migrations+Integration**
- Tests discovered: **5** total files across unit, contract, integration, migration lanes
- Integration model: **Actions+Resources+Jobs+Workflows+UI**
- Database support: **postgres + sqlite**

## Dependency And Compatibility Summary

| Field | Value |
| --- | --- |
| Package | `@plugins/projects-core` |
| Manifest ID | `projects-core` |
| Repo | [gutu-plugin-projects-core](https://github.com/gutula/gutu-plugin-projects-core) |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `traceability-core`, `party-relationships-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.projects`, `events.publish.projects` |
| Provided Capabilities | `projects.projects`, `projects.milestones`, `projects.billing-requests` |
| Runtime | bun>=1.3.12 |
| Database | postgres, sqlite |
| Integration Model | Actions+Resources+Jobs+Workflows+UI |

## Capability Matrix

| Surface | Count | Details |
| --- | --- | --- |
| Actions | 3 | `projects.projects.create`, `projects.milestones.complete`, `projects.billing.request` |
| Resources | 3 | `projects.projects`, `projects.milestones`, `projects.billing-requests` |
| Jobs | 2 | `projects.projections.refresh`, `projects.reconciliation.run` |
| Workflows | 1 | `project-delivery-lifecycle` |
| UI | Present | base UI surface, admin contributions |
| Owned Entities | 7 | `Project`, `Task`, `Milestone`, `Timesheet`, `Budget`, `Change Request`, `Billing Rule` |
| Reports | 4 | `Project Wise Stock Tracking`, `Daily Timesheet Summary`, `Project Budget Burn`, `Milestone Billing Status` |
| Exception Queues | 3 | `budget-overrun-review`, `timesheet-approval-backlog`, `change-request-certification` |
| Operational Scenarios | 4 | `project-setup`, `time-and-expense-capture`, `milestone-billing-request`, `change-order-governance` |
| Settings Surfaces | 3 | `Projects Settings`, `Activity Cost`, `Project Template` |
| ERPNext Refs | 1 | `Projects` |

## Quick Start For Integrators

Use this repo inside a **compatible Gutu workspace** or the **ecosystem certification workspace** so its `workspace:*` dependencies resolve honestly.

```bash
# from a compatible workspace that already includes this plugin's dependency graph
bun install
bun run build
bun run test
bun run docs:check
```

```ts
import { manifest, createPrimaryRecordAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/projects-core";

console.log(manifest.id);
console.log(createPrimaryRecordAction.id);
console.log(BusinessPrimaryResource.id);
```

Use the root repo scripts for day-to-day work **after the workspace is bootstrapped**, or run the nested package directly from `framework/builtin-plugins/projects-core` if you need lower-level control.

## Current Test Coverage

- Root verification scripts: `bun run build`, `bun run typecheck`, `bun run lint`, `bun run test`, `bun run test:contracts`, `bun run test:unit`, `bun run test:integration`, `bun run test:migrations`, `bun run docs:check`
- Unit files: 1
- Contracts files: 1
- Integration files: 1
- Migrations files: 2

## Known Boundaries And Non-Goals

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.
- Cross-plugin composition should use Gutu command, event, job, and workflow primitives. This repo should not be documented as exposing a generic WordPress-style hook system unless one is explicitly exported.

## Recommended Next Milestones

- Deepen budget, change, and timesheet-aware delivery flows before project-backed billing becomes production critical.
- Add stronger portfolio and commitment views where multi-project delivery coordination matters.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Project`, `Task`, `Timesheet`.

## More Docs

See [DEVELOPER.md](./DEVELOPER.md), [TODO.md](./TODO.md), [SECURITY.md](./SECURITY.md), [CONTRIBUTING.md](./CONTRIBUTING.md). The internal domain sources used to build those docs live under:

- `plugins/gutu-plugin-projects-core/framework/builtin-plugins/projects-core/docs/AGENT_CONTEXT.md`
- `plugins/gutu-plugin-projects-core/framework/builtin-plugins/projects-core/docs/BUSINESS_RULES.md`
- `plugins/gutu-plugin-projects-core/framework/builtin-plugins/projects-core/docs/EDGE_CASES.md`
- `plugins/gutu-plugin-projects-core/framework/builtin-plugins/projects-core/docs/FLOWS.md`
- `plugins/gutu-plugin-projects-core/framework/builtin-plugins/projects-core/docs/GLOSSARY.md`
- `plugins/gutu-plugin-projects-core/framework/builtin-plugins/projects-core/docs/MANDATORY_STEPS.md`
