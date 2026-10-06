import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { DEVICE_VERIFY_COPY } from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";
import { loadDeviceRequestByUserCode } from "@/lib/agentAccess/deviceCode/loadDeviceRequestByUserCode";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";
import { auth } from "@/lib/auth/auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Approve assistant | ${AGENT_WITCH_PRODUCT_NAME}`,
  robots: { index: false, follow: false },
};

type PageProps = {
  readonly searchParams: Promise<
    Record<string, string | string[] | undefined>
  >;
};

const readParam = (
  raw: Record<string, string | string[] | undefined>,
  key: string,
): string => {
  const value = raw[key];
  if (typeof value === "string") {
    return value;
  }
  if (Array.isArray(value) && value[0] !== undefined) {
    return value[0];
  }
  return "";
};

export default async function DeviceVerifyPage({ searchParams }: PageProps) {
  const session = await auth();
  const params = await searchParams;
  const userCode = readParam(params, "user_code").trim();
  const done = readParam(params, "done");
  const errorCode = readParam(params, "error");

  if (!session?.user?.id) {
    const callback = `/device/verify${userCode.length > 0 ? `?user_code=${encodeURIComponent(userCode)}` : ""}`;
    redirect(`/login?callbackUrl=${encodeURIComponent(callback)}`);
  }

  const requestRow =
    userCode.length > 0
      ? await loadDeviceRequestByUserCode({ userCode })
      : null;

  const assistantName =
    requestRow?.displayName ??
    requestRow?.clientName ??
    DEVICE_VERIFY_COPY.clientFallback;

  const statusMessage = (() => {
    if (done === "confirmed") {
      return DEVICE_VERIFY_COPY.confirmed;
    }
    if (done === "denied") {
      return DEVICE_VERIFY_COPY.denied;
    }
    if (errorCode === "expired" || requestRow?.status === "expired") {
      return DEVICE_VERIFY_COPY.expired;
    }
    if (
      errorCode === "invalid_code" ||
      (userCode.length > 0 && requestRow === null)
    ) {
      return DEVICE_VERIFY_COPY.notFound;
    }
    if (
      errorCode === "already_decided" ||
      requestRow?.status === "approved" ||
      requestRow?.status === "denied" ||
      requestRow?.status === "consumed"
    ) {
      return DEVICE_VERIFY_COPY.alreadyDecided;
    }
    return null;
  })();

  const canDecide = requestRow !== null && requestRow.status === "pending";

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-4 py-12 text-gray-900 dark:text-white">
      <h1 className="text-xl font-semibold">{DEVICE_VERIFY_COPY.title}</h1>
      <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">
        {DEVICE_VERIFY_COPY.ownerLine}
      </p>

      {userCode.length === 0 ? (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Open the link from your assistant, or enter the code it showed you.
        </p>
      ) : (
        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">
              {DEVICE_VERIFY_COPY.clientLabel}
            </dt>
            <dd className="font-medium">{assistantName}</dd>
          </div>
          <div>
            <dt className="text-gray-500 dark:text-gray-400">
              {DEVICE_VERIFY_COPY.codeLabel}
            </dt>
            <dd className="font-mono text-lg tracking-wider">
              {requestRow?.userCodeDisplay ?? userCode}
            </dd>
          </div>
        </dl>
      )}

      {statusMessage !== null ? (
        <p className="mt-6 text-sm text-gray-700 dark:text-gray-300">
          {statusMessage}
        </p>
      ) : null}

      {canDecide ? (
        <div className="mt-8 flex gap-3">
          <form
            method="POST"
            action="/api/agent-access/oauth/device/confirm"
            className="inline"
          >
            <input type="hidden" name="user_code" value={userCode} />
            <button
              type="submit"
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
            >
              {DEVICE_VERIFY_COPY.confirm}
            </button>
          </form>
          <form
            method="POST"
            action="/api/agent-access/oauth/device/deny"
            className="inline"
          >
            <input type="hidden" name="user_code" value={userCode} />
            <button
              type="submit"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900"
            >
              {DEVICE_VERIFY_COPY.deny}
            </button>
          </form>
        </div>
      ) : null}
    </main>
  );
}
