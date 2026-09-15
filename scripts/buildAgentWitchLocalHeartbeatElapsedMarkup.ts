import { formatAgentWitchHeartbeatElapsed } from "./formatAgentWitchHeartbeatElapsed";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const buildAgentWitchLocalHeartbeatElapsedMarkup = (
  lastHeartbeatAt: string | null,
): string => {
  if (lastHeartbeatAt === null) {
    return `<span class="js-heartbeat-elapsed">never</span>`;
  }

  const escapedAt = escapeHtml(lastHeartbeatAt);
  const initial = escapeHtml(formatAgentWitchHeartbeatElapsed(lastHeartbeatAt));

  return `<span class="js-heartbeat-elapsed" data-heartbeat-at="${escapedAt}">${initial}</span>`;
};

export const AGENT_WITCH_LOCAL_HEARTBEAT_ELAPSED_LIVE_SCRIPT = `(function () {
  var formatElapsed = function (iso, nowMs) {
    if (!iso) return "never";
    var t = Date.parse(iso);
    if (Number.isNaN(t)) return "unknown";
    var elapsedSec = Math.max(0, Math.floor((nowMs - t) / 1000));
    if (elapsedSec < 60) return elapsedSec + "s";
    var totalMinutes = Math.floor(elapsedSec / 60);
    var remainingSeconds = elapsedSec % 60;
    if (totalMinutes < 60) {
      return remainingSeconds > 0
        ? totalMinutes + "m " + remainingSeconds + "s"
        : totalMinutes + "m";
    }
    var totalHours = Math.floor(elapsedSec / 3600);
    var remainingMinutes = Math.floor((elapsedSec % 3600) / 60);
    return remainingMinutes > 0
      ? totalHours + "h " + remainingMinutes + "m"
      : totalHours + "h";
  };
  var tick = function () {
    var nowMs = Date.now();
    document.querySelectorAll("[data-heartbeat-at]").forEach(function (el) {
      var iso = el.getAttribute("data-heartbeat-at");
      if (!iso) return;
      el.textContent = formatElapsed(iso, nowMs);
    });
  };
  tick();
  window.setInterval(tick, 1000);
})();`;
