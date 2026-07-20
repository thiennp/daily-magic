interface BuildAgentComposerHrefInput {
  readonly pathname?: string;
  readonly libraryCapabilityId?: string;
  readonly prompt?: string;
  readonly deviceId?: string;
  readonly writerAgent?: string;
  readonly sourceRunId?: string;
  readonly openShell?: boolean;
  /** Resume the Mac CLI conversation with --continue. */
  readonly continueSession?: boolean;
  /** Skip workflow picker with a blank custom task. */
  readonly customTask?: boolean;
  /** Expand a docked live panel (restore persisted terminal). */
  readonly resumeLiveSession?: boolean;
}

const SEND_TASK_MODAL_QUERY_PARAM = "sendTask";

export default function buildAgentComposerHref(
  input: BuildAgentComposerHrefInput = {},
): string {
  const params = new URLSearchParams();
  params.set(SEND_TASK_MODAL_QUERY_PARAM, "1");

  if (input.libraryCapabilityId) {
    params.set("libraryCapabilityId", input.libraryCapabilityId);
  }

  if (input.prompt) {
    params.set("prompt", input.prompt);
  }

  if (input.deviceId) {
    params.set("deviceId", input.deviceId);
  }

  if (input.writerAgent) {
    params.set("writerAgent", input.writerAgent);
  }

  if (input.sourceRunId) {
    params.set("sourceRunId", input.sourceRunId);
  }

  if (input.openShell === true) {
    params.set("openShell", "1");
  }

  if (input.continueSession === true) {
    params.set("continueSession", "1");
  }

  if (input.customTask === true) {
    params.set("customTask", "1");
  }

  if (input.resumeLiveSession === true) {
    params.set("resumeLive", "1");
  }

  const path =
    input.pathname && input.pathname.length > 0 ? input.pathname : "/";
  return `${path}?${params.toString()}`;
}
