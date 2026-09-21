"use client";

import { createContext, useContext, type ReactNode } from "react";

export const WorkflowUploadExcerptRegistrarContext = createContext<
  ((uploadId: string, excerpt: string) => void) | null
>(null);

export function WorkflowUploadExcerptProvider({
  children,
  registerUploadExcerpt,
}: {
  readonly children: ReactNode;
  readonly registerUploadExcerpt: (uploadId: string, excerpt: string) => void;
}) {
  return (
    <WorkflowUploadExcerptRegistrarContext.Provider
      value={registerUploadExcerpt}
    >
      {children}
    </WorkflowUploadExcerptRegistrarContext.Provider>
  );
}

export const useWorkflowUploadExcerptRegistrar = (): ((
  uploadId: string,
  excerpt: string,
) => void) => {
  const register = useContext(WorkflowUploadExcerptRegistrarContext);
  return register ?? (() => undefined);
};
