export const PRE_ESTIMATE_WRITER_MODES = {
  SAME: "same",
  FAST_API: "fast-api",
} as const;

export type PreEstimateWriterMode =
  (typeof PRE_ESTIMATE_WRITER_MODES)[keyof typeof PRE_ESTIMATE_WRITER_MODES];

export const resolvePreEstimateWriterMode = (
  value: unknown,
): PreEstimateWriterMode => {
  if (value === PRE_ESTIMATE_WRITER_MODES.FAST_API) {
    return PRE_ESTIMATE_WRITER_MODES.FAST_API;
  }
  return PRE_ESTIMATE_WRITER_MODES.SAME;
};
