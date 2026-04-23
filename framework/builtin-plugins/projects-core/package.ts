import { definePackage } from "@platform/kernel";

export default definePackage({
  "id": "projects-core",
  "kind": "plugin",
  "version": "0.1.0",
  "contractVersion": "1.0.0",
  "sourceRepo": "gutu-plugin-projects-core",
  "displayName": "Projects Core",
  "domainGroup": "Operational Data",
  "defaultCategory": {
    "id": "business",
    "label": "Business",
    "subcategoryId": "projects_delivery",
    "subcategoryLabel": "Projects & Delivery"
  },
  "description": "Project plans, milestones, budget posture, execution visibility, and project-driven billing readiness for delivery-centric work.",
  "extends": [],
  "dependsOn": [
    "auth-core",
    "org-tenant-core",
    "role-policy-core",
    "audit-core",
    "workflow-core",
    "traceability-core",
    "party-relationships-core"
  ],
  "dependencyContracts": [
    {
      "packageId": "auth-core",
      "class": "required",
      "rationale": "Required for Projects Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "org-tenant-core",
      "class": "required",
      "rationale": "Required for Projects Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "role-policy-core",
      "class": "required",
      "rationale": "Required for Projects Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "audit-core",
      "class": "required",
      "rationale": "Required for Projects Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "workflow-core",
      "class": "required",
      "rationale": "Required for Projects Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "traceability-core",
      "class": "required",
      "rationale": "Required for Projects Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "party-relationships-core",
      "class": "required",
      "rationale": "Required for Projects Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "sales-core",
      "class": "optional",
      "rationale": "Recommended with Projects Core for smoother production adoption and operator experience."
    },
    {
      "packageId": "accounting-core",
      "class": "optional",
      "rationale": "Recommended with Projects Core for smoother production adoption and operator experience."
    },
    {
      "packageId": "procurement-core",
      "class": "capability-enhancing",
      "rationale": "Improves Projects Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "support-service-core",
      "class": "capability-enhancing",
      "rationale": "Improves Projects Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "hr-payroll-core",
      "class": "capability-enhancing",
      "rationale": "Improves Projects Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "contracts-core",
      "class": "capability-enhancing",
      "rationale": "Improves Projects Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "business-portals-core",
      "class": "integration-only",
      "rationale": "Only needed when Projects Core must exchange data or actions with adjacent or external surfaces."
    }
  ],
  "recommendedPlugins": [
    "sales-core",
    "accounting-core"
  ],
  "capabilityEnhancingPlugins": [
    "procurement-core",
    "support-service-core",
    "hr-payroll-core",
    "contracts-core"
  ],
  "integrationOnlyPlugins": [
    "business-portals-core"
  ],
  "suggestedPacks": [
    "sector-education",
    "sector-epc-professional-delivery",
    "sector-nonprofit",
    "sector-professional-services"
  ],
  "standaloneSupported": true,
  "installNotes": [
    "Standalone-safe for internal delivery teams; add Sales and Accounting for commercialized project-to-bill flows."
  ],
  "optionalWith": [
    "sales-core",
    "accounting-core"
  ],
  "conflictsWith": [],
  "providesCapabilities": [
    "projects.projects",
    "projects.milestones",
    "projects.billing-requests"
  ],
  "requestedCapabilities": [
    "ui.register.admin",
    "api.rest.mount",
    "data.write.projects",
    "events.publish.projects"
  ],
  "ownsData": [
    "projects.projects",
    "projects.tasks",
    "projects.milestones",
    "projects.billing-requests"
  ],
  "extendsData": [],
  "publicCommands": [
    "projects.projects.create",
    "projects.milestones.complete",
    "projects.billing.request",
    "projects.projects.hold",
    "projects.projects.release",
    "projects.projects.amend",
    "projects.projects.reverse"
  ],
  "publicQueries": [
    "projects.delivery-summary",
    "projects.budget-summary"
  ],
  "publicEvents": [
    "projects.project-created.v1",
    "projects.milestone-completed.v1",
    "projects.billing-requested.v1"
  ],
  "domainCatalog": {
    "erpnextModules": [
      "Projects"
    ],
    "erpnextDoctypes": [
      "Project",
      "Task",
      "Timesheet",
      "Activity Cost",
      "Project Update",
      "Project Template"
    ],
    "ownedEntities": [
      "Project",
      "Task",
      "Milestone",
      "Timesheet",
      "Budget",
      "Change Request",
      "Billing Rule"
    ],
    "reports": [
      "Project Wise Stock Tracking",
      "Daily Timesheet Summary",
      "Project Budget Burn",
      "Milestone Billing Status"
    ],
    "exceptionQueues": [
      "budget-overrun-review",
      "timesheet-approval-backlog",
      "change-request-certification"
    ],
    "operationalScenarios": [
      "project-setup",
      "time-and-expense-capture",
      "milestone-billing-request",
      "change-order-governance"
    ],
    "settingsSurfaces": [
      "Projects Settings",
      "Activity Cost",
      "Project Template"
    ],
    "edgeCases": [
      "hard-stop budget policy",
      "retention billing",
      "reopened projects after closure",
      "unapproved timesheet billing"
    ]
  },
  "slotClaims": [],
  "trustTier": "first-party",
  "reviewTier": "R1",
  "isolationProfile": "same-process-trusted",
  "compatibility": {
    "framework": "^0.1.0",
    "runtime": "bun>=1.3.12",
    "db": [
      "postgres",
      "sqlite"
    ]
  }
});
