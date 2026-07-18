export interface PendingAccountLink {
  readonly userId: string;
  readonly email: string;
  readonly linkToken: string;
  readonly appOrigin: string;
  readonly expiresAt: number;
}

const pendingByEmail = new Map<string, PendingAccountLink>();

const normalizeEmail = (email: string): string => email.trim().toLowerCase();

export const registerPendingAccountLink = (input: {
  readonly userId: string;
  readonly email: string;
  readonly linkToken: string;
  readonly appOrigin: string;
  readonly ttlMs?: number;
}): void => {
  const email = normalizeEmail(input.email);
  const ttlMs = input.ttlMs ?? 5 * 60 * 1000;

  pendingByEmail.set(email, {
    userId: input.userId,
    email,
    linkToken: input.linkToken,
    appOrigin: input.appOrigin.replace(/\/$/, ""),
    expiresAt: Date.now() + ttlMs,
  });
};

export const peekPendingAccountLinkByEmail = (
  email: string,
): PendingAccountLink | null => {
  const entry = pendingByEmail.get(normalizeEmail(email));
  if (entry === undefined) {
    return null;
  }

  if (entry.expiresAt < Date.now()) {
    pendingByEmail.delete(entry.email);
    return null;
  }

  return entry;
};

export const clearPendingAccountLinkForEmail = (email: string): void => {
  pendingByEmail.delete(normalizeEmail(email));
};

/** When the Mac has no profile email yet, deliver at most one pending link. */
export const peekAnyPendingAccountLink = (): PendingAccountLink | null => {
  const now = Date.now();
  for (const [email, entry] of pendingByEmail) {
    if (entry.expiresAt < now) {
      pendingByEmail.delete(email);
      continue;
    }

    return entry;
  }

  return null;
};
