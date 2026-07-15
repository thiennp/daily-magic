import {
  resolveAgentWitchLogoSurfaceClasses,
  type AgentWitchLogoSurface,
} from "@/components/branding/resolveAgentWitchLogoSurfaceClasses";

interface AgentWitchLogoMarkProps {
  readonly className?: string;
  readonly surface?: AgentWitchLogoSurface;
}

export default function AgentWitchLogoMark({
  className,
  surface = "adaptive",
}: AgentWitchLogoMarkProps) {
  const surfaceClasses = resolveAgentWitchLogoSurfaceClasses(surface);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? surfaceClasses.root}
      aria-hidden
      focusable="false"
    >
      <path d="M12 2L2 12l10 10 10-10L12 2z" className={surfaceClasses.markFill} />
      <path
        d="M12 6v12m-6-6h12"
        className={surfaceClasses.markCross}
        strokeWidth="2.5"
      />
      <path
        d="M15.5 8.5l-7 7"
        className={surfaceClasses.markSlash}
        strokeWidth="1.5"
      />
    </svg>
  );
}
