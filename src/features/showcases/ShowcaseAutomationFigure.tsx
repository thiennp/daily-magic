import {
  buildShowcaseAutomationImagePaths,
  type AutomationShowcaseScreenId,
} from "@/features/showcases/automationShowcaseScreens.constant";

interface ShowcaseAutomationFigureProps {
  readonly screenId: AutomationShowcaseScreenId;
  readonly alt: string;
  readonly caption: string;
}

export default function ShowcaseAutomationFigure({
  screenId,
  alt,
  caption,
}: ShowcaseAutomationFigureProps) {
  const { png, svg } = buildShowcaseAutomationImagePaths(screenId);

  return (
    <figure className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03]">
      <picture>
        <source srcSet={png} type="image/png" />
        <img
          src={svg}
          alt={alt}
          width={960}
          height={560}
          className="h-auto w-full"
        />
      </picture>
      <figcaption className="border-t border-gray-200 px-4 py-3 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
        {caption}
      </figcaption>
    </figure>
  );
}
