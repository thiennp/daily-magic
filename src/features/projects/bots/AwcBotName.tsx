import { AWC_BRAND_ICON_PATHS } from "@/features/projects/bots/awcBrandIconPaths.constant";
import {
  resolveAwcBotKind,
  type AwcBotKind,
} from "@/features/projects/bots/awcBotKind";

/** Simple outline marks for kinds without a published brand mark. */
const OUTLINE_ICONS: Readonly<Record<string, string>> = {
  muse: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z",
  messengers: "M4 5h16v11H9l-5 4z",
  webhook:
    "M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1M14 10a4 4 0 00-5.7 0l-3 3A4 4 0 0011 18.7l1-1",
  generic: "M5 9h14v10H5zM12 9V5M9 14h.01M15 14h.01",
};

function BrandMark({ kind }: { readonly kind: AwcBotKind }) {
  const paths = AWC_BRAND_ICON_PATHS[kind];
  if (paths) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        fillRule="evenodd"
        className="h-4 w-4 shrink-0"
      >
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <path d={OUTLINE_ICONS[kind] ?? OUTLINE_ICONS.generic} />
    </svg>
  );
}

interface AwcBotNameProps {
  readonly name: string;
  /** Type id, writer agent id or anything that names the tool; defaults to the name itself. */
  readonly kindHint?: string;
  readonly className?: string;
}

/** A bot or coding tool name with its small brand icon inline, before the text. */
export default function AwcBotName({
  name,
  kindHint,
  className,
}: AwcBotNameProps) {
  const kind = resolveAwcBotKind(kindHint ?? name);
  return (
    <span
      className={`inline-flex min-w-0 items-center gap-1.5 ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        data-bot-kind={kind}
        className="inline-flex text-awc-fg-muted"
      >
        <BrandMark kind={kind} />
      </span>
      <span className="truncate">{name}</span>
    </span>
  );
}
