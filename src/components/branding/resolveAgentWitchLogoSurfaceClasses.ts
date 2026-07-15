export type AgentWitchLogoSurface = "adaptive" | "light";

export interface AgentWitchLogoSurfaceClasses {
  readonly root: string;
  readonly text: string;
  readonly markFill: string;
  readonly markCross: string;
  readonly markSlash: string;
}

const DEFAULT_MARK_SIZE_CLASSES = "h-7 w-7";
const DEFAULT_TEXT_CLASSES = "text-lg font-bold tracking-tight";

export function resolveAgentWitchLogoSurfaceClasses(
  surface: AgentWitchLogoSurface = "adaptive",
): AgentWitchLogoSurfaceClasses {
  if (surface === "light") {
    return {
      root: `${DEFAULT_MARK_SIZE_CLASSES} text-zinc-900`,
      text: `${DEFAULT_TEXT_CLASSES} text-zinc-900`,
      markFill: "fill-zinc-900/5 stroke-none",
      markCross: "stroke-zinc-900",
      markSlash: "stroke-zinc-400",
    };
  }

  return {
    root: `${DEFAULT_MARK_SIZE_CLASSES} text-zinc-900 dark:text-zinc-100`,
    text: `${DEFAULT_TEXT_CLASSES} text-zinc-900 dark:text-zinc-100`,
    markFill: "fill-zinc-900/5 stroke-none dark:fill-zinc-100/10",
    markCross: "stroke-zinc-900 dark:stroke-zinc-100",
    markSlash: "stroke-zinc-400 dark:stroke-zinc-500",
  };
}
