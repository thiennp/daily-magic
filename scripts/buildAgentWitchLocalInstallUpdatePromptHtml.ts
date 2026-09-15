import type { AgentWitchLocalInstallUpdateOffer } from "./resolveAgentWitchLocalInstallUpdateOffer";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchLocalInstallUpdateHeaderButtonHtml = (
  offer: AgentWitchLocalInstallUpdateOffer,
): string => {
  if (!offer.updateAvailable || offer.remoteBundleVersion === null) {
    return "";
  }

  return `<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit" title="Install bundle ${escapeHtml(offer.remoteBundleVersion)}">Update</button>
    </form>`;
};

export const buildAgentWitchLocalInstallUpdatePromptHtml = (
  offer: AgentWitchLocalInstallUpdateOffer,
): string => {
  if (!offer.updateAvailable || offer.remoteBundleVersion === null) {
    return "";
  }

  const localLabel =
    offer.localBundleVersion !== null
      ? escapeHtml(offer.localBundleVersion)
      : "none";

  return `<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">New install bundle on Agent Witch</h2>
      <p class="lede">This Mac is on bundle <code>${localLabel}</code>. Cloud serves bundle <code>${escapeHtml(offer.remoteBundleVersion)}</code>.</p>
      <div class="actions">
        <form method="POST" action="/api/update">
          <button class="btn btn-primary" type="submit">Update now</button>
        </form>
      </div>
    </section>`;
};

export const buildAgentWitchLocalInstallUpdateFlashHtml = (
  flash: "ok" | "failed" | null,
): string => {
  if (flash === "ok") {
    return `<div class="alert-success">Install bundle update finished. The Mac client may restart.</div>`;
  }

  if (flash === "failed") {
    return `<div class="alert-error">Install bundle update failed. See Error log or self-update logs on Status.</div>`;
  }

  return "";
};
