import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { buildAssistantOwnerLoginPath } from "@/features/agent-access/buildAssistantOwnerLoginPath";
import DeviceVerifyPageView from "@/features/agent-access/device-verify/DeviceVerifyPageView";
import { DEVICE_VERIFY_COPY } from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";
import { readDeviceVerifySearchParam } from "@/features/agent-access/device-verify/readDeviceVerifySearchParam";
import { resolveDeviceVerifyView } from "@/features/agent-access/device-verify/resolveDeviceVerifyView";
import { consumeDeviceVerifyLookup } from "@/lib/agentAccess/deviceCode/consumeDeviceVerifyLookup";
import {
  formatUserCodeDisplay,
  normalizeUserCode,
} from "@/lib/agentAccess/deviceCode/hashDeviceCodes";
import { loadDeviceRequestByUserCode } from "@/lib/agentAccess/deviceCode/loadDeviceRequestByUserCode";
import { auth } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: DEVICE_VERIFY_COPY.pageTitle,
  robots: { index: false, follow: false },
};

type PageProps = {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DeviceVerifyPage({ searchParams }: PageProps) {
  const session = await auth();
  const params = await searchParams;
  // Prefer ?code= (Product); keep ?user_code= for verification_uri_complete.
  const rawCode =
    readDeviceVerifySearchParam(params, "code").trim() ||
    readDeviceVerifySearchParam(params, "user_code").trim();
  const normalized = normalizeUserCode(rawCode);
  const userCodeDisplay =
    normalized.length === 8
      ? formatUserCodeDisplay(normalized)
      : rawCode.length > 0
        ? rawCode
        : "";
  const done = readDeviceVerifySearchParam(params, "done");
  const errorCode = readDeviceVerifySearchParam(params, "error");

  const viewerUserId = session?.user?.id;
  if (!viewerUserId) {
    const q =
      userCodeDisplay.length > 0
        ? `?code=${encodeURIComponent(userCodeDisplay)}`
        : "";
    const callback = `/device/verify${q}`;
    redirect(buildAssistantOwnerLoginPath(callback));
  }

  // Each well-formed lookup counts toward a per-person hourly cap (S4).
  const rateLimited =
    normalized.length === 8 && !(await consumeDeviceVerifyLookup(viewerUserId));
  const requestRow =
    normalized.length === 8 && !rateLimited
      ? await loadDeviceRequestByUserCode({ userCode: normalized })
      : null;

  const assistantName =
    requestRow?.displayName ??
    requestRow?.clientName ??
    DEVICE_VERIFY_COPY.clientFallback;

  const view = resolveDeviceVerifyView({
    done,
    errorCode,
    rawCode,
    row: requestRow,
    viewerUserId,
    rateLimited,
  });
  const codeForForms = requestRow?.userCodeDisplay ?? userCodeDisplay;

  return (
    <DeviceVerifyPageView
      assistantName={assistantName}
      codeForForms={codeForForms}
      showClient={requestRow !== null}
      view={view}
    />
  );
}
