import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";

const C = ONE_WINDOW_COMPOSER_COPY;

export const formatChipLabel = (name: string): string =>
  C.chipLabel.replace("{name}", name);

export const formatChipLabelMany = (name: string, n: number): string =>
  C.chipLabelMany.replace("{name}", name).replace("{n}", String(n));

export const formatKeptGone = (name: string): string =>
  C.keptGone.replace("{name}", name);

/** Kept placeholder — COMPOSER-LOCK: Message {name}.… (everyone → name "everyone"). */
export const formatPlaceholderKept = (name: string): string =>
  C.placeholderKept.replace("{name}", name);

export const formatPlaceholderSingle = (name: string): string =>
  C.placeholderSingle.replace("{name}", name);

export const keepCheckboxLabel = (input: {
  readonly everyone: boolean;
  readonly selectedCount: number;
}): string => {
  if (input.everyone) return C.pickerKeepEveryone;
  if (input.selectedCount > 1) return C.pickerKeepMany;
  return C.pickerKeep;
};
