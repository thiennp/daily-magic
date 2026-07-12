import AgentWitchLogoMark from "@/components/branding/AgentWitchLogoMark";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

interface AgentWitchLogoProps {
  readonly className?: string;
  readonly markClassName?: string;
  readonly textClassName?: string;
  readonly showText?: boolean;
}

export default function AgentWitchLogo({
  className,
  markClassName,
  textClassName = "text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100",
  showText = true,
}: AgentWitchLogoProps) {
  const wrapperClassName = className
    ? `flex items-center gap-2 ${className}`
    : "flex items-center gap-2";

  return (
    <span className={wrapperClassName}>
      <AgentWitchLogoMark className={markClassName} />
      {showText ? (
        <span className={textClassName}>{AGENT_WITCH_PRODUCT_NAME}</span>
      ) : null}
    </span>
  );
}
