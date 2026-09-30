export const PROMPT_SDLC_LOCAL_FORM_SCRIPT = `<script>
(() => {
  const fit = (area) => {
    area.style.height = "auto";
    area.style.height = area.scrollHeight + "px";
  };
  document.querySelectorAll("form.sdlc-form textarea").forEach((area) => {
    fit(area);
    area.addEventListener("input", () => fit(area));
  });
  const runButtons = [...document.querySelectorAll("[data-sdlc-run]")];
  const hint = document.querySelector("[data-sdlc-run-hint]");
  const slots = [...document.querySelectorAll("[data-writer-status]")];
  const viewingFinishedRun =
    document.querySelector("#prompt-optimizer-run .sdlc-run-badge-done") !== null ||
    document.querySelector("#prompt-optimizer-run .sdlc-run-badge-finished") !== null;
  const staticPreview = window.location.protocol === "file:";
  const paintRunHint = () => {
    if (!(hint instanceof HTMLElement)) return;
    if (runButtons.length === 0) {
      hint.textContent = "";
      hint.hidden = true;
      return;
    }
    const fields = document.querySelector(".sdlc-fields");
    if (fields instanceof HTMLFieldSetElement && fields.disabled) {
      hint.textContent = "This run is in progress. Use the gate or This run panel above.";
      hint.hidden = false;
      return;
    }
    const blocked = runButtons.some((btn) => btn instanceof HTMLButtonElement && btn.disabled);
    if (!blocked) {
      hint.textContent = "";
      hint.hidden = true;
      return;
    }
    const compose = readComposeFields();
    if (!compose.hasGoal || !compose.hasPrompt) {
      hint.textContent = "Fill in the goal and prompt before you run.";
      hint.hidden = false;
      return;
    }
    if (runButtons.some((btn) => btn instanceof HTMLButtonElement && btn.dataset.canRun !== "true")) {
      hint.textContent = "Fill in the goal and prompt before you run.";
      hint.hidden = false;
      return;
    }
    const pending = slots.find((slot) => slot.dataset.ready !== "true");
    if (pending) {
      const writer = pending.dataset.writer ?? "writer";
      if (writer.length === 0) {
        hint.textContent = "Choose who scores and who rewrites the prompt.";
      } else if (writer === "manual") {
        hint.textContent = "You chose a manual step. Run will pause when that step is due.";
      } else if (pending.textContent === "Checking…") {
        hint.textContent = "Checking that the chosen writer is ready…";
      } else {
        hint.textContent = pending.textContent.trim().length > 0 ? pending.textContent : "Fix the writer error above, then run again.";
      }
      hint.hidden = false;
      return;
    }
    hint.textContent = "Run is not available yet.";
    hint.hidden = false;
  };
  const readComposeFields = () => {
    const form = document.querySelector("form.sdlc-form");
    if (!(form instanceof HTMLFormElement)) {
      return { hasGoal: false, hasPrompt: false, prompt: "", folder: "", judge: "" };
    }
    const goal = form.querySelector('[name="goal"]');
    const prompt = form.querySelector('[name="prompt"]');
    const folder = form.querySelector('[name="folder"]');
    const judgeSelect = form.querySelector('[data-writer-select="judge"]');
    const goalText = goal instanceof HTMLTextAreaElement ? goal.value.trim() : "";
    const promptText = prompt instanceof HTMLTextAreaElement ? prompt.value.trim() : "";
    const folderText = folder instanceof HTMLInputElement ? folder.value.trim() : "";
    const judgeText =
      judgeSelect instanceof HTMLSelectElement ? judgeSelect.value.trim() : "";
    return {
      hasGoal: goalText.length > 0,
      hasPrompt: promptText.length > 0,
      prompt: promptText,
      folder: folderText,
      judge: judgeText,
    };
  };
  const syncGoalSuggestions = () => {
    const block = document.querySelector(".sdlc-goal-suggestions");
    if (!(block instanceof HTMLElement)) return;
    const fields = readComposeFields();
    const match =
      block.dataset.suggestPrompt === fields.prompt &&
      block.dataset.suggestFolder === fields.folder &&
      block.dataset.suggestJudge === fields.judge;
    if (!match) block.remove();
  };
  const bindGoalSuggestionRadios = () => {
    const form = document.querySelector("form.sdlc-form");
    const goal = form?.querySelector('[name="goal"]');
    const block = document.querySelector(".sdlc-goal-suggestions");
    if (!(goal instanceof HTMLTextAreaElement) || !(block instanceof HTMLElement)) {
      return;
    }
    const goals = (() => {
      try {
        const parsed = JSON.parse(block.dataset.suggestGoals ?? "[]");
        return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
      } catch {
        return [];
      }
    })();
    document.querySelectorAll('input[name="goalSuggestion"]').forEach((radio) => {
      if (!(radio instanceof HTMLInputElement)) return;
      radio.addEventListener("change", () => {
        if (!radio.checked) return;
        if (radio.value === "none") {
          goal.focus();
          return;
        }
        const index = Number(radio.value);
        const picked = goals[index];
        if (typeof picked === "string") {
          goal.value = picked;
          goal.dispatchEvent(new Event("input", { bubbles: true }));
        }
        paintReady();
      });
    });
  };
  const paintReady = () => {
    const fields = document.querySelector(".sdlc-fields");
    const fieldsDisabled =
      fields instanceof HTMLFieldSetElement && fields.disabled;
    const compose = readComposeFields();
    syncGoalSuggestions();
    const suggestBtn = document.querySelector("[data-sdlc-suggest-goals]");
    if (suggestBtn instanceof HTMLButtonElement) {
      const judgeSlot = document.querySelector('[data-writer-status="judge"]');
      const judgeReady =
        compose.judge === "manual" ||
        (judgeSlot instanceof HTMLElement && judgeSlot.dataset.ready === "true");
      suggestBtn.disabled =
        fieldsDisabled ||
        !compose.hasPrompt ||
        compose.judge.length === 0 ||
        compose.judge === "manual" ||
        !judgeReady;
    }
    runButtons.forEach((btn) => {
      if (!(btn instanceof HTMLButtonElement)) return;
      if (fieldsDisabled) {
        btn.disabled = true;
        return;
      }
      btn.disabled =
        btn.dataset.canRun !== "true" ||
        !compose.hasGoal ||
        !compose.hasPrompt ||
        slots.some((slot) => slot.dataset.ready !== "true");
    });
    paintRunHint();
    paintWriterSummary();
  };
  const paintWriterSummary = () => {
    const summary = document.querySelector("[data-sdlc-writer-summary]");
    const compose = document.getElementById("prompt-optimizer-compose");
    if (compose instanceof HTMLElement) {
      compose.classList.toggle("sdlc-compose-viewing-result", viewingFinishedRun);
    }
    if (!(summary instanceof HTMLElement)) return;
    const blocked = slots.filter(
      (slot) =>
        slot.dataset.ready !== "true" &&
        slot.classList.contains("alert-error"),
    );
    if (viewingFinishedRun) {
      const anyWarn = slots.some(
        (slot) =>
          slot.classList.contains("alert-warn") ||
          slot.classList.contains("alert-error"),
      );
      if (anyWarn) {
        summary.hidden = false;
        summary.className = "alert-warn sdlc-writer-summary";
        summary.textContent =
          "Writers were not verified for this finished run. Check CLI login before your next run.";
        return;
      }
    } else if (blocked.length > 0) {
      summary.hidden = false;
      summary.className = "alert-error sdlc-writer-summary";
      summary.textContent =
        blocked[0].textContent?.trim() ||
        "Fix the writer error above, then run again.";
      return;
    }
    summary.hidden = true;
    summary.textContent = "";
    summary.className = "sdlc-writer-summary";
  };
  const paintWriter = async (writer) => {
    const targets = slots.filter((slot) => slot.dataset.writer === writer);
    if (writer.length === 0) {
      targets.forEach((slot) => {
        slot.textContent = "Choose who does this step.";
        slot.dataset.ready = "false";
        slot.className = "muted";
      });
      paintReady();
      return;
    }
    if (writer === "manual") {
      targets.forEach((slot) => {
        slot.textContent = "You will do this step.";
        slot.dataset.ready = "true";
        slot.className = "muted";
      });
      paintReady();
      return;
    }
    if (staticPreview) {
      targets.forEach((slot) => {
        slot.textContent = "Writer check skipped (static preview).";
        slot.dataset.ready = "true";
        slot.className = "muted";
      });
      paintReady();
      return;
    }
    targets.forEach((slot) => {
      slot.textContent = "Checking…";
      slot.dataset.ready = "false";
    });
    paintReady();
    const url = "/prompt-optimizer?writer-check=" + encodeURIComponent(writer);
    const response = await fetch(url, { cache: "no-store" }).catch(() => null);
    const body = response === null || !response.ok ? null : await response.json().catch(() => null);
    const message = body && typeof body.message === "string" ? body.message : "The writer did not reply.";
    const ok = body !== null && body.ok === true;
    targets.forEach((slot) => {
      slot.textContent = message;
      if (viewingFinishedRun && !ok) {
        slot.dataset.ready = "true";
        slot.className = "alert-warn";
        return;
      }
      slot.dataset.ready = ok ? "true" : "false";
      slot.className = ok ? "muted" : "alert-error";
    });
    paintReady();
  };
  const rememberSelection = () => {
    const form = document.querySelector("form.sdlc-form");
    if (!(form instanceof HTMLFormElement)) return;
    const fields = form.querySelector(".sdlc-fields");
    if (fields instanceof HTMLFieldSetElement && fields.disabled) return;
    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => {
      if (typeof value === "string") body.append(key, value);
    });
    body.set("intent", "remember");
    void fetch("/prompt-optimizer", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      cache: "no-store",
    }).catch(() => null);
  };
  const syncRunnerFromJudge = () => {
    const judgeSelect = document.querySelector('[data-writer-select="judge"]');
    const runnerSelect = document.querySelector('[data-writer-select="runner"]');
    if (!(judgeSelect instanceof HTMLSelectElement)) return;
    if (!(runnerSelect instanceof HTMLSelectElement)) return;
    if (runnerSelect.value.length > 0) return;
    if (judgeSelect.value.length === 0 || judgeSelect.value === "manual") return;
    runnerSelect.value = judgeSelect.value;
    const slot = document.querySelector('[data-writer-status="runner"]');
    if (slot instanceof HTMLElement) slot.dataset.writer = judgeSelect.value;
    void paintWriter(judgeSelect.value);
  };
  document.querySelectorAll("[data-writer-select]").forEach((select) => {
    select.addEventListener("change", () => {
      rememberSelection();
      const slot = document.querySelector('[data-writer-status="' + select.dataset.writerSelect + '"]');
      if (!slot) return;
      slot.dataset.writer = select.value;
      if (select instanceof HTMLSelectElement && select.dataset.writerSelect === "judge") {
        syncRunnerFromJudge();
      }
      void paintWriter(select.value);
    });
  });
  syncRunnerFromJudge();
  const folderInput = document.querySelector('form.sdlc-form [name="folder"]');
  if (folderInput instanceof HTMLInputElement) {
    folderInput.addEventListener("change", rememberSelection);
    folderInput.addEventListener("blur", rememberSelection);
    folderInput.addEventListener("input", () => {
      syncGoalSuggestions();
      paintReady();
    });
  }
  const goalInput = document.querySelector('form.sdlc-form [name="goal"]');
  const promptInput = document.querySelector('form.sdlc-form [name="prompt"]');
  if (goalInput instanceof HTMLTextAreaElement) {
    goalInput.addEventListener("input", paintReady);
  }
  if (promptInput instanceof HTMLTextAreaElement) {
    promptInput.addEventListener("input", () => {
      syncGoalSuggestions();
      paintReady();
    });
  }
  bindGoalSuggestionRadios();
  [...new Set(slots.map((slot) => slot.dataset.writer))].forEach((writer) => {
    if (writer) void paintWriter(writer);
  });
  const pass = document.querySelector("[data-sdlc-pass]");
  const paintPass = () => {
    if (!(pass instanceof HTMLInputElement)) return;
    const score = Number(pass.value);
    const weak = Math.floor(score / 2);
    const close = Math.max(weak + 1, score - 20);
    const scale = pass.parentElement;
    if (scale) {
      scale.style.setProperty("--sdlc-weak", weak + "%");
      scale.style.setProperty("--sdlc-close", close + "%");
      scale.style.setProperty("--sdlc-pass", score + "%");
    }
    const value = document.querySelector("[data-sdlc-pass-value]");
    const legend = document.querySelector("[data-sdlc-pass-legend]");
    if (value) value.textContent = String(score);
    if (legend) {
      legend.textContent =
        "0–" +
        (weak - 1) +
        " bad · " +
        weak +
        "–" +
        (close - 1) +
        " weak · " +
        close +
        "–" +
        (score - 1) +
        " close · " +
        score +
        "–100 passes";
    }
  };
  if (pass instanceof HTMLInputElement) {
    pass.addEventListener("input", paintPass);
    paintPass();
  }
  const closeFieldTips = () => {
    document.querySelectorAll(".sdlc-tip[aria-expanded='true']").forEach((btn) => {
      if (btn instanceof HTMLButtonElement) btn.setAttribute("aria-expanded", "false");
    });
  };
  document.querySelectorAll(".sdlc-tip").forEach((btn) => {
    if (!(btn instanceof HTMLButtonElement)) return;
    const open = () => {
      closeFieldTips();
      btn.setAttribute("aria-expanded", "true");
    };
    btn.addEventListener("focus", open);
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      if (expanded) {
        btn.setAttribute("aria-expanded", "false");
      } else {
        open();
      }
    });
    btn.addEventListener("blur", () => btn.setAttribute("aria-expanded", "false"));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeFieldTips();
  });
  const setComposeMode = (mode) => {
    const form = document.querySelector("form.sdlc-form");
    if (!(form instanceof HTMLFormElement)) return;
    form.dataset.sdlcComposeMode = mode;
    document.querySelectorAll("[data-sdlc-compose-mode]").forEach((btn) => {
      if (!(btn instanceof HTMLButtonElement)) return;
      const active = btn.dataset.sdlcComposeMode === mode;
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    const classicOptions = document.querySelector(".sdlc-classic-loop-options");
    if (classicOptions instanceof HTMLDetailsElement) {
      classicOptions.open = mode === "classic";
    }
    const wizardLimits = document.querySelector("[data-sdlc-wizard-limits-callout]");
    const classicLimits = document.querySelector("[data-sdlc-classic-limits-callout]");
    if (wizardLimits instanceof HTMLElement) {
      wizardLimits.hidden = mode !== "wizard";
    }
    if (classicLimits instanceof HTMLElement) {
      classicLimits.hidden = mode !== "classic";
    }
    document.querySelectorAll("[data-sdlc-wizard-only]").forEach((node) => {
      if (node instanceof HTMLElement) node.hidden = mode !== "wizard";
    });
    const wizardBtn = runButtons.find(
      (btn) => btn instanceof HTMLButtonElement && btn.value === "run",
    );
    const classicBtn = runButtons.find(
      (btn) => btn instanceof HTMLButtonElement && btn.value === "run-classic",
    );
    if (wizardBtn instanceof HTMLButtonElement) {
      wizardBtn.classList.toggle("btn-primary", mode === "wizard");
      wizardBtn.classList.toggle("btn-secondary", mode !== "wizard");
    }
    if (classicBtn instanceof HTMLButtonElement) {
      classicBtn.classList.toggle("btn-primary", mode === "classic");
      classicBtn.classList.toggle("btn-secondary", mode !== "classic");
      classicBtn.hidden = mode !== "classic";
    }
    if (wizardBtn instanceof HTMLButtonElement) {
      wizardBtn.hidden = mode !== "wizard";
    }
  };
  document.querySelectorAll("[data-sdlc-compose-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!(btn instanceof HTMLButtonElement)) return;
      const mode = btn.dataset.sdlcComposeMode;
      if (mode === "wizard" || mode === "classic") setComposeMode(mode);
    });
  });
  setComposeMode("wizard");
  document.querySelectorAll("[data-sdlc-start-new-run], [data-sdlc-rerun-same]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const details = document.getElementById("prompt-optimizer-compose-details");
      if (details instanceof HTMLDetailsElement) details.open = true;
      document.getElementById("prompt-optimizer-compose")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
  paintReady();
  document.addEventListener("sdlc-run-finished", () => {
    const gateSlot = document.getElementById("prompt-optimizer-wizard-gate-slot");
    const atWizardGate =
      gateSlot !== null && gateSlot.innerHTML.trim().length > 0;
    if (!atWizardGate) {
      const fields = document.querySelector(".sdlc-fields");
      if (fields instanceof HTMLFieldSetElement) fields.disabled = false;
      document.querySelector("[data-sdlc-locked]")?.remove();
      const details = document.getElementById("prompt-optimizer-compose-details");
      if (details instanceof HTMLDetailsElement) {
        details.open = document.getElementById("prompt-optimizer-run") === null;
      }
      runButtons.forEach((btn) => {
        if (!(btn instanceof HTMLButtonElement)) return;
        if (btn.value === "run-classic") {
          btn.textContent = "Classic loop (90 / 10 rounds)";
        } else {
          btn.textContent = "Run";
        }
      });
      paintReady();
    }
  });
})();
</script>`;
