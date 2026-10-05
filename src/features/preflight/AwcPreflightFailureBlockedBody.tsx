import { AwcPreflightFixOnMacHint } from "@/features/preflight/AwcPreflightFailureHints";
import { AWC_PREFLIGHT_FAILURE_COPY } from "@/features/preflight/awcPreflightFailureCopy.constant";
import type { PreflightFailurePresentation } from "@agent-witch/shared/preflight";

interface AwcPreflightFailureBlockedBodyProps {
  readonly presentation: PreflightFailurePresentation;
  readonly showFixOnMacHint: boolean;
  readonly soft?: boolean;
}

export const AwcPreflightFailureBlockedBody = ({
  presentation,
  showFixOnMacHint,
  soft = false,
}: AwcPreflightFailureBlockedBodyProps) => {
  const { primary, warnNotes } = presentation;
  return (
    <>
      <p className="font-medium">
        {soft
          ? AWC_PREFLIGHT_FAILURE_COPY.warnTitle
          : AWC_PREFLIGHT_FAILURE_COPY.title}
      </p>
      {primary.fromPitfall ? (
        <p className="mt-1 text-xs opacity-80">
          {AWC_PREFLIGHT_FAILURE_COPY.fromPitfall}
        </p>
      ) : null}
      <dl className="mt-2 space-y-1">
        <div>
          <dt className="inline font-medium">
            {AWC_PREFLIGHT_FAILURE_COPY.reasonLabel}:{" "}
          </dt>
          <dd className="inline">{primary.reason}</dd>
        </div>
        <div>
          <dt className="inline font-medium">
            {AWC_PREFLIGHT_FAILURE_COPY.checkLabel}:{" "}
          </dt>
          <dd className="inline font-mono text-xs">{primary.check}</dd>
        </div>
        <div>
          <dt className="inline font-medium">
            {AWC_PREFLIGHT_FAILURE_COPY.fixLabel}:{" "}
          </dt>
          <dd className="inline">{primary.fix}</dd>
        </div>
      </dl>
      {primary.evidenceLines.length > 0 ? (
        <details className="mt-2">
          <summary className="cursor-pointer text-xs font-medium">
            {AWC_PREFLIGHT_FAILURE_COPY.detailsSummary}
          </summary>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 font-mono text-xs">
            {primary.evidenceLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </details>
      ) : null}
      {warnNotes.length > 0 ? (
        <div className="mt-2 text-xs opacity-90">
          <p className="font-medium">
            {AWC_PREFLIGHT_FAILURE_COPY.warningsLabel}
          </p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5">
            {warnNotes.map((note) => (
              <li key={note.checkId}>
                <span className="font-mono">{note.checkId}</span> —{" "}
                {note.reason}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {soft ? (
        <p className="mt-3 text-xs opacity-80">
          {AWC_PREFLIGHT_FAILURE_COPY.continueHint}
        </p>
      ) : (
        <AwcPreflightFixOnMacHint show={showFixOnMacHint} />
      )}
    </>
  );
};
