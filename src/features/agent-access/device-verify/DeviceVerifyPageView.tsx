import { DEVICE_VERIFY_COPY } from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";
import DeviceVerifyDecideForms from "@/features/agent-access/device-verify/DeviceVerifyDecideForms";
import DeviceVerifyStatus from "@/features/agent-access/device-verify/DeviceVerifyStatus";
import type { DeviceVerifyView } from "@/features/agent-access/device-verify/resolveDeviceVerifyView";

type DeviceVerifyPageViewProps = {
  readonly assistantName: string;
  readonly codeForForms: string;
  readonly showClient: boolean;
  readonly view: DeviceVerifyView;
};

const secondaryButton =
  "min-h-11 w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 sm:w-auto dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900 dark:focus-visible:outline-white";

export default function DeviceVerifyPageView({
  assistantName,
  codeForForms,
  showClient,
  view,
}: DeviceVerifyPageViewProps) {
  const codeInvalid = view.tone === "error" && !view.canDecide;
  return (
    <main className="mx-auto flex min-h-[50vh] w-full max-w-lg flex-col justify-center px-4 py-8 text-gray-900 sm:py-12 dark:text-white">
      <h1 className="text-xl font-semibold">{DEVICE_VERIFY_COPY.title}</h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
        {DEVICE_VERIFY_COPY.sub}
      </p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {DEVICE_VERIFY_COPY.stop}
      </p>

      {showClient ? (
        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="text-gray-500 dark:text-gray-400">
              {DEVICE_VERIFY_COPY.clientLabel}
            </dt>
            <dd className="font-medium break-words">{assistantName}</dd>
          </div>
        </dl>
      ) : null}

      {/* Code input — always available; prefilled from ?code= / ?user_code= */}
      <form method="GET" action="/device/verify" className="mt-6 space-y-2">
        <label
          htmlFor="device-verify-code"
          className="block text-sm text-gray-500 dark:text-gray-400"
        >
          {DEVICE_VERIFY_COPY.codeLabel}
        </label>
        <input
          id="device-verify-code"
          type="text"
          name="code"
          defaultValue={codeForForms}
          autoComplete="one-time-code"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck={false}
          inputMode="text"
          enterKeyHint="go"
          maxLength={9}
          placeholder="XXXX-XXXX"
          aria-describedby="device-verify-code-help"
          aria-invalid={codeInvalid ? true : undefined}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-lg tracking-wider uppercase dark:border-gray-700 dark:bg-gray-950"
        />
        <p
          id="device-verify-code-help"
          className="text-xs text-gray-500 dark:text-gray-400"
        >
          {DEVICE_VERIFY_COPY.codeHelper}
        </p>
        {!view.canDecide ? (
          <button type="submit" className={secondaryButton}>
            {DEVICE_VERIFY_COPY.lookUp}
          </button>
        ) : null}
      </form>

      <DeviceVerifyStatus view={view} />

      {view.canDecide ? (
        <DeviceVerifyDecideForms codeForForms={codeForForms} />
      ) : null}
    </main>
  );
}
