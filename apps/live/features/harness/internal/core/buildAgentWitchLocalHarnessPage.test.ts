import vm from "node:vm";
import { describe, expect, it } from "vitest";

import {
  buildAgentWitchLocalHarnessPageBody,
  buildLocalHarnessRevealClientScript,
  parseHarnessSubmitFormBody,
} from "./buildAgentWitchLocalHarnessPage";
import type { LocalHarnessRevealResult } from "./localHarness/revealLocalHarnessCandidates.types";

const FOLDER_PICKER_UNAVAILABLE_MESSAGE =
  "Folder picker is only available on the Mac that runs Agent Witch. Type the folder path instead.";

interface PickFolderResponse {
  readonly ok: boolean;
  readonly payload: unknown;
  readonly reject?: boolean;
}

interface PickFolderRunResult {
  readonly statusText: string;
  readonly statusHidden: boolean;
  readonly scanValue: string;
  readonly alerts: readonly string[];
}

const isPickFolderRunResult = (
  value: unknown,
): value is PickFolderRunResult => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (
    !("statusText" in value) ||
    !("statusHidden" in value) ||
    !("scanValue" in value) ||
    !("alerts" in value)
  ) {
    return false;
  }

  const { statusText, statusHidden, scanValue, alerts } = value;
  return (
    typeof statusText === "string" &&
    typeof statusHidden === "boolean" &&
    typeof scanValue === "string" &&
    Array.isArray(alerts) &&
    alerts.every((entry) => typeof entry === "string")
  );
};

const runPickFolderClicks = async (input: {
  readonly responses: readonly PickFolderResponse[];
  readonly includeStatus?: boolean;
}): Promise<PickFolderRunResult> => {
  const script = buildLocalHarnessRevealClientScript();
  const includeStatus = input.includeStatus !== false;
  const context = vm.createContext({
    responses: [...input.responses],
    includeStatus,
    script,
  });
  const source = `(async () => {
    const alerts = [];
    class HTMLElement {
      constructor() {
        this.hidden = false;
        this.textContent = "";
        this.listeners = new Map();
      }
      addEventListener(type, listener) {
        const existing = this.listeners.get(type) ?? [];
        this.listeners.set(type, [...existing, listener]);
      }
      async dispatch(type) {
        const listeners = this.listeners.get(type) ?? [];
        for (const listener of listeners) {
          await listener();
        }
      }
    }
    class HTMLInputElement extends HTMLElement {
      constructor() {
        super();
        this.value = "";
        this.dataset = {};
      }
    }
    class HTMLButtonElement extends HTMLElement {}
    const scanInput = new HTMLInputElement();
    const revealBtn = new HTMLButtonElement();
    const stopBtn = new HTMLButtonElement();
    const pickFolder = new HTMLButtonElement();
    const status = new HTMLElement();
    status.hidden = true;
    const elements = new Map([
      ["scanFolder", scanInput],
      ["revealStart", revealBtn],
      ["revealStop", stopBtn],
      ["pickFolder", pickFolder],
    ]);
    if (includeStatus) {
      elements.set("pickFolderStatus", status);
    }
    const document = {
      getElementById(id) {
        return elements.get(id) ?? null;
      },
    };
    const window = {
      alert(message) {
        alerts.push(String(message));
      },
      location: { href: "" },
    };
    const fetch = async () => {
      const next = responses.shift();
      if (next === undefined || next.reject === true) {
        throw new Error("network");
      }
      return {
        ok: next.ok,
        json: async () => next.payload,
      };
    };
    const run = new Function(
      "document",
      "window",
      "fetch",
      "HTMLElement",
      "HTMLInputElement",
      "HTMLButtonElement",
      script,
    );
    run(document, window, fetch, HTMLElement, HTMLInputElement, HTMLButtonElement);
    await pickFolder.dispatch("click");
    if (responses.length > 0) {
      await pickFolder.dispatch("click");
    }
    return {
      statusText: status.textContent,
      statusHidden: status.hidden,
      scanValue: scanInput.value,
      alerts,
    };
  })()`;

  const evaluated: unknown = vm.runInContext(source, context);
  if (
    typeof evaluated !== "object" ||
    evaluated === null ||
    !("then" in evaluated) ||
    typeof evaluated.then !== "function"
  ) {
    throw new Error("Folder picker script did not return a promise");
  }

  const result: unknown = await evaluated;
  if (!isPickFolderRunResult(result)) {
    throw new Error("Folder picker script returned an unexpected result");
  }

  return result;
};

const revealFixture: LocalHarnessRevealResult = {
  scanRoots: ["/Users/me/projects"],
  sets: [
    {
      proposedSlug: "agents",
      proposedName: "agents",
      sourceRoot: "/Users/me/repo/agents/.cursor",
      repoPath: "/Users/me/repo",
      items: [
        {
          id: "rule-1",
          kind: "rule",
          title: "Demo rule",
          sourcePath: "/Users/me/repo/agents/.cursor/rules/demo.mdc",
          relativePath: "rules/demo.mdc",
          selected: true,
        },
      ],
    },
  ],
};

describe("buildAgentWitchLocalHarnessPageBody", () => {
  it("does not pre-check revealed sets (HARNESS-001)", () => {
    const html = buildAgentWitchLocalHarnessPageBody({
      scanFolder: "/Users/me/projects",
      reveal: revealFixture,
      installed: { manifestUpdatedAt: null, sets: [] },
      cloudAppOrigin: "https://www.agentwitch.com",
      importSectionExpanded: true,
    });

    expect(html).toContain('name="includeSet"');
    expect(html).not.toContain('name="includeSet" value="0" checked');
  });

  it("links playbook install to Console marketplace", () => {
    const html = buildAgentWitchLocalHarnessPageBody({
      scanFolder: "",
      reveal: null,
      installed: { manifestUpdatedAt: null, sets: [] },
      cloudAppOrigin: "https://www.agentwitch.com",
      importSectionExpanded: false,
    });

    expect(html).toContain("Install playbooks in Agent Witch Console");
    expect(html).toContain('href="https://www.agentwitch.com/marketplace"');
    expect(html).not.toContain("Install playbooks on Agent Witch Live");
  });

  it("shows a status line under Choose folder when the picker cannot run", () => {
    const html = buildAgentWitchLocalHarnessPageBody({
      scanFolder: "",
      reveal: null,
      installed: { manifestUpdatedAt: null, sets: [] },
      cloudAppOrigin: "https://www.agentwitch.com",
      importSectionExpanded: true,
    });

    expect(html).toContain('id="pickFolder"');
    expect(html).toContain(
      '<p class="muted" id="pickFolderStatus" hidden></p>',
    );
    expect(html).toContain(FOLDER_PICKER_UNAVAILABLE_MESSAGE);
    expect(html.indexOf('id="pickFolder"')).toBeLessThan(
      html.indexOf('id="pickFolderStatus"'),
    );
  });
});

describe("buildLocalHarnessRevealClientScript folder picker", () => {
  it("writes the Mac-only message when the dialog is cancelled", async () => {
    const result = await runPickFolderClicks({
      responses: [{ ok: true, payload: { cancelled: true } }],
    });

    expect(result.statusText).toBe(FOLDER_PICKER_UNAVAILABLE_MESSAGE);
    expect(result.statusHidden).toBe(false);
    expect(result.scanValue).toBe("");
    expect(result.alerts).toEqual([]);
  });

  it("writes the Mac-only message when the response is not ok", async () => {
    const result = await runPickFolderClicks({
      responses: [{ ok: false, payload: { path: "/Users/me/repo" } }],
    });

    expect(result.statusText).toBe(FOLDER_PICKER_UNAVAILABLE_MESSAGE);
    expect(result.scanValue).toBe("");
    expect(result.alerts).toEqual([]);
  });

  it("writes the Mac-only message when the path is missing", async () => {
    const result = await runPickFolderClicks({
      responses: [{ ok: true, payload: {} }],
    });

    expect(result.statusText).toBe(FOLDER_PICKER_UNAVAILABLE_MESSAGE);
    expect(result.scanValue).toBe("");
  });

  it("fills the scan folder from a successful path and clears the status", async () => {
    const result = await runPickFolderClicks({
      responses: [
        { ok: true, payload: { cancelled: true } },
        { ok: true, payload: { path: "/Users/me/repo" } },
      ],
    });

    expect(result.scanValue).toBe("/Users/me/repo");
    expect(result.statusText).toBe("");
    expect(result.statusHidden).toBe(true);
    expect(result.alerts).toEqual([]);
  });

  it("alerts only when the status line is missing", async () => {
    const result = await runPickFolderClicks({
      includeStatus: false,
      responses: [{ ok: true, payload: { cancelled: true } }],
    });

    expect(result.alerts).toEqual([FOLDER_PICKER_UNAVAILABLE_MESSAGE]);
    expect(result.scanValue).toBe("");
  });
});

describe("parseHarnessSubmitFormBody", () => {
  it("omits sets that were not checked for submit (HARNESS-001)", () => {
    const body = new URLSearchParams();
    body.set("setCount", "1");
    body.set("setSlug-0", "agents");
    body.set("setGroupIndex-0", "0");
    body.set("groupLabel-0", "agents");

    const sets = parseHarnessSubmitFormBody(body, revealFixture);

    expect(sets[0]?.items.every((item) => item.include === false)).toBe(true);
  });

  it("uses edited group label as harness set name on submit", () => {
    const body = new URLSearchParams();
    body.set("setCount", "1");
    body.set("includeSet", "0");
    body.set("setSlug-0", "agents");
    body.set("setGroupIndex-0", "0");
    body.set("groupLabel-0", "My custom agents pack");

    const sets = parseHarnessSubmitFormBody(body, revealFixture);

    expect(sets).toHaveLength(1);
    expect(sets[0]?.name).toBe("My custom agents pack");
    expect(sets[0]?.slug).toBe("agents");
    expect(sets[0]?.items.every((item) => item.include === true)).toBe(true);
  });
});
