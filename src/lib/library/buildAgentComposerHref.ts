interface BuildAgentComposerHrefInput {
  readonly libraryCapabilityId?: string;
  readonly prompt?: string;
}

export default function buildAgentComposerHref(
  input: BuildAgentComposerHrefInput,
): string {
  const params = new URLSearchParams();

  if (input.libraryCapabilityId) {
    params.set("libraryCapabilityId", input.libraryCapabilityId);
  }

  if (input.prompt) {
    params.set("prompt", input.prompt);
  }

  const query = params.toString();
  return query.length > 0 ? `/agent?${query}` : "/agent";
}
