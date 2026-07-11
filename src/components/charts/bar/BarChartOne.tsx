"use client";

import dynamic from "next/dynamic";

import {
  BAR_CHART_ONE_OPTIONS,
  BAR_CHART_ONE_SERIES,
} from "@/components/charts/bar/barChartOneOptions.constant";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function BarChartOne() {
  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartOne" className="min-w-[1000px]">
        <ReactApexChart
          options={BAR_CHART_ONE_OPTIONS}
          series={BAR_CHART_ONE_SERIES}
          type="bar"
          height={180}
        />
      </div>
    </div>
  );
}
