const PLACEHOLDER_EMAIL_FROM_MARKERS = [
  "your-verified-domain.com",
  "example.com",
] as const;

export const isPlaceholderEmailFrom = (emailFrom: string): boolean => {
  const normalized = emailFrom.toLowerCase();

  return PLACEHOLDER_EMAIL_FROM_MARKERS.some((marker) =>
    normalized.includes(marker),
  );
};

const resolveEmailFrom = (): string | undefined => {
  const emailFrom = process.env.EMAIL_FROM?.trim();
  if (!emailFrom || isPlaceholderEmailFrom(emailFrom)) {
    return undefined;
  }

  return emailFrom;
};

export default resolveEmailFrom;
