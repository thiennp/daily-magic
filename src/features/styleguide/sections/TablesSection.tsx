import ComponentCard from "@/components/common/ComponentCard";
import BasicTableOne from "@/components/tables/BasicTableOne";

export default function TablesSection() {
  return (
    <section id="tables" className="scroll-mt-28">
      <h2 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Tables
      </h2>
      <div className="space-y-6">
        <ComponentCard title="Basic Table">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </section>
  );
}
