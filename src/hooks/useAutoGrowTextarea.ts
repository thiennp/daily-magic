"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

const DEFAULT_MAX_ROWS = 10;

function getMaxHeight(textarea: HTMLTextAreaElement, maxRows: number): number {
  const styles = window.getComputedStyle(textarea);
  const lineHeight = Number.parseFloat(styles.lineHeight);
  const paddingTop = Number.parseFloat(styles.paddingTop);
  const paddingBottom = Number.parseFloat(styles.paddingBottom);
  const borderTop = Number.parseFloat(styles.borderTopWidth);
  const borderBottom = Number.parseFloat(styles.borderBottomWidth);
  const resolvedLineHeight = Number.isFinite(lineHeight) ? lineHeight : 20;

  return (
    resolvedLineHeight * maxRows +
    paddingTop +
    paddingBottom +
    borderTop +
    borderBottom
  );
}

export function useAutoGrowTextarea(
  value: string,
  maxRows = DEFAULT_MAX_ROWS,
): {
  readonly textareaRef: React.RefObject<HTMLTextAreaElement | null>;
} {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resize = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea === null) {
      return;
    }

    textarea.style.height = "auto";
    const maxHeight = getMaxHeight(textarea, maxRows);
    const nextHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? "auto" : "hidden";
  }, [maxRows]);

  useLayoutEffect(() => {
    resize();
  }, [value, resize]);

  return { textareaRef };
}
