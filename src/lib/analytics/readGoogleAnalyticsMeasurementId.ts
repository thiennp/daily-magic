const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

const readGoogleAnalyticsMeasurementId = (): string | null => {
  const value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  if (value === undefined || value.length === 0) {
    return null;
  }

  if (!GA_MEASUREMENT_ID_PATTERN.test(value)) {
    return null;
  }

  return value;
};

export default readGoogleAnalyticsMeasurementId;
