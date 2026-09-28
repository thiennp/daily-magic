export const PROMPT_SDLC_LOCAL_LIVE_STYLE = `<style>
.sdlc-working { display: flex; gap: 0.75rem; align-items: flex-start; }
.sdlc-spin { width: 0.95rem; height: 0.95rem; margin-top: 0.35rem; border: 2px solid #d0d5dd; border-top-color: #1a44be; border-radius: 50%; animation: sdlc-spin 0.8s linear infinite; flex: none; }
@keyframes sdlc-spin { to { transform: rotate(360deg); } }
</style>`;

export const PROMPT_SDLC_LOCAL_LIVE_SCRIPT = `<script>
(() => {
  const root = document.getElementById("prompt-sdlc-run");
  if (!root) return;
  const paintElapsed = () => {
    const slot = root.querySelector("[data-elapsed]");
    const since = root.dataset.since;
    if (!slot || !since) return;
    const seconds = Math.max(0, Math.floor((Date.now() - Date.parse(since)) / 1000));
    const minutes = Math.floor(seconds / 60);
    const rest = String(seconds % 60).padStart(2, "0");
    slot.textContent = minutes > 0 ? minutes + "m " + rest + "s" : seconds + "s";
  };
  paintElapsed();
  setInterval(paintElapsed, 1000);
  const poll = async () => {
    if (root.dataset.live !== "true") return;
    const url = new URL(location.href);
    url.searchParams.set("fragment", "run");
    const response = await fetch(url, { cache: "no-store" }).catch(() => null);
    if (response === null || !response.ok) {
      setTimeout(poll, 2000);
      return;
    }
    const holder = document.createElement("div");
    holder.innerHTML = await response.text();
    const incoming = holder.querySelector("#prompt-sdlc-run");
    if (!incoming) {
      setTimeout(poll, 2000);
      return;
    }
    root.dataset.live = incoming.dataset.live ?? "";
    root.dataset.since = incoming.dataset.since ?? "";
    root.innerHTML = incoming.innerHTML;
    paintElapsed();
    if (root.dataset.live !== "true") {
      document.dispatchEvent(new Event("sdlc-run-finished"));
      return;
    }
    setTimeout(poll, 2000);
  };
  if (root.dataset.live === "true") setTimeout(poll, 2000);
})();
</script>`;
