/** Normalize a DB timestamp to ISO string, or null. */
const toAdminActivityIso = (value: unknown): string | null => {
  if (value == null) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
};

export default toAdminActivityIso;
