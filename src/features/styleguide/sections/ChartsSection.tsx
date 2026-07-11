import BarChartOne from "@/components/charts/bar/BarChartOne";
import LineChartOne from "@/components/charts/line/LineChartOne";
import ComponentCard from "@/components/common/ComponentCard";

export default function ChartsSection() {
  return (
    <section id="charts" className="scroll-mt-28">
      <h2 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Charts
      </h2>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ComponentCard title="Bar Chart">
          <BarChartOne />
        </ComponentCard>
        <ComponentCard title="Line Chart">
          <LineChartOne />
        </ComponentCard>
      </div>
    </section>
  );
}
