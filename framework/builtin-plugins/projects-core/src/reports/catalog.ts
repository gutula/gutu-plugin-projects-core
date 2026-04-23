export const reportDefinitions = [
  {
    "id": "projects-core.report.01",
    "label": "Project Wise Stock Tracking",
    "owningPlugin": "projects-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "budget-overrun-review",
      "timesheet-approval-backlog",
      "change-request-certification"
    ]
  },
  {
    "id": "projects-core.report.02",
    "label": "Daily Timesheet Summary",
    "owningPlugin": "projects-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "budget-overrun-review",
      "timesheet-approval-backlog",
      "change-request-certification"
    ]
  },
  {
    "id": "projects-core.report.03",
    "label": "Project Budget Burn",
    "owningPlugin": "projects-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "budget-overrun-review",
      "timesheet-approval-backlog",
      "change-request-certification"
    ]
  },
  {
    "id": "projects-core.report.04",
    "label": "Milestone Billing Status",
    "owningPlugin": "projects-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "budget-overrun-review",
      "timesheet-approval-backlog",
      "change-request-certification"
    ]
  }
] as const;
