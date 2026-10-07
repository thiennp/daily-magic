"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * P1-S4a: whether the "New" marker is on screen inside the feed scroller.
 * No marker → true (nothing to jump to). No IntersectionObserver → false.
 */
export const useOneWindowNewMarkerInView = (input: {
  readonly scrollerRef: RefObject<HTMLDivElement | null>;
  readonly markerRef: RefObject<HTMLDivElement | null>;
  readonly hasMarker: boolean;
}): boolean => {
  const { scrollerRef, markerRef, hasMarker } = input;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const marker = markerRef.current;
    if (!hasMarker || marker === null || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (records) => {
        if (records.some((record) => record.isIntersecting)) setInView(true);
      },
      { root: scrollerRef.current },
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, [hasMarker, markerRef, scrollerRef]);

  return !hasMarker || inView;
};
