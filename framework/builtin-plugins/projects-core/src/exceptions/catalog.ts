export const exceptionQueueDefinitions = [
  {
    "id": "budget-overrun-review",
    "label": "Budget Overrun Review",
    "severity": "medium",
    "owner": "project-manager",
    "reconciliationJobId": "projects.reconciliation.run"
  },
  {
    "id": "timesheet-approval-backlog",
    "label": "Timesheet Approval Backlog",
    "severity": "medium",
    "owner": "project-manager",
    "reconciliationJobId": "projects.reconciliation.run"
  },
  {
    "id": "change-request-certification",
    "label": "Change Request Certification",
    "severity": "medium",
    "owner": "project-manager",
    "reconciliationJobId": "projects.reconciliation.run"
  }
] as const;
