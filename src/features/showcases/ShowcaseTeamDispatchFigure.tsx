import {
  buildTeamDispatchShowcasePngPath,
  buildTeamDispatchShowcaseSvgPath,
  type TeamDispatchShowcaseScreenId,
} from "@/features/showcases/teamDispatchShowcaseScreens.constant";

interface ShowcaseTeamDispatchFigureProps {
  readonly screenId: TeamDispatchShowcaseScreenId;
  readonly alt: string;
  readonly caption: string;
}

export default function ShowcaseTeamDispatchFigure({
  screenId,
  alt,
  caption,
}: ShowcaseTeamDispatchFigureProps) {
  return (
    <figure className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03]">
      <picture>
        <source
          srcSet={buildTeamDispatchShowcasePngPath(screenId)}
          type="image/png"
        />
        <img
          src={buildTeamDispatchShowcaseSvgPath(screenId)}
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
