import { DEVICE_VERIFY_COPY } from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";

type DeviceVerifyPageViewProps = {
  readonly assistantName: string;
  readonly canDecide: boolean;
  readonly codeForForms: string;
  readonly showClient: boolean;
  readonly statusMessage: string | null;
};

export default function DeviceVerifyPageView({
  assistantName,
  canDecide,
  codeForForms,
  showClient,
  statusMessage,
}: DeviceVerifyPageViewProps) {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-4 py-12 text-gray-900 dark:text-white">
      <h1 className="text-xl font-semibold">{DEVICE_VERIFY_COPY.title}</h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        {DEVICE_VERIFY_COPY.sub}
      </p>

      {showClient ? (
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
