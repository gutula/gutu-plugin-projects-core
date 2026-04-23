export const domainCatalog = {
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
} as const;
