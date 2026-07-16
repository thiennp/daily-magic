import AdminSidebar from "@/features/shell/AdminSidebar";
import AppShell from "@/features/shell/AppShell";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell sidebar={<AdminSidebar />}>{children}</AppShell>;
}
