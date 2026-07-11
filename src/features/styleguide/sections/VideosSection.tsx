import VideosExample from "@/components/ui/video/VideosExample";

export default function VideosSection() {
  return (
    <section id="videos" className="scroll-mt-28">
      <h2 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Videos
      </h2>
      <VideosExample />
    </section>
  );
}
