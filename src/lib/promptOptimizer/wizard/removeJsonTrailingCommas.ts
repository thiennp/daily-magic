type TrailingCommaState = {
  readonly out: string;
  readonly inString: boolean;
  readonly escaped: boolean;
};

const appendWithoutTrailingCommas = (
  state: TrailingCommaState,
  char: string,
): TrailingCommaState => {
  if (state.inString) {
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
    return {
      ...state,
      out: `${state.out}${char}`,
      inString: char !== '"',
    };
  }
  if (char === '"') {
    return {
      ...state,
      out: `${state.out}${char}`,
      inString: true,
    };
  }
  if (char === ",") {
    return { ...state, out: `${state.out}${char}`, escaped: false };
  }
  if (char === "}" || char === "]") {
    const trimmed = state.out.replace(/,\s*$/, "");
    return {
      ...state,
      out: `${trimmed}${char}`,
    };
  }
  return { ...state, out: `${state.out}${char}` };
};

export const removeJsonTrailingCommas = (raw: string): string =>
  [...raw].reduce(appendWithoutTrailingCommas, {
    out: "",
    inString: false,
    escaped: false,
  }).out;
