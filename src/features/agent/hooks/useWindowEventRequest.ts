"use client";

import { useEffect, useRef } from "react";

/** Runs the latest `onEvent` whenever `eventName` is dispatched on window. */
export const useWindowEventRequest = (
  eventName: string,
  onEvent: () => void,
): void => {
  const onEventRef = useRef(onEvent);
  useEffect(() => {
    onEventRef.current = onEvent;
  });
  useEffect(() => {
    const handle = (): void => {
      onEventRef.current();
    };
    window.addEventListener(eventName, handle);
    return () => {
      window.removeEventListener(eventName, handle);
    };
  }, [eventName]);
};
