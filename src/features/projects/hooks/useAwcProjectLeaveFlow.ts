"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import useLeaveProject from "@/features/projects/hooks/useLeaveProject";

/** Leave-project confirm dialog: open / cancel / confirm → back to /projects. */
const useAwcProjectLeaveFlow = (projectId: string) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { leaveProject, errorMessage, pending, clearError } =
    useLeaveProject(projectId);

  const open = (): void => {
    clearError();
    setIsOpen(true);
  };
  const cancel = (): void => {
    clearError();
    setIsOpen(false);
  };
  const confirm = (): void => {
    void leaveProject().then((ok) => {
      if (!ok) return;
      setIsOpen(false);
      router.push("/projects");
      router.refresh();
    });
  };

  return { isOpen, pending, errorMessage, open, cancel, confirm };
};

export default useAwcProjectLeaveFlow;
