const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
] as const;

const pad2 = (n: number): string => n.toString().padStart(2, "0");

const sameCalendarDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const yesterdayOf = (now: Date): Date => {
  const d = new Date(now);
  d.setDate(d.getDate() - 1);
  return d;
};

/** Calendar day: `27 Sept` (never lowercase month / "sept"). */
export const formatOverviewDate = (
  value: string | Date,
  nowMs: number = Date.now(),
): string | null => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  void nowMs;
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
};

/**
 * I10 when-line for Overview.
 * - Yesterday → mid-sentence `yesterday 15:15`; lineStart `Yesterday 15:15`
 * - Else → `27 Sept`
 */
export const formatOverviewWhen = (
  value: string | null,
  options: {
    readonly nowMs?: number;
    /** true = sentence/line start (`Yesterday 15:15`); false = mid-sentence */
    readonly lineStart?: boolean;
  } = {},
): string | null => {
  if (value === null) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  const now = new Date(options.nowMs ?? Date.now());
  const time = `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
  if (sameCalendarDay(date, yesterdayOf(now))) {
    const word = options.lineStart === true ? "Yesterday" : "yesterday";
    return `${word} ${time}`;
  }
  if (sameCalendarDay(date, now)) {
    const word = options.lineStart === true ? "Today" : "today";
    return `${word} ${time}`;
  }
  return formatOverviewDate(date, now.getTime());
};

export default formatOverviewWhen;
