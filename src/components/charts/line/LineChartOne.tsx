"use client";

import dynamic from "next/dynamic";

import { LINE_CHART_ONE_OPTIONS } from "@/components/charts/line/lineChartOneOptions.constant";
import { LINE_CHART_ONE_SERIES } from "@/components/charts/line/lineChartOneSeries.constant";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function LineChartOne() {
  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartEight" className="min-w-[1000px]">
        <ReactApexChart
          options={LINE_CHART_ONE_OPTIONS}
          series={LINE_CHART_ONE_SERIES}
          type="area"
          height={310}
        />
      </div>
    </div>
  );
}
