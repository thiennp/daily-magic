import { BILLING_API_PATHS } from "@/features/billing/billingApiPaths.constant";

export default async function postAdminSetFree(input: {
  readonly userId: string;
  readonly adminFree: boolean;
}): Promise<void> {
  const response = await fetch(BILLING_API_PATHS.adminSetFree, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const payload = (await response.json()) as { error?: string };
  if (!response.ok) {
    throw new Error(payload.error ?? "Could not update permanent Free.");
  }
}
