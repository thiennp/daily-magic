import DemoAppLayout from "@/features/demo/DemoAppLayout";

interface DemoLayoutProps {
  readonly children: React.ReactNode;
}

export default function DemoLayout({ children }: DemoLayoutProps) {
  return <DemoAppLayout>{children}</DemoAppLayout>;
}
