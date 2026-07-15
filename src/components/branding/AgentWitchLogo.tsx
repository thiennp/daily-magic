import AgentWitchLogoMark from "@/components/branding/AgentWitchLogoMark";
import {
  resolveAgentWitchLogoSurfaceClasses,
  type AgentWitchLogoSurface,
} from "@/components/branding/resolveAgentWitchLogoSurfaceClasses";
import { AGENT_WITCH_PRODUCT_NAME } from "@/lib/agentWitch/agentWitchProductName.constant";

interface AgentWitchLogoProps {
  readonly className?: string;
  readonly markClassName?: string;
  readonly textClassName?: string;
  readonly showText?: boolean;
  readonly surface?: AgentWitchLogoSurface;
}

export default function AgentWitchLogo({
  className,
  markClassName,
  textClassName,
  showText = true,
  surface = "adaptive",
}: AgentWitchLogoProps) {
  const surfaceClasses = resolveAgentWitchLogoSurfaceClasses(surface);
  const wrapperClassName = className
    ? `flex items-center gap-2 ${className}`
    : "flex items-center gap-2";

  return (
    <span className={wrapperClassName}>
      <AgentWitchLogoMark
        className={markClassName ?? surfaceClasses.root}
        surface={surface}
      />
      {showText ? (
        <span className={textClassName ?? surfaceClasses.text}>
          {AGENT_WITCH_PRODUCT_NAME}
        </span>
      ) : null}
    </span>
  );
}
