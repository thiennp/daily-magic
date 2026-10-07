/**
 * Package / plan counts — aggregate Neon meta capacity hints for Tasks list
 * (SPEC §6.1 / CLAUDE-BRIEF). Counts only; never bodies.
 * Interim: COUNT(agent_runs) for the project vs soft plan task caps.
 */

import { asRowArray, getSql } from "@/lib/db";
import { loadBillingPlanForUser } from "@/lib/billing/loadBillingPlanForUser";
import type { BillingPlan } from "@/lib/billing/types/BillingPlan.type";

/**
 * Soft interim task-record caps by plan (EN PASS "N of M tasks this plan").
 * Not billing SoT — capacity hint only until Product locks numbers.
 */
export const PROJECT_TASK_PLAN_MAX_BY_PLAN = {
  trial: 50,
  pro: 200,
  team: 500,
  admin_free: 200,
} as const satisfies Record<BillingPlan, number>;

export type ProjectTaskPlanCounts = {
  readonly projectId: string;
  readonly plan: BillingPlan;
  readonly used: number;
  readonly max: number;
  /** Quiet capacity hint string for list UI. */
  readonly hint: string;
};

export const resolveProjectTaskPlanMax = (plan: BillingPlan): number =>
  PROJECT_TASK_PLAN_MAX_BY_PLAN[plan];

export const formatProjectTaskPlanHint = (input: {
  readonly used: number;
  readonly max: number;
}): string => `${input.used} of ${input.max} tasks this plan`;

/**
 * Aggregate task meta count from interim agent_runs for one project.
 */
export const countProjectTaskNeonMeta = async (input: {
  readonly projectId: string;
}): Promise<number> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS used
      FROM agent_runs
      WHERE project_id = ${input.projectId}
    `,
  );
  const used = Number(rows[0]?.used ?? 0);
  return Number.isFinite(used) ? used : 0;
};

/**
 * Load plan + used count for Tasks list capacity hint.
 */
export const loadProjectTaskPlanCounts = async (input: {
  readonly projectId: string;
  readonly ownerUserId: string;
}): Promise<ProjectTaskPlanCounts> => {
  const [planRow, used] = await Promise.all([
    loadBillingPlanForUser(input.ownerUserId),
    countProjectTaskNeonMeta({ projectId: input.projectId }),
  ]);
  const plan = planRow.plan;
  const max = resolveProjectTaskPlanMax(plan);
  return {
    projectId: input.projectId,
    plan,
    used,
    max,
    hint: formatProjectTaskPlanHint({ used, max }),
  };
};
