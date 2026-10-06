import type { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  DEVICE_VERIFY_COPY,
  deviceVerifyMessageForErrorCode,
} from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";
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
  // Prefer ?code= (Product); keep ?user_code= for verification_uri_complete.
  const rawCode =
    readParam(params, "code").trim() ||
    readParam(params, "user_code").trim();
  const normalized = normalizeUserCode(rawCode);
  const userCodeDisplay =
    normalized.length === 8
      ? formatUserCodeDisplay(normalized)
      : rawCode.length > 0
        ? rawCode
        : "";
  const done = readParam(params, "done");
  const errorCode = readParam(params, "error");

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

  const statusMessage = (() => {
    if (done === "confirmed") {
      return DEVICE_VERIFY_COPY.confirmed;
    }
    if (done === "denied") {
      return DEVICE_VERIFY_COPY.denied;
    }
    if (errorCode.length > 0) {
      return deviceVerifyMessageForErrorCode(errorCode);
    }
    if (requestRow?.status === "expired") {
      return DEVICE_VERIFY_COPY.expired;
    }
    if (normalized.length === 8 && requestRow === null) {
      return DEVICE_VERIFY_COPY.notFound;
    }
    if (
      requestRow?.status === "approved" ||
      requestRow?.status === "denied" ||
      requestRow?.status === "consumed"
    ) {
      return DEVICE_VERIFY_COPY.alreadyDecided;
    }
    return null;
  })();

  const canDecide = requestRow !== null && requestRow.status === "pending";
  const codeForForms =
    requestRow?.userCodeDisplay ?? userCodeDisplay;

  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-4 py-12 text-gray-900 dark:text-white">
      <h1 className="text-xl font-semibold">{DEVICE_VERIFY_COPY.title}</h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        {DEVICE_VERIFY_COPY.sub}
      </p>

      {requestRow !== null ? (
        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">
              {DEVICE_VERIFY_COPY.clientLabel}
            </dt>
            <dd className="font-medium">{assistantName}</dd>
          </div>
        </dl>
      ) : null}

      {/* Code input — always available; prefilled from ?code= / ?user_code= */}
      <form method="GET" action="/device/verify" className="mt-6 space-y-2">
        <label className="block text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {DEVICE_VERIFY_COPY.codeLabel}
          </span>
          <input
            type="text"
            name="code"
            defaultValue={codeForForms}
            autoComplete="off"
            spellCheck={false}
            placeholder="XXXX-XXXX"
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-lg tracking-wider dark:border-gray-700 dark:bg-gray-950"
          />
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {DEVICE_VERIFY_COPY.codeHelper}
        </p>
        {!canDecide ? (
          <button
            type="submit"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900"
          >
            {DEVICE_VERIFY_COPY.codeLabel}
          </button>
        ) : null}
      </form>

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
            <input type="hidden" name="user_code" value={codeForForms} />
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
            <input type="hidden" name="user_code" value={codeForForms} />
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
