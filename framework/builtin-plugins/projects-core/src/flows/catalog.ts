import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type ReconcilePrimaryRecordInput
} from "../services/main.service";

export const businessFlowDefinitions = [
  {
    "id": "projects.projects.create",
    "label": "Create Project",
    "phase": "create",
    "methodName": "createProject"
  },
  {
    "id": "projects.milestones.complete",
    "label": "Complete Milestone",
    "phase": "advance",
    "methodName": "completeMilestone"
  },
  {
    "id": "projects.billing.request",
    "label": "Request Project Billing",
    "phase": "reconcile",
    "methodName": "requestProjectBilling"
  }
] as const;

export async function createProject(input: CreatePrimaryRecordInput) {
  return createPrimaryRecord(input);
}

export async function completeMilestone(input: AdvancePrimaryRecordInput) {
  return advancePrimaryRecord(input);
}

export async function requestProjectBilling(input: ReconcilePrimaryRecordInput) {
  return reconcilePrimaryRecord(input);
}
