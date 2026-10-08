export const CHART_WIDTH = 320;
export const CHART_HEIGHT = 120;
export const CHART_PAD = 16;

export type ChartPoint = { readonly x: number; readonly y: number };

/** Map a series (null = gap) to SVG points inside the padded chart box. */
export const buildSeriesPoints = (
  values: readonly (number | null)[],
  maxValue: number,
): (ChartPoint | null)[] => {
  const innerWidth = CHART_WIDTH - 2 * CHART_PAD;
  const innerHeight = CHART_HEIGHT - 2 * CHART_PAD;
  const step = values.length > 1 ? innerWidth / (values.length - 1) : 0;
  return values.map((value, index) =>
    value === null
      ? null
      : {
          x: CHART_PAD + (values.length > 1 ? index * step : innerWidth / 2),
          y:
            CHART_HEIGHT -
            CHART_PAD -
            (maxValue <= 0 ? 0 : (value / maxValue) * innerHeight),
        },
  );
};

/** Contiguous polyline segments; gaps (null) split the line. */
export const buildPolylineSegments = (
  points: readonly (ChartPoint | null)[],
): ChartPoint[][] =>
  points
    .reduce<ChartPoint[][]>(
      (segments, point) => {
        if (point === null) {
          return [...segments, []];
        }
        const last = segments[segments.length - 1] ?? [];
        return [...segments.slice(0, -1), [...last, point]];
      },
      [[]],
    )
    .filter((segment) => segment.length > 0);

export const formatChartPercent = (value: number | null): string =>
  value === null ? "n/a" : `${Math.round(value * 100)}%`;
