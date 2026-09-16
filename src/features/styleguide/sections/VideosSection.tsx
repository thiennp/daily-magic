import ComponentCard from "@/components/common/ComponentCard";

const VIDEO_PLACEHOLDER_CLASS =
  "flex w-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-100 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400";

function VideoRatioPlaceholder({
  label,
  aspectClass,
}: {
  readonly label: string;
  readonly aspectClass: string;
}) {
  return (
    <ComponentCard title={label}>
      <div className={`${VIDEO_PLACEHOLDER_CLASS} ${aspectClass}`}>
        Video embed preview (staff-only styleguide)
      </div>
    </ComponentCard>
  );
}

export default function VideosSection() {
  return (
    <section id="videos" className="scroll-mt-28">
      <h2 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Videos
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:gap-6 xl:grid-cols-2">
        <div className="space-y-5 sm:space-y-6">
          <VideoRatioPlaceholder
            label="Video ratio 16:9"
            aspectClass="aspect-video"
          />
          <VideoRatioPlaceholder
            label="Video ratio 4:3"
            aspectClass="aspect-[4/3]"
          />
        </div>
        <div className="space-y-5 sm:space-y-6">
          <VideoRatioPlaceholder
            label="Video ratio 21:9"
            aspectClass="aspect-[21/9]"
          />
          <VideoRatioPlaceholder
            label="Video ratio 1:1"
            aspectClass="aspect-square"
          />
        </div>
      </div>
    </section>
  );
}
