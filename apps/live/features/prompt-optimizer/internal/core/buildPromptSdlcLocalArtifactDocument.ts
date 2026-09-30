import { AGENT_WITCH_LOCAL_APP_STYLES } from "../../../shell/internal/core/agentWitchLocalAppStyles";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/** Full HTML document with AWL styles for screenshot / walkthrough artifacts. */
export const buildPromptSdlcLocalArtifactDocument = (input: {
  readonly title: string;
  readonly body: string;
}): string => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(input.title)}</title>
<style>${AGENT_WITCH_LOCAL_APP_STYLES}</style>
</head>
<body>${input.body}</body>
</html>`;
