import { AGENT_WITCH_LOCAL_DEEP_LINK_SCHEME } from "@agent-witch/shared/network";

export interface ProjectEditOnMacLinkProps {
  readonly target?: "_blank";
  readonly rel?: string;
}

/**
 * DF-033: `agentwitch-local://` deep links must open in place — a
 * `target="_blank"` custom-scheme link leaves an empty browser tab behind
 * while macOS raises the Mac app. Web hrefs (e.g. Connect) keep a new tab.
 */
const resolveProjectEditOnMacLinkProps = (
  href: string,
): ProjectEditOnMacLinkProps =>
  href.startsWith(`${AGENT_WITCH_LOCAL_DEEP_LINK_SCHEME}:`)
    ? {}
    : { target: "_blank", rel: "noopener noreferrer" };

export default resolveProjectEditOnMacLinkProps;
