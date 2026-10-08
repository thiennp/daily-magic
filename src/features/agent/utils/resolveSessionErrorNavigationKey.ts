/** d7110873: a new page or a fresh New task open is a new moment. */
export const resolveSessionErrorNavigationKey = (input: {
  readonly pathname: string;
  readonly isSendTaskOpen: boolean;
}): string => `${input.pathname}|${input.isSendTaskOpen ? "open" : "docked"}`;
