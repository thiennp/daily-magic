const assertAutomationDispatchAllowsComposition = (input: {
  readonly runScopedComponentIds: readonly string[];
}): string | null => {
  if (input.runScopedComponentIds.length > 0) {
    return "Automations cannot use run-scoped components.";
  }

  return null;
};

export default assertAutomationDispatchAllowsComposition;
