const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchLocalCloudBanner = (input: {
  readonly cloudAppOrigin: string;
  readonly manageHref: string;
  readonly manageLabel: string;
  readonly body: string;
  readonly syncMessage?: string | null;
  readonly syncOk?: boolean;
}): string => {
  const syncClass =
    input.syncOk === false
      ? "local-cloud-banner local-cloud-banner-warn"
      : "local-cloud-banner";
  const syncLine =
    input.syncMessage !== undefined &&
    input.syncMessage !== null &&
    input.syncMessage.length > 0
      ? `<p class="local-cloud-banner-sync">${escapeHtml(input.syncMessage)}</p>`
      : "";

  const manageHref = escapeHtml(input.manageHref);
  const manageLabel = escapeHtml(input.manageLabel);

  return `<div class="${syncClass}">
      <p class="local-cloud-banner-lede">${escapeHtml(input.body)}</p>
      ${syncLine}
      <p class="local-cloud-banner-actions"><a class="field-link" href="${manageHref}" target="_blank" rel="noopener noreferrer">${manageLabel} ↗</a></p>
    </div>`;
};
