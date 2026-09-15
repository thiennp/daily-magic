import type { AgentWitchLocalInstallUpdateOffer } from "./resolveAgentWitchLocalInstallUpdateOffer";

export const buildAgentWitchLocalInstallUpdateHeaderButtonHtml = (
  offer: AgentWitchLocalInstallUpdateOffer,
): string => {
  if (!offer.updateAvailable || offer.remoteBundleVersion === null) {
    return "";
  }

  return `<form class="header-update-form" method="POST" action="/api/update">
      <button class="btn btn-primary btn-compact" type="submit">Update</button>
    </form>`;
};

export const buildAgentWitchLocalInstallUpdatePromptHtml = (
  offer: AgentWitchLocalInstallUpdateOffer,
): string => {
  if (!offer.updateAvailable || offer.remoteBundleVersion === null) {
    return "";
  }

  return `<section class="card update-banner">
      <p class="eyebrow">Update available</p>
      <h2 class="update-banner-title">A newer Agent Witch is ready</h2>
      <p class="lede">Install the latest Mac client from the cloud.</p>
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
    return `<div class="alert-success">Update finished. This Mac may restart the Agent Witch client.</div>`;
  }

  if (flash === "failed") {
    return `<div class="alert-error">Update could not finish. Try again or check Errors on this console.</div>`;
  }

  return "";
};
