"use client";

import { useCallback, useEffect, useState } from "react";

import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const loadUserProjects = async (
  deviceId: string,
): Promise<readonly UserProjectRecord[]> => {
  const query =
    deviceId.length > 0 ? `?deviceId=${encodeURIComponent(deviceId)}` : "";
  const response = await fetch(`/api/projects${query}`);

  if (!response.ok) {
    return [];
  }

  const data: unknown = await response.json();

  if (
    typeof data === "object" &&
    data !== null &&
    "projects" in data &&
    Array.isArray((data as { projects: unknown }).projects)
  ) {
    return (data as { projects: UserProjectRecord[] }).projects;
  }

  return [];
};

export function useUserProjects(deviceId: string): {
  readonly projects: readonly UserProjectRecord[];
  readonly isLoading: boolean;
  readonly refreshProjects: () => Promise<void>;
  readonly addProject: (project: UserProjectRecord) => void;
  readonly removeProject: (projectId: string) => void;
} {
  const [projects, setProjects] = useState<readonly UserProjectRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProjects = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      setProjects(await loadUserProjects(deviceId));
    } finally {
      setIsLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    const controller = new AbortController();

    const load = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const nextProjects = await loadUserProjects(deviceId);

        if (!controller.signal.aborted) {
          setProjects(nextProjects);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      controller.abort();
    };
  }, [deviceId]);

  const addProject = useCallback((project: UserProjectRecord): void => {
    setProjects((current) => [project, ...current]);
  }, []);

  const removeProject = useCallback((projectId: string): void => {
    setProjects((current) =>
      current.filter((project) => project.id !== projectId),
    );
  }, []);

  return { projects, isLoading, refreshProjects, addProject, removeProject };
}
