# Projects Core Developer Guide

Project plans, milestones, budget posture, execution visibility, and project-driven billing readiness for delivery-centric work.

**Maturity Tier:** `Hardened`

## Purpose And Architecture Role

Owns project execution, milestone progress, and delivery-driven billing readiness without collapsing into sales or accounting truth.

### This plugin is the right fit when

- You need **project execution**, **milestones**, **billing readiness** as a governed domain boundary.
- You want to integrate through declared actions, resources, jobs, workflows, and UI surfaces instead of implicit side effects.
- You need the host application to keep plugin boundaries honest through manifest capabilities, permissions, and verification lanes.

### This plugin is intentionally not

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.

## Repo Map

| Path | Purpose |
| --- | --- |
| `package.json` | Root extracted-repo manifest, workspace wiring, and repo-level script entrypoints. |
| `framework/builtin-plugins/projects-core` | Nested publishable plugin package. |
| `framework/builtin-plugins/projects-core/src` | Runtime source, actions, resources, services, and UI exports. |
| `framework/builtin-plugins/projects-core/tests` | Unit, contract, integration, and migration coverage where present. |
| `framework/builtin-plugins/projects-core/docs` | Internal domain-doc source set kept in sync with this guide. |
| `framework/builtin-plugins/projects-core/db/schema.ts` | Database schema contract when durable state is owned. |
| `framework/builtin-plugins/projects-core/src/postgres.ts` | SQL migration and rollback helpers when exported. |

## Manifest Contract

| Field | Value |
| --- | --- |
| Package Name | `@plugins/projects-core` |
| Manifest ID | `projects-core` |
| Display Name | Projects Core |
| Domain Group | Operational Data |
| Default Category | Business / Projects & Delivery |
| Version | `0.1.0` |
| Kind | `plugin` |
| Trust Tier | `first-party` |
| Review Tier | `R1` |
| Isolation Profile | `same-process-trusted` |
| Framework Compatibility | ^0.1.0 |
| Runtime Compatibility | bun>=1.3.12 |
| Database Compatibility | postgres, sqlite |

## Dependency Graph And Capability Requests

| Field | Value |
| --- | --- |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `traceability-core`, `party-relationships-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.projects`, `events.publish.projects` |
| Provides Capabilities | `projects.projects`, `projects.milestones`, `projects.billing-requests` |
| Owns Data | `projects.projects`, `projects.tasks`, `projects.milestones`, `projects.billing-requests` |

### Dependency interpretation

- Direct plugin dependencies describe package-level coupling that must already be present in the host graph.
- Requested capabilities tell the host what platform services or sibling plugins this package expects to find.
- Provided capabilities and owned data tell integrators what this package is authoritative for.

## Public Integration Surfaces

| Type | ID / Symbol | Access / Mode | Notes |
| --- | --- | --- | --- |
| Action | `projects.projects.create` | Permission: `projects.projects.write` | Create Project<br>Idempotent<br>Audited |
| Action | `projects.milestones.complete` | Permission: `projects.milestones.write` | Complete Milestone<br>Non-idempotent<br>Audited |
| Action | `projects.billing.request` | Permission: `projects.billing.request` | Request Project Billing<br>Non-idempotent<br>Audited |
| Action | `projects.projects.hold` | Permission: `projects.projects.write` | Place Record On Hold<br>Non-idempotent<br>Audited |
| Action | `projects.projects.release` | Permission: `projects.projects.write` | Release Record Hold<br>Non-idempotent<br>Audited |
| Action | `projects.projects.amend` | Permission: `projects.projects.write` | Amend Record<br>Non-idempotent<br>Audited |
| Action | `projects.projects.reverse` | Permission: `projects.projects.write` | Reverse Record<br>Non-idempotent<br>Audited |
| Resource | `projects.projects` | Portal disabled | Project headers, budgets, and delivery lifecycle state.<br>Purpose: Own execution truth for project-backed delivery without borrowing order or ledger ownership.<br>Admin auto-CRUD enabled<br>Fields: `title`, `recordState`, `approvalState`, `postingState`, `fulfillmentState`, `updatedAt` |
| Resource | `projects.milestones` | Portal disabled | Milestones, progress gates, and completion state.<br>Purpose: Track project execution and completion posture as a distinct operational truth.<br>Admin auto-CRUD enabled<br>Fields: `label`, `status`, `requestedAction`, `updatedAt` |
| Resource | `projects.billing-requests` | Portal disabled | Billing readiness and milestone-billing request records.<br>Purpose: Request downstream invoicing without letting project execution mutate finance directly.<br>Admin auto-CRUD enabled<br>Fields: `severity`, `status`, `reasonCode`, `updatedAt` |

### Job Catalog

| Job | Queue | Retry | Timeout |
| --- | --- | --- | --- |
| `projects.projections.refresh` | `projects-projections` | Retry policy not declared | No timeout declared |
| `projects.reconciliation.run` | `projects-reconciliation` | Retry policy not declared | No timeout declared |


### Workflow Catalog

| Workflow | Actors | States | Purpose |
| --- | --- | --- | --- |
| `project-delivery-lifecycle` | `project-manager`, `approver`, `delivery-lead` | `draft`, `pending_approval`, `active`, `reconciled`, `closed`, `canceled` | Keep project execution and billing readiness explicit across long-running delivery work. |


### UI Surface Summary

| Surface | Present | Notes |
| --- | --- | --- |
| UI Surface | Yes | A bounded UI surface export is present. |
| Admin Contributions | Yes | Additional admin workspace contributions are exported. |
| Zone/Canvas Extension | No | No dedicated zone extension export. |

## Hooks, Events, And Orchestration

This plugin should be integrated through **explicit commands/actions, resources, jobs, workflows, and the surrounding Gutu event runtime**. It must **not** be documented as a generic WordPress-style hook system unless such a hook API is explicitly exported.

- No standalone plugin-owned lifecycle event feed is exported today.
- Job surface: `projects.projections.refresh`, `projects.reconciliation.run`.
- Workflow surface: `project-delivery-lifecycle`.
- Recommended composition pattern: invoke actions, read resources, then let the surrounding Gutu command/event/job runtime handle downstream automation.

## Storage, Schema, And Migration Notes

- Database compatibility: `postgres`, `sqlite`
- Schema file: `framework/builtin-plugins/projects-core/db/schema.ts`
- SQL helper file: `framework/builtin-plugins/projects-core/src/postgres.ts`
- Migration lane present: Yes

The plugin ships explicit SQL helper exports. Use those helpers as the truth source for database migration or rollback expectations.

## Failure Modes And Recovery

- Action inputs can fail schema validation or permission evaluation before any durable mutation happens.
- If downstream automation is needed, the host must add it explicitly instead of assuming this plugin emits jobs.
- There is no separate lifecycle-event feed to rely on today; do not build one implicitly from internal details.
- Schema regressions are expected to show up in the migration lane and should block shipment.

## Mermaid Flows

### Primary Lifecycle

```mermaid
flowchart LR
  caller["Host or operator"] --> action["projects.projects.create"]
  action --> validation["Schema + permission guard"]
  validation --> service["Projects Core service layer"]
  service --> state["projects.projects"]
  service --> jobs["Follow-up jobs / queue definitions"]
  service --> workflows["Workflow state transitions"]
  state --> ui["Admin contributions"]
```

### Workflow State Machine

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> pending_approval
  draft --> active
  draft --> reconciled
  draft --> closed
  draft --> canceled
```


## Integration Recipes

### 1. Host wiring

```ts
import { manifest, createProjectAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/projects-core";

export const pluginSurface = {
  manifest,
  createProjectAction,
  BusinessPrimaryResource,
  jobDefinitions,
  workflowDefinitions,
  adminContributions,
  uiSurface
};
```

Use this pattern when your host needs to register the plugin’s declared exports without reaching into internal file paths.

### 2. Action-first orchestration

```ts
import { manifest, createProjectAction } from "@plugins/projects-core";

console.log("plugin", manifest.id);
console.log("action", createProjectAction.id);
```

- Prefer action IDs as the stable integration boundary.
- Respect the declared permission, idempotency, and audit metadata instead of bypassing the service layer.
- Treat resource IDs as the read-model boundary for downstream consumers.

### 3. Cross-plugin composition

- Register the workflow definitions with the host runtime instead of re-encoding state transitions outside the plugin.
- Drive follow-up automation from explicit workflow transitions and resource reads.
- Pair workflow decisions with notifications or jobs in the outer orchestration layer when humans must be kept in the loop.

## Test Matrix

| Lane | Present | Evidence |
| --- | --- | --- |
| Build | Yes | `bun run build` |
| Typecheck | Yes | `bun run typecheck` |
| Lint | Yes | `bun run lint` |
| Test | Yes | `bun run test` |
| Unit | Yes | 1 file(s) |
| Contracts | Yes | 1 file(s) |
| Integration | Yes | 1 file(s) |
| Migrations | Yes | 2 file(s) |

### Verification commands

- `bun run build`
- `bun run typecheck`
- `bun run lint`
- `bun run test`
- `bun run test:contracts`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:migrations`
- `bun run docs:check`

## Current Truth And Recommended Next

### Current truth

- Exports 7 governed actions: `projects.projects.create`, `projects.milestones.complete`, `projects.billing.request`, `projects.projects.hold`, `projects.projects.release`, `projects.projects.amend`, `projects.projects.reverse`.
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

### Current gaps

- No extra gaps were discovered beyond the plugin’s declared boundaries.

### Recommended next

- Deepen budget, change, and timesheet-aware delivery flows before project-backed billing becomes production critical.
- Add stronger portfolio and commitment views where multi-project delivery coordination matters.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `Project`, `Task`, `Timesheet`.

### Later / optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
