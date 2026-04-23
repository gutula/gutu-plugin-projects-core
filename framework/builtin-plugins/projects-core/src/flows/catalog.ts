import {
  advancePrimaryRecord,
  amendPrimaryRecord,
  createPrimaryRecord,
  placePrimaryRecordOnHold,
  reconcilePrimaryRecord,
  releasePrimaryRecordHold,
  reversePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type AmendPrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type PlacePrimaryRecordOnHoldInput,
  type ReconcilePrimaryRecordInput,
  type ReleasePrimaryRecordHoldInput,
  type ReversePrimaryRecordInput
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
  },
  {
    "id": "projects.projects.hold",
    "label": "Place Record On Hold",
    "phase": "hold",
    "methodName": "placeRecordOnHold"
  },
  {
    "id": "projects.projects.release",
    "label": "Release Record Hold",
    "phase": "release",
    "methodName": "releaseRecordHold"
  },
  {
    "id": "projects.projects.amend",
    "label": "Amend Record",
    "phase": "amend",
    "methodName": "amendRecord"
  },
  {
    "id": "projects.projects.reverse",
    "label": "Reverse Record",
    "phase": "reverse",
    "methodName": "reverseRecord"
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

export async function placeRecordOnHold(input: PlacePrimaryRecordOnHoldInput) {
  return placePrimaryRecordOnHold(input);
}

export async function releaseRecordHold(input: ReleasePrimaryRecordHoldInput) {
  return releasePrimaryRecordHold(input);
}

export async function amendRecord(input: AmendPrimaryRecordInput) {
  return amendPrimaryRecord(input);
}

export async function reverseRecord(input: ReversePrimaryRecordInput) {
  return reversePrimaryRecord(input);
}
