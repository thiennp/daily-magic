export const PROMPT_SDLC_LOCAL_LIVE_STYLE = "";

export const PROMPT_SDLC_LOCAL_LIVE_SCRIPT = `<script>
(() => {
  const root = document.getElementById("prompt-optimizer-run");
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
    const incomingGateSlot = holder.querySelector("#prompt-optimizer-wizard-gate-slot");
    const gateSlot = document.getElementById("prompt-optimizer-wizard-gate-slot");
    if (incomingGateSlot !== null && gateSlot !== null) {
      const hadGate = gateSlot.innerHTML.trim().length > 0;
      gateSlot.innerHTML = incomingGateSlot.innerHTML;
      const hasGate = gateSlot.innerHTML.trim().length > 0;
      if (hasGate && !hadGate) {
        gateSlot.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (hasGate) {
        const fields = document.querySelector(".sdlc-fields");
        if (fields instanceof HTMLFieldSetElement) fields.disabled = true;
      }
    }
    const incoming = holder.querySelector("#prompt-optimizer-run");
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
  const gateSlot = document.getElementById("prompt-optimizer-wizard-gate-slot");
  const activeStep = document.getElementById("prompt-optimizer-wizard-active-step");
  if (activeStep !== null) {
    activeStep.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (gateSlot !== null && gateSlot.querySelector(".sdlc-wizard-gate")) {
    gateSlot.scrollIntoView({ behavior: "smooth", block: "start" });
  }
})();
</script>`;
