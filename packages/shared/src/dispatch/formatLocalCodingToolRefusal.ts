import {
  LocalCodingToolRefusalCode,
  type LocalCodingToolRefusalCodeValue,
} from "./localCodingToolRefusal.constant";
import { LOCAL_CODING_TOOL_SAFETY_COPY } from "./localCodingToolSafetyCopy.constant";

type SafetyCopyKey = keyof typeof LOCAL_CODING_TOOL_SAFETY_COPY;

const REFUSAL_COPY_KEY: Readonly<
  Record<LocalCodingToolRefusalCodeValue, SafetyCopyKey>
> = {
  [LocalCodingToolRefusalCode.FOLDER_REQUIRED]: "folderMissing",
  [LocalCodingToolRefusalCode.FOLDER_NOT_FOUND]: "folderMissing",
  [LocalCodingToolRefusalCode.FOLDER_NOT_REGISTERED]: "folderNotAllowed",
  [LocalCodingToolRefusalCode.FOLDER_CHECK_UNAVAILABLE]:
    "folderCheckUnavailablePlaceholder",
  [LocalCodingToolRefusalCode.CODING_TOOLS_PAUSED]: "pauseReason",
};

/** Fill `{computer}`; AWL defaults to the locked "This computer" fallback. */
export const formatLocalCodingToolSafetyCopy = (
  key: SafetyCopyKey,
  computer: string = LOCAL_CODING_TOOL_SAFETY_COPY.computerFallback,
): string => LOCAL_CODING_TOOL_SAFETY_COPY[key].replace("{computer}", computer);

/** Run-result line for a refusal code. */
export const formatLocalCodingToolRefusal = (
  code: LocalCodingToolRefusalCodeValue,
  computer?: string,
): string => formatLocalCodingToolSafetyCopy(REFUSAL_COPY_KEY[code], computer);
