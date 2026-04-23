import { defineAction } from "@platform/schema";
import { z } from "zod";

import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord
} from "../services/main.service";
import {
  advancePrimaryRecordInputSchema,
  createPrimaryRecordInputSchema,
  reconcilePrimaryRecordInputSchema,
  approvalStateSchema,
  fulfillmentStateSchema,
  postingStateSchema,
  recordStateSchema
} from "../model";

export const createPrimaryRecordAction = defineAction({
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

export const advancePrimaryRecordAction = defineAction({
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

export const reconcilePrimaryRecordAction = defineAction({
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

export const businessActions = [
  createPrimaryRecordAction,
  advancePrimaryRecordAction,
  reconcilePrimaryRecordAction
] as const;
