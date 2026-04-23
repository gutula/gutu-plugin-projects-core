import { defineResource } from "@platform/schema";

import {
  primaryRecordsTable,
  secondaryRecordsTable,
  exceptionRecordsTable
} from "../../db/schema";
import { exceptionRecordSchema, primaryRecordSchema, secondaryRecordSchema } from "../model";

export const BusinessPrimaryResource = defineResource({
  id: "projects.projects",
  description: "Project headers, budgets, and delivery lifecycle state.",
  businessPurpose: "Own execution truth for project-backed delivery without borrowing order or ledger ownership.",
  table: primaryRecordsTable,
  contract: primaryRecordSchema,
  fields: {
    title: { searchable: true, sortable: true, label: "Title" },
    recordState: { filter: "select", label: "Record State" },
    approvalState: { filter: "select", label: "Approval" },
    postingState: { filter: "select", label: "Posting" },
    fulfillmentState: { filter: "select", label: "Fulfillment" },
    updatedAt: { sortable: true, label: "Updated" }
  },
  admin: {
    autoCrud: true,
    defaultColumns: ["title", "recordState", "approvalState", "postingState", "fulfillmentState", "updatedAt"]
  },
  portal: { enabled: false }
});

export const BusinessSecondaryResource = defineResource({
  id: "projects.milestones",
  description: "Milestones, progress gates, and completion state.",
  businessPurpose: "Track project execution and completion posture as a distinct operational truth.",
  table: secondaryRecordsTable,
  contract: secondaryRecordSchema,
  fields: {
    label: { searchable: true, sortable: true, label: "Label" },
    status: { filter: "select", label: "Status" },
    requestedAction: { searchable: true, sortable: true, label: "Requested Action" },
    updatedAt: { sortable: true, label: "Updated" }
  },
  admin: {
    autoCrud: true,
    defaultColumns: ["label", "status", "requestedAction", "updatedAt"]
  },
  portal: { enabled: false }
});

export const BusinessExceptionResource = defineResource({
  id: "projects.billing-requests",
  description: "Billing readiness and milestone-billing request records.",
  businessPurpose: "Request downstream invoicing without letting project execution mutate finance directly.",
  table: exceptionRecordsTable,
  contract: exceptionRecordSchema,
  fields: {
    severity: { filter: "select", label: "Severity" },
    status: { filter: "select", label: "Status" },
    reasonCode: { searchable: true, sortable: true, label: "Reason" },
    updatedAt: { sortable: true, label: "Updated" }
  },
  admin: {
    autoCrud: true,
    defaultColumns: ["severity", "status", "reasonCode", "updatedAt"]
  },
  portal: { enabled: false }
});

export const businessResources = [
  BusinessPrimaryResource,
  BusinessSecondaryResource,
  BusinessExceptionResource
] as const;
