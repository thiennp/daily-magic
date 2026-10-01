type QuoteNormalizeState = {
  readonly out: string;
  readonly inDouble: boolean;
  readonly inSingle: boolean;
  readonly escaped: boolean;
};

const appendQuoteNormalizedChar = (
  state: QuoteNormalizeState,
  char: string,
): QuoteNormalizeState => {
  if (state.inDouble) {
    if (state.escaped) {
      return {
        ...state,
        out: `${state.out}${char}`,
        escaped: false,
      };
    }
    if (char === "\\") {
      return { ...state, out: `${state.out}${char}`, escaped: true };
    }
    return { ...state, out: `${state.out}${char}`, inDouble: char !== '"' };
  }
  if (state.inSingle) {
    if (state.escaped) {
      return {
        ...state,
        out: `${state.out}${char}`,
        escaped: false,
      };
    }
    if (char === "\\") {
      return { ...state, out: `${state.out}${char}`, escaped: true };
    }
    if (char === "'") {
      return { ...state, out: `${state.out}"`, inSingle: false };
    }
    if (char === '"') {
      return { ...state, out: `${state.out}\\"` };
    }
    if (char === "\n") {
      return { ...state, out: `${state.out}\\n` };
    }
    if (char === "\r") {
      return state;
    }
    return { ...state, out: `${state.out}${char}` };
  }
  if (char === '"') {
    return {
      ...state,
      out: `${state.out}${char}`,
      inDouble: true,
    };
  }
  if (char === "'") {
    return {
      ...state,
      out: `${state.out}"`,
      inSingle: true,
    };
  }
  return { ...state, out: `${state.out}${char}` };
};

/** LLM replies often use JavaScript-style single-quoted keys and values. */
export const convertSingleQuotedJsonStrings = (raw: string): string =>
  [...raw].reduce(appendQuoteNormalizedChar, {
    out: "",
    inDouble: false,
    inSingle: false,
    escaped: false,
  }).out;
