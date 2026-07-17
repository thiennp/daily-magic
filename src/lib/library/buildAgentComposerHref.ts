interface BuildAgentComposerHrefInput {
  readonly libraryCapabilityId?: string;
  readonly prompt?: string;
  readonly deviceId?: string;
  readonly openShell?: boolean;
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

  if (input.openShell === true) {
    params.set("openShell", "1");
  }

  return `/?${params.toString()}`;
}
