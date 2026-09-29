const PLACEHOLDER = /\{\{([a-zA-Z0-9_-]+)\}\}/g;

export const substitutePromptSdlcTemplateValues = (
  templatedPrompt: string,
  values: Readonly<Record<string, string>>,
): string =>
  templatedPrompt.replace(PLACEHOLDER, (match, name: string) => {
    const value = values[name];
    return value === undefined || value.trim() === "" ? match : value;
  });
