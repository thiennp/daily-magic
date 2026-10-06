/**
 * Test-only client for the invite → wake owner flow. Import from a test that
 * vi.mocks the DB/auth modules (see route.wakeLinkFlow.test.ts).
 */
import { PUT } from "@/app/api/projects/[projectId]/access/members/[membershipId]/grok-webhook/route";
import { GET } from "@/app/api/projects/[projectId]/access/route";
import { executeGetMyProjectWebhookStatusTool } from "@/lib/agentAccess/executeGetMyProjectWebhookStatusTool";
import { WAKE_FLOW } from "@/lib/projects/acl/webhooks/wakeLinkFlow.fixtures";

export type WakeFlowSnapshot = {
  readonly members: readonly {
    readonly id: string;
    readonly isAgent: boolean;
    readonly wakeLinkSet?: boolean;
  }[];
};

/** Owner (or seat) GET /api/projects/:id/access. */
export const wakeFlowAccessSnapshot = async (): Promise<WakeFlowSnapshot> => {
  const response = await GET(new Request("http://local/access"), {
    params: Promise.resolve({ projectId: WAKE_FLOW.projectId }),
  });
  return (await response.json()) as WakeFlowSnapshot;
};

/** Owner pastes in the member's Grok wake link form (owner PUT). */
export const wakeFlowOwnerPaste = (webhookUrl: string, webhookKey: string) =>
  PUT(
    new Request("http://local/x", {
      method: "PUT",
      body: JSON.stringify({ webhookUrl, webhookKey }),
    }),
    {
      params: Promise.resolve({
        projectId: WAKE_FLOW.projectId,
        membershipId: WAKE_FLOW.membershipId,
      }),
    },
  );

/** Bot-side get_my_project_webhook_status as JSON text. */
export const wakeFlowBotStatus = async (): Promise<string> =>
  JSON.stringify(
    await executeGetMyProjectWebhookStatusTool({
      actor: { id: WAKE_FLOW.botUserId } as never,
      args: { projectId: WAKE_FLOW.projectId },
    }),
  );
