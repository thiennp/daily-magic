import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";

const C = ONE_WINDOW_COMPOSER_COPY;

export const formatChipLabel = (name: string): string =>
  C.chipLabel.replace("{name}", name);

export const formatKeptGone = (name: string): string =>
  C.keptGone.replace("{name}", name);

/** Kept placeholder — COMPOSER-LOCK: Message {name}.… */
export const formatPlaceholderKept = (name: string): string =>
  C.placeholderKept.replace("{name}", name);

export const formatPlaceholderSingle = (name: string): string =>
  C.placeholderSingle.replace("{name}", name);

export const keepCheckboxLabel = (): string => C.pickerKeep;
