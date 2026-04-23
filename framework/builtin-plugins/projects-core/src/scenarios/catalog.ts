export const scenarioDefinitions = [
  {
    "id": "project-setup",
    "owningPlugin": "projects-core",
    "workflowId": "project-delivery-lifecycle",
    "actionIds": [
      "projects.projects.create",
      "projects.milestones.complete",
      "projects.billing.request"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "time-and-expense-capture",
    "owningPlugin": "projects-core",
    "workflowId": "project-delivery-lifecycle",
    "actionIds": [
      "projects.projects.create",
      "projects.milestones.complete",
      "projects.billing.request"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "milestone-billing-request",
    "owningPlugin": "projects-core",
    "workflowId": "project-delivery-lifecycle",
    "actionIds": [
      "projects.projects.create",
      "projects.milestones.complete",
      "projects.billing.request"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "change-order-governance",
    "owningPlugin": "projects-core",
    "workflowId": "project-delivery-lifecycle",
    "actionIds": [
      "projects.projects.create",
      "projects.milestones.complete",
      "projects.billing.request"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  }
] as const;
