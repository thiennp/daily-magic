"use client";

import { useEffect, useRef } from "react";

import { AGENT_WITCH_PICK_ANOTHER_WRITER_EVENT } from "@/features/agent/utils/pickAnotherWriterEvent";

/** Runs `onPick` when the floater's "Pick another coding tool" is pressed. */
export const usePickAnotherWriterRequest = (onPick: () => void): void => {
  const onPickRef = useRef(onPick);
  useEffect(() => {
    onPickRef.current = onPick;
  });
  useEffect(() => {
    const handle = (): void => {
      onPickRef.current();
    };
    window.addEventListener(AGENT_WITCH_PICK_ANOTHER_WRITER_EVENT, handle);
    return () => {
      window.removeEventListener(AGENT_WITCH_PICK_ANOTHER_WRITER_EVENT, handle);
    };
  }, []);
};
