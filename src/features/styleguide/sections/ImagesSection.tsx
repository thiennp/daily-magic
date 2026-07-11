import ComponentCard from "@/components/common/ComponentCard";
import ResponsiveImage from "@/components/ui/images/ResponsiveImage";
import ThreeColumnImageGrid from "@/components/ui/images/ThreeColumnImageGrid";
import TwoColumnImageGrid from "@/components/ui/images/TwoColumnImageGrid";

export default function ImagesSection() {
  return (
    <section id="images" className="scroll-mt-28">
      <h2 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Images
      </h2>
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Responsive image">
          <ResponsiveImage />
        </ComponentCard>
        <ComponentCard title="Image in 2 Grid">
          <TwoColumnImageGrid />
        </ComponentCard>
        <ComponentCard title="Image in 3 Grid">
          <ThreeColumnImageGrid />
        </ComponentCard>
      </div>
    </section>
  );
}
