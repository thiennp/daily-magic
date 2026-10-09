"use client";

import { useState } from "react";

import {
  useCreateProjectTask,
  type NewProjectTask,
} from "@/features/projects/tasks/useCreateProjectTask";
import type { ProjectTaskPriority } from "@/lib/projects/tasks/projectTaskTools.constant";

/** Create-task form state + submit (blank title is caught before the request). */
export const useCreateTaskForm = (input: {
  readonly projectId: string;
  readonly reload: () => void;
  readonly onCreated: () => void;
}) => {
  const { pending, error, create } = useCreateProjectTask(input);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<ProjectTaskPriority | "">("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState<NewProjectTask["status"]>("queued");
  const [missingTitle, setMissingTitle] = useState(false);
  const submit = async (): Promise<void> => {
    if (title.trim() === "") {
      setMissingTitle(true);
      return;
    }
    const ok = await create({
      title: title.trim(),
      description,
      priority: priority === "" ? null : priority,
      status,
      ownerMembershipId: owner === "" ? null : owner,
    });
    if (ok) input.onCreated();
  };
  return {
    pending,
    error,
    submit,
    missingTitle,
    title,
    setTitle: (v: string) => {
      setTitle(v);
      setMissingTitle(false);
    },
    description,
    setDescription,
    priority,
    setPriority,
    owner,
    setOwner,
    status,
    setStatus,
  };
};
