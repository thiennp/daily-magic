import { APP_SURFACE_BASH_TERMINAL_PRE_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

interface RepairThisComputerCommandBlockProps {
  readonly label: string;
  readonly command: string;
}

export default function RepairThisComputerCommandBlock({
  label,
  command,
}: RepairThisComputerCommandBlockProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-900 dark:text-white/90">
        {label}
      </p>
      <pre className={APP_SURFACE_BASH_TERMINAL_PRE_CLASS}>
        <code>{command}</code>
      </pre>
    </div>
  );
}
