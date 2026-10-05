import { AWC_PREFLIGHT_FAILURE_COPY } from "@/features/preflight/awcPreflightFailureCopy.constant";

export const AwcPreflightFixOnMacHint = ({
  show,
}: {
  readonly show: boolean;
}) =>
  show ? (
    <p className="mt-3 text-xs opacity-80">
      <span className="font-medium">
        {AWC_PREFLIGHT_FAILURE_COPY.fixOnMac}.
      </span>{" "}
      {AWC_PREFLIGHT_FAILURE_COPY.fixOnMacHint}
    </p>
  ) : null;

export const AwcPreflightFailureErroredBody = ({
  safeMessage,
  showFixOnMacHint,
}: {
  readonly safeMessage: string;
  readonly showFixOnMacHint: boolean;
}) => (
  <>
    <p>
      <strong>{AWC_PREFLIGHT_FAILURE_COPY.erroredPrefix}</strong> {safeMessage}
    </p>
    <AwcPreflightFixOnMacHint show={showFixOnMacHint} />
  </>
);
