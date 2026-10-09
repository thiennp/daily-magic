"use client";

import { useEffect, type RefObject } from "react";

import {
  ONE_WINDOW_COMPOSER_PREFILL_EVENT,
  writeTextareaValue,
} from "@/features/projects/messenger/oneWindow/oneWindowComposerPrefill";

/** Fills the composer textarea when a card asks for it (Ask {name} again). */
export const useOneWindowComposerPrefill = (
  textareaRef: RefObject<HTMLTextAreaElement | null>,
): void => {
  useEffect(() => {
    const onPrefill = (event: Event): void => {
      const textarea = textareaRef.current;
      const text = (event as CustomEvent<string>).detail;
      if (textarea !== null && typeof text === "string") {
        writeTextareaValue(textarea, text);
      }
    };
    window.addEventListener(ONE_WINDOW_COMPOSER_PREFILL_EVENT, onPrefill);
    return () =>
      window.removeEventListener(ONE_WINDOW_COMPOSER_PREFILL_EVENT, onPrefill);
  }, [textareaRef]);
};
