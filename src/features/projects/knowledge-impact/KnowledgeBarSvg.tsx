import KnowledgeChartLegend from "@/features/projects/knowledge-impact/KnowledgeChartLegend";
import {
  buildBarRects,
  formatWeekLabel,
} from "@/features/projects/knowledge-impact/knowledgeImpactBarMath";
import {
  CHART_HEIGHT,
  CHART_PAD,
  CHART_WIDTH,
} from "@/features/projects/knowledge-impact/knowledgeImpactChartMath";
import { formatNumber } from "@/features/projects/knowledge-impact/knowledgeImpactFormat";

export type KnowledgeBarSeries = {
  readonly label: string;
  /** `fill-awc-*` for the bars. */
  readonly className: string;
  /** `bg-awc-*` for the legend dot. */
  readonly swatch: string;
  readonly values: readonly number[];
};

/** Weekly grouped or stacked bars with a max label, week ticks and a legend. */
export default function KnowledgeBarSvg(props: {
  readonly weeks: readonly string[];
  readonly series: readonly KnowledgeBarSeries[];
  readonly stacked?: boolean;
  readonly label: string;
  readonly valuePrefix?: string;
}) {
  const { rects, max } = buildBarRects(
    props.series.map((s) => s.values),
    props.stacked === true,
  );
  const last = props.weeks.length - 1;
  return (
    <>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        role="img"
        aria-label={props.label}
        className="w-full max-w-md text-awc-fg-muted"
      >
        <line
          x1={CHART_PAD}
          y1={CHART_HEIGHT - CHART_PAD}
          x2={CHART_WIDTH - CHART_PAD}
          y2={CHART_HEIGHT - CHART_PAD}
          className="stroke-awc-border-strong"
        />
        <text x={CHART_PAD} y={10} fontSize={10} fill="currentColor">
          {`${props.valuePrefix ?? ""}${formatNumber(max)}`}
        </text>
        {rects.map((rect) => (
          <rect
            key={`${rect.seriesIndex}-${rect.categoryIndex}`}
            x={rect.x}
            y={rect.y}
            width={rect.width}
            height={rect.height}
            className={props.series[rect.seriesIndex]?.className}
          >
            <title>{`${props.weeks[rect.categoryIndex]}: ${props.series[rect.seriesIndex]?.label} ${props.valuePrefix ?? ""}${formatNumber(props.series[rect.seriesIndex]?.values[rect.categoryIndex] ?? 0)}`}</title>
          </rect>
        ))}
        {[0, last].map((index) =>
          props.weeks[index] === undefined ||
          (index === last && last === 0) ? null : (
            <text
              key={index}
              x={index === 0 ? CHART_PAD : CHART_WIDTH - CHART_PAD}
              y={CHART_HEIGHT - 3}
              fontSize={9}
              textAnchor={index === 0 ? "start" : "end"}
              fill="currentColor"
            >
              {formatWeekLabel(props.weeks[index] ?? "")}
            </text>
          ),
        )}
      </svg>
      <KnowledgeChartLegend items={props.series} />
    </>
  );
}
