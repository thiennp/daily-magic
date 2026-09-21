"use client";

import { useCallback, useState } from "react";

export function useWorkflowUploadExcerptState(): {
  readonly uploadExcerptById: Readonly<Record<string, string>>;
  readonly registerUploadExcerpt: (uploadId: string, excerpt: string) => void;
} {
  const [uploadExcerptById, setUploadExcerptById] = useState<
    Record<string, string>
  >({});

  const registerUploadExcerpt = useCallback(
    (uploadId: string, excerpt: string) => {
      setUploadExcerptById((current) => ({
        ...current,
        [uploadId]: excerpt,
      }));
    },
    [],
  );

  return { uploadExcerptById, registerUploadExcerpt };
}
