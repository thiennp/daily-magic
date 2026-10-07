"use client";

import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";

import {
  activeOneWindowMentionQuery,
  applyOneWindowMention,
  filterOneWindowMentionOptions,
  type OneWindowMentionAssistant,
} from "@/features/projects/messenger/oneWindow/oneWindowMentions";

/**
 * P1-S4b composer draft: text + caret, the inline @ picker (type "@" or press
 * the @ button; ↑/↓ move, Enter/Tab pick, Esc closes) and Enter-to-send
 * (Shift+Enter = new line). Mentions off (SINGLE) → "@" is plain text.
 */
export const useOneWindowComposerDraft = (input: {
  readonly assistants: readonly OneWindowMentionAssistant[];
  readonly mentionsEnabled: boolean;
  /** Send the text; call `clear` once it went out. */
  readonly onSubmit: (text: string, clear: () => void) => void;
}) => {
  const { assistants, mentionsEnabled, onSubmit } = input;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState("");
  const [caret, setCaret] = useState(0);
  const [index, setIndex] = useState(0);
  const [dismissedAt, setDismissedAt] = useState<number | null>(null);
  const query = mentionsEnabled ? activeOneWindowMentionQuery(text, caret) : null;
  const open = query !== null && dismissedAt !== caret;
  const options = open ? filterOneWindowMentionOptions(assistants, query) : [];
  const active = Math.min(index, Math.max(0, options.length - 1));

  const moveTo = (nextText: string, nextCaret: number): void => {
    setText(nextText);
    setCaret(nextCaret);
    setIndex(0);
    setDismissedAt(null);
    window.requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(nextCaret, nextCaret);
    });
  };
  const pick = (name: string): void => {
    const next = applyOneWindowMention(text, caret, name);
    moveTo(next.text, next.caret);
  };
  const insertAt = (): void => {
    const pos = textareaRef.current?.selectionStart ?? text.length;
    const lead = pos > 0 && !/\s/.test(text[pos - 1] ?? "") ? " @" : "@";
    moveTo(text.slice(0, pos) + lead + text.slice(pos), pos + lead.length);
  };
  const clear = (): void => moveTo("", 0);
  const submit = (): void => onSubmit(text, clear);
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setText(event.target.value);
    setCaret(event.target.selectionStart ?? event.target.value.length);
    setIndex(0);
    setDismissedAt(null);
  };
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    const step = event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
    if (open && options.length > 0 && step !== 0) {
      event.preventDefault();
      setIndex((active + step + options.length) % options.length);
      return;
    }
    if (open && options.length > 0 && (event.key === "Enter" || event.key === "Tab") && !event.shiftKey) {
      event.preventDefault();
      pick(options[active].displayName);
      return;
    }
    if (open && event.key === "Escape") {
      event.preventDefault();
      setDismissedAt(caret);
      return;
    }
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
    }
  };

  return {
    textareaRef,
    text,
    open,
    options,
    active,
    pick,
    insertAt,
    onChange,
    onKeyDown,
    onCaret: (position: number) => setCaret(position),
    clear,
    submit,
  };
};
