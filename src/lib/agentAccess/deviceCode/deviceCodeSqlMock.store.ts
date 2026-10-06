import type { DeviceCodeStore } from "@/lib/agentAccess/deviceCode/deviceCodeSqlMock.types";

export const store: DeviceCodeStore = {
  requests: [],
  tokens: [],
  delivery: [],
};

export const qText = (strings: TemplateStringsArray): string =>
  String.raw({ raw: strings });

export const resetDeviceCodeStore = (): void => {
  store.requests = [];
  store.tokens = [];
  store.delivery = [];
};
