import { AWC_PREFLIGHT_FAILURE_COPY } from "@/features/preflight/awcPreflightFailureCopy.constant";
import type { PreflightFailureFacts } from "@agent-witch/shared/preflight";

interface AwcPreflightFailureBlockedBodyProps {
  readonly facts: PreflightFailureFacts;
  readonly showFixOnMacHint: boolean;
}

const FixOnMacHint = ({ show }: { readonly show: boolean }) =>
  show ? (
    <p className="mt-3 text-xs text-red-800/80 dark:text-red-200/80">
      <span className="font-medium">
        {AWC_PREFLIGHT_FAILURE_COPY.fixOnMac}.
      </span>{" "}
      {AWC_PREFLIGHT_FAILURE_COPY.fixOnMacHint}
    </p>
  ) : null;

export const AwcPreflightFailureBlockedBody = ({
  facts,
  showFixOnMacHint,
}: AwcPreflightFailureBlockedBodyProps) => (
  <>
    <p className="font-medium">{AWC_PREFLIGHT_FAILURE_COPY.title}</p>
    <dl className="mt-2 space-y-1">
      <div>
        <dt className="inline font-medium">
          {AWC_PREFLIGHT_FAILURE_COPY.reasonLabel}:{" "}
        </dt>
        <dd className="inline">{facts.reason}</dd>
      </div>
      <div>
        <dt className="inline font-medium">
          {AWC_PREFLIGHT_FAILURE_COPY.checkLabel}:{" "}
        </dt>
        <dd className="inline font-mono text-xs">{facts.check}</dd>
      </div>
      <div>
        <dt className="inline font-medium">
          {AWC_PREFLIGHT_FAILURE_COPY.fixLabel}:{" "}
        </dt>
        <dd className="inline">{facts.fix}</dd>
      </div>
    </dl>
    {facts.evidenceLines.length > 0 ? (
      <details className="mt-2">
        <summary className="cursor-pointer text-xs font-medium">
          {AWC_PREFLIGHT_FAILURE_COPY.detailsSummary}
        </summary>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 font-mono text-xs">
          {facts.evidenceLines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </details>
    ) : null}
    <FixOnMacHint show={showFixOnMacHint} />
  </>
);

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
    <FixOnMacHint show={showFixOnMacHint} />
  </>
);
