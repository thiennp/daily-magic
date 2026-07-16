"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface AdminGroupsSidebarState {
  readonly selectedGroupId: string;
  readonly setSelectedGroupId: (groupId: string) => void;
}

const AdminGroupsSidebarContext =
  createContext<AdminGroupsSidebarState | null>(null);

export function AdminGroupsSidebarProvider({
  children,
}: {
  readonly children: ReactNode;
}) {
  const [selectedGroupId, setSelectedGroupId] = useState("");

  const value = useMemo(
    () => ({ selectedGroupId, setSelectedGroupId }),
    [selectedGroupId],
  );

  return (
    <AdminGroupsSidebarContext.Provider value={value}>
      {children}
    </AdminGroupsSidebarContext.Provider>
  );
}

export function useAdminGroupsSidebar(): AdminGroupsSidebarState | null {
  return useContext(AdminGroupsSidebarContext);
}
