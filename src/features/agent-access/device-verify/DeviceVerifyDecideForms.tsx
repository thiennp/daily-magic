import { DEVICE_VERIFY_COPY } from "@/features/agent-access/device-verify/deviceVerifyCopy.constant";
import AwcTermsLinksSentence from "@/features/agent-access/terms/AwcTermsLinksSentence";

type DeviceVerifyDecideFormsProps = {
  readonly codeForForms: string;
};

/** Confirm / Deny forms plus the linked Terms notice on /device/verify. */
export default function DeviceVerifyDecideForms({
  codeForForms,
}: DeviceVerifyDecideFormsProps) {
  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <form
          method="POST"
          action="/api/agent-access/oauth/device/confirm"
          className="w-full sm:w-auto"
        >
          <input type="hidden" name="user_code" value={codeForForms} />
          <button
            type="submit"
            className="min-h-11 w-full rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            {DEVICE_VERIFY_COPY.confirm}
          </button>
        </form>
        <form
          method="POST"
          action="/api/agent-access/oauth/device/deny"
          className="w-full sm:w-auto"
        >
          <input type="hidden" name="user_code" value={codeForForms} />
          <button
            type="submit"
            className="min-h-11 w-full rounded-md border border-awc-border-strong px-4 py-2 text-sm font-medium text-awc-fg hover:bg-awc-surface-2 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-900"
          >
            {DEVICE_VERIFY_COPY.deny}
          </button>
        </form>
      </div>
      <p className="mt-4 text-xs text-awc-fg-muted dark:text-gray-400">
        <AwcTermsLinksSentence
          prefix={DEVICE_VERIFY_COPY.termsNoticePrefix}
          suffix={DEVICE_VERIFY_COPY.termsNoticeSuffix}
        />
      </p>
    </>
  );
}
