"use client";

import {
  STYLEGUIDE_SECTIONS,
  type StyleguideSectionId,
} from "@/features/styleguide/styleguideSections.constant";
import { useCallback, useEffect, useState } from "react";

const STYLEGUIDE_SECTION_IDS: readonly StyleguideSectionId[] =
  STYLEGUIDE_SECTIONS.map((section) => section.id);

const resolveStyleguideSectionFromHash = (): StyleguideSectionId => {
  if (typeof window === "undefined") {
    return STYLEGUIDE_SECTIONS[0].id;
  }

  const hash = window.location.hash.replace(/^#/, "");
  if (
    hash.length > 0 &&
    STYLEGUIDE_SECTION_IDS.includes(hash as StyleguideSectionId)
  ) {
    return hash as StyleguideSectionId;
  }

  return STYLEGUIDE_SECTIONS[0].id;
};

export const useStyleguideActiveSection = (): StyleguideSectionId => {
  const [activeSectionId, setActiveSectionId] = useState<StyleguideSectionId>(
    resolveStyleguideSectionFromHash,
  );

  const onHashChange = useCallback((): void => {
    setActiveSectionId(resolveStyleguideSectionFromHash());
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [onHashChange]);

  useEffect(() => {
    const sectionElements = STYLEGUIDE_SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topEntry = visible[0];
        if (topEntry?.target.id) {
          setActiveSectionId(topEntry.target.id as StyleguideSectionId);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return activeSectionId;
};
