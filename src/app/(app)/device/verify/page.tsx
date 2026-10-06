import type { Metadata } from "next";
import { redirect } from "next/navigation";

import DeviceVerifyPageView from "@/features/agent-access/device-verify/DeviceVerifyPageView";
import { DEVICE_VERIFY_COPY } from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";
import { readDeviceVerifySearchParam } from "@/features/agent-access/device-verify/readDeviceVerifySearchParam";
import { resolveDeviceVerifyStatusMessage } from "@/features/agent-access/device-verify/resolveDeviceVerifyStatusMessage";
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
  readonly searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
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

  if (!session?.user?.id) {
    const q =
      userCodeDisplay.length > 0
        ? `?code=${encodeURIComponent(userCodeDisplay)}`
        : "";
    const callback = `/device/verify${q}`;
    // Soft: loginRequired is the human reason for this redirect.
    redirect(
      `/login?callbackUrl=${encodeURIComponent(callback)}&notice=${encodeURIComponent(DEVICE_VERIFY_COPY.loginRequired)}`,
    );
  }

  const requestRow =
    normalized.length === 8
      ? await loadDeviceRequestByUserCode({ userCode: normalized })
      : null;

  const assistantName =
    requestRow?.displayName ??
    requestRow?.clientName ??
    DEVICE_VERIFY_COPY.clientFallback;

  const statusMessage = resolveDeviceVerifyStatusMessage({
    done,
    errorCode,
    normalizedLength: normalized.length,
    requestRow,
  });

  const canDecide = requestRow !== null && requestRow.status === "pending";
  const codeForForms = requestRow?.userCodeDisplay ?? userCodeDisplay;

  return (
    <DeviceVerifyPageView
      assistantName={assistantName}
      canDecide={canDecide}
      codeForForms={codeForForms}
      showClient={requestRow !== null}
      statusMessage={statusMessage}
    />
  );
}
