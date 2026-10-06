/** Fill Product `{token}` placeholders, e.g. `Copy added to {project}.` */
export const fillProjectPageCopy = (
  template: string,
  values: Readonly<Record<string, string | number>>,
): string =>
  template.replace(/\{(\w+)\}/g, (match, token: string) =>
    token in values ? String(values[token]) : match,
  );
