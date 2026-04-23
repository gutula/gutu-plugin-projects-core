import { defineAction } from "@platform/schema";
import { z } from "zod";

import {
  createPrimaryRecord,
  advancePrimaryRecord,
  reconcilePrimaryRecord,
  placePrimaryRecordOnHold,
  releasePrimaryRecordHold,
  amendPrimaryRecord,
  reversePrimaryRecord
} from "../services/main.service";
import {
  approvalStateSchema,
  fulfillmentStateSchema,
  postingStateSchema,
  recordStateSchema,
  createPrimaryRecordInputSchema,
  advancePrimaryRecordInputSchema,
  reconcilePrimaryRecordInputSchema,
  placePrimaryRecordOnHoldInputSchema,
  releasePrimaryRecordHoldInputSchema,
  amendPrimaryRecordInputSchema,
  reversePrimaryRecordInputSchema
} from "../model";

export const createProjectAction = defineAction({
  id: "projects.projects.create",
  description: "Create Project",
  input: createPrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    recordState: recordStateSchema,
    approvalState: approvalStateSchema,
    postingState: postingStateSchema,
    fulfillmentState: fulfillmentStateSchema,
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "projects.projects.write",
  idempotent: true,
  audit: true,
  handler: ({ input }) => createPrimaryRecord(input)
});

export const completeMilestoneAction = defineAction({
  id: "projects.milestones.complete",
  description: "Complete Milestone",
  input: advancePrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    recordState: recordStateSchema,
    approvalState: approvalStateSchema,
    postingState: postingStateSchema,
    fulfillmentState: fulfillmentStateSchema,
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "projects.milestones.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => advancePrimaryRecord(input)
});

export const requestProjectBillingAction = defineAction({
  id: "projects.billing.request",
  description: "Request Project Billing",
  input: reconcilePrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    exceptionId: z.string(),
    status: z.enum(["open", "under-review", "resolved", "closed"]),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "projects.billing.request",
  idempotent: false,
  audit: true,
  handler: ({ input }) => reconcilePrimaryRecord(input)
});

export const placeRecordOnHoldAction = defineAction({
  id: "projects.projects.hold",
  description: "Place Record On Hold",
  input: placePrimaryRecordOnHoldInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    status: z.enum(["open", "under-review", "resolved", "closed"]),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "projects.projects.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => placePrimaryRecordOnHold(input)
});

export const releaseRecordHoldAction = defineAction({
  id: "projects.projects.release",
  description: "Release Record Hold",
  input: releasePrimaryRecordHoldInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    status: z.enum(["open", "under-review", "resolved", "closed"]),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "projects.projects.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => releasePrimaryRecordHold(input)
});

export const amendRecordAction = defineAction({
  id: "projects.projects.amend",
  description: "Amend Record",
  input: amendPrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    amendedRecordId: z.string(),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "projects.projects.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => amendPrimaryRecord(input)
});

export const reverseRecordAction = defineAction({
  id: "projects.projects.reverse",
  description: "Reverse Record",
  input: reversePrimaryRecordInputSchema,
  output: z.object({
    ok: z.literal(true),
    recordId: z.string(),
    reversalRecordId: z.string(),
    revisionNo: z.number().int().positive(),
    eventIds: z.array(z.string()),
    jobIds: z.array(z.string())
  }),
  permission: "projects.projects.write",
  idempotent: false,
  audit: true,
  handler: ({ input }) => reversePrimaryRecord(input)
});

export const businessActions = [
  createProjectAction,
  completeMilestoneAction,
  requestProjectBillingAction,
  placeRecordOnHoldAction,
  releaseRecordHoldAction,
  amendRecordAction,
  reverseRecordAction
] as const;
