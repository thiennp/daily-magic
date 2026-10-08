import { linearGraphql } from "@/lib/projects/taskSync/linearGraphql";

export const createLinearWebhook = async (input: {
  readonly token: string;
  readonly url: string;
  readonly teamId: string;
  readonly secret: string;
}): Promise<string> => {
  const data = await linearGraphql<{
    webhookCreate: { success: boolean; webhook: { id: string } | null };
  }>(
    input.token,
    `mutation($input: WebhookCreateInput!) {
       webhookCreate(input: $input) { success webhook { id } } }`,
    {
      input: {
        url: input.url,
        teamId: input.teamId,
        resourceTypes: ["Issue"],
        secret: input.secret,
      },
    },
  );
  const id = data.webhookCreate.webhook?.id;
  if (!data.webhookCreate.success || id === undefined) {
    throw new Error("linear_webhook_create_failed");
  }
  return id;
};

export const deleteLinearWebhook = async (
  token: string,
  webhookId: string,
): Promise<void> => {
  await linearGraphql(
    token,
    `mutation($id: String!) { webhookDelete(id: $id) { success } }`,
    { id: webhookId },
  );
};
