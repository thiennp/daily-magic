export const ACCOUNT_NOTIFY_KEYS = [
  "task",
  "approval",
  "digest",
  "invites",
  "billing",
] as const;

export type AccountNotifyKey = (typeof ACCOUNT_NOTIFY_KEYS)[number];

export type AccountPrefs = {
  readonly avatarColor: string | null;
  readonly emailOn: Readonly<Record<AccountNotifyKey, boolean>>;
  readonly appOn: Readonly<Record<AccountNotifyKey, boolean>>;
  readonly quiet: {
    readonly on: boolean;
    readonly from: string;
    readonly to: string;
  };
};

export const DEFAULT_ACCOUNT_PREFS: AccountPrefs = {
  avatarColor: null,
  emailOn: {
    task: true,
    approval: true,
    digest: true,
    invites: true,
    billing: true,
  },
  appOn: {
    task: true,
    approval: true,
    digest: false,
    invites: true,
    billing: true,
  },
  quiet: { on: false, from: "22:00", to: "07:00" },
};

const HOUR_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
const COLOR_PATTERN = /^[a-z0-9-]{1,24}$/;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const pickToggles = (
  raw: unknown,
  fallback: Readonly<Record<AccountNotifyKey, boolean>>,
): Readonly<Record<AccountNotifyKey, boolean>> => {
  const source = isRecord(raw) ? raw : {};
  return Object.fromEntries(
    ACCOUNT_NOTIFY_KEYS.map((key) => [
      key,
      typeof source[key] === "boolean" ? source[key] : fallback[key],
    ]),
  ) as Record<AccountNotifyKey, boolean>;
};

/** Keep only known keys with valid values; anything else falls back to the default. */
export const sanitizeAccountPrefs = (raw: unknown): AccountPrefs => {
  const source = isRecord(raw) ? raw : {};
  const quiet = isRecord(source.quiet) ? source.quiet : {};
  const from = quiet.from;
  const to = quiet.to;
  const validHours =
    typeof from === "string" &&
    typeof to === "string" &&
    HOUR_PATTERN.test(from) &&
    HOUR_PATTERN.test(to) &&
    from !== to;
  return {
    avatarColor:
      typeof source.avatarColor === "string" &&
      COLOR_PATTERN.test(source.avatarColor)
        ? source.avatarColor
        : null,
    emailOn: pickToggles(source.emailOn, DEFAULT_ACCOUNT_PREFS.emailOn),
    appOn: pickToggles(source.appOn, DEFAULT_ACCOUNT_PREFS.appOn),
    quiet: {
      on: quiet.on === true,
      from: validHours ? (from as string) : DEFAULT_ACCOUNT_PREFS.quiet.from,
      to: validHours ? (to as string) : DEFAULT_ACCOUNT_PREFS.quiet.to,
    },
  };
};

const NAME_MIN = 2;
const NAME_MAX = 80;

/** Trimmed display name, or null when it is too short or too long. */
export const parseAccountName = (raw: unknown): string | null => {
  if (typeof raw !== "string") {
    return null;
  }
  const name = raw.trim().replace(/\s+/g, " ");
  return name.length >= NAME_MIN && name.length <= NAME_MAX ? name : null;
};
