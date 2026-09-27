interface JsonScanState {
  readonly objects: readonly unknown[];
  readonly depth: number;
  readonly inString: boolean;
  readonly escaped: boolean;
  readonly fragment: string;
}

const INITIAL_SCAN: JsonScanState = {
  objects: [],
  depth: 0,
  inString: false,
  escaped: false,
  fragment: "",
};

const pushObject = (state: JsonScanState): JsonScanState => {
  try {
    const value = JSON.parse(state.fragment) as unknown;
    return {
      ...INITIAL_SCAN,
      objects: [...state.objects, value],
    };
  } catch {
    return {
      ...INITIAL_SCAN,
      objects: state.objects,
    };
  }
};

const scanChar = (state: JsonScanState, char: string): JsonScanState => {
  if (state.inString) {
    const nextFragment = `${state.fragment}${char}`;
    if (state.escaped) {
      return { ...state, escaped: false, fragment: nextFragment };
    }
    if (char === "\\") {
      return { ...state, escaped: true, fragment: nextFragment };
    }
    if (char === '"') {
      return { ...state, inString: false, fragment: nextFragment };
    }
    return { ...state, fragment: nextFragment };
  }

  if (char === '"') {
    return state.depth === 0
      ? state
      : { ...state, inString: true, fragment: `${state.fragment}${char}` };
  }

  if (char === "{") {
    return {
      ...state,
      depth: state.depth + 1,
      fragment: `${state.fragment}${char}`,
    };
  }

  if (char !== "}" || state.depth === 0) {
    if (state.depth === 0) {
      return state;
    }
    return { ...state, fragment: `${state.fragment}${char}` };
  }

  const closed = {
    ...state,
    depth: state.depth - 1,
    fragment: `${state.fragment}${char}`,
  };
  if (closed.depth > 0) {
    return closed;
  }

  return pushObject(closed);
};

export const readJsonObjects = (raw: string): readonly unknown[] =>
  [...raw].reduce(scanChar, INITIAL_SCAN).objects;
