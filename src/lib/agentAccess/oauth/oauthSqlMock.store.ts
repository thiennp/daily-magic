export type OauthStore = {
  clients: Array<Record<string, unknown>>;
  pending: Array<Record<string, unknown>>;
  codes: Array<Record<string, unknown>>;
  delivery: Array<Record<string, unknown>>;
  tokens: Array<Record<string, unknown>>;
};

export const store: OauthStore = {
  clients: [],
  pending: [],
  codes: [],
  delivery: [],
  tokens: [],
};

export const qText = (strings: TemplateStringsArray): string =>
  String.raw({ raw: strings });

export const resetOauthStore = (): void => {
  store.clients = [];
  store.pending = [];
  store.codes = [];
  store.delivery = [];
  store.tokens = [];
};
