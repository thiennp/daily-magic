const CURSOR_LOGIN_DELIVERY_COOLDOWN_MS = 5 * 60 * 1000;

const lastDeliveredAtByKey = new Map<string, number>();

const resolveDeliveryKey = (input: {
  readonly deviceId?: string;
  readonly clientId: string;
}): string => input.deviceId ?? input.clientId;

export const shouldDeliverAgentWitchCursorLogin = (input: {
  readonly deviceId?: string;
  readonly clientId: string;
  readonly now?: number;
}): boolean => {
  const key = resolveDeliveryKey(input);
  const now = input.now ?? Date.now();
  const lastDeliveredAt = lastDeliveredAtByKey.get(key);

  if (lastDeliveredAt !== undefined && now - lastDeliveredAt < CURSOR_LOGIN_DELIVERY_COOLDOWN_MS) {
    return false;
  }

  return true;
};

export const markAgentWitchCursorLoginDelivered = (input: {
  readonly deviceId?: string;
  readonly clientId: string;
  readonly now?: number;
}): void => {
  lastDeliveredAtByKey.set(
    resolveDeliveryKey(input),
    input.now ?? Date.now(),
  );
};

export const clearAgentWitchCursorLoginDeliveryRegistryForTests = (): void => {
  lastDeliveredAtByKey.clear();
};
