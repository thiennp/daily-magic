import { describe, expect, it } from "vitest";
import { formatAgentLiveTerminalMarkersForDisplay } from "./formatAgentLiveTerminalMarkersForDisplay";

describe("formatAgentLiveTerminalMarkersForDisplay", () => {
  it("formats markers correctly and dedupes paragraphs", () => {
    const input = `agent-witch@linux ~ $ agy --sandbox -p "Run workflow…"
[[WAVE_PLAN]]
W|1|Confirm requirements|50
A|1.1|Inspect project|20
[[WAVE_STATUS]]
1.1|working
[[PROGRESS]]
Inspected app repository
Examined the static HTML app.

### Checkpoint 1: Confirm Details
We are ready to implement.
- App folder: /home/box/qa-vibe-app

[[AWAITING_INPUT]]
Do you confirm the vibe?
[[CHECKPOINT_QA]]
Q: Do you confirm the vibe?
A: Confirmed.
agent-witch@linux ~ $ 
[[PROGRESS]]
Inspected app repository
Examined the static HTML app.

### Checkpoint 1: Confirm Details
We are ready to implement.
- App folder: /home/box/qa-vibe-app

[[AWAITING_INPUT]]
Do you confirm the vibe?
## Summary
Added dark mode.`;

    const result = formatAgentLiveTerminalMarkersForDisplay(input);
    expect(result).not.toContain("[[");
    expect(result).not.toContain("W|1|");
    expect(result).not.toContain("1.1|working");

    // "Agent asks: Do you confirm the vibe?" once
    expect(result.match(/Agent asks: Do you confirm the vibe\?/g)?.length).toBe(
      1,
    );

    // "Your answer: Confirmed." once
    expect(result.match(/Your answer: Confirmed\./g)?.length).toBe(1);

    // "### Checkpoint 1: Confirm Details" once
    expect(result.match(/### Checkpoint 1: Confirm Details/g)?.length).toBe(1);

    // "## Summary" kept
    expect(result).toContain("## Summary");
    expect(result).toContain("Added dark mode.");
  });

  it("replaces error: interrupted and dedupes Stopped by user. twice in a row", () => {
    const input = `error: interrupted
Stopped by user.
error: interrupted.
Stopped by user.`;
    const result = formatAgentLiveTerminalMarkersForDisplay(input);
    expect(result).not.toContain("error: interrupted");
    expect(result.match(/Stopped by user\./g)?.length).toBe(1);
  });

  it("uses Stopped. when Stopped by user. is not present", () => {
    const input = `Some log\nerror: interrupted`;
    const result = formatAgentLiveTerminalMarkersForDisplay(input);
    expect(result).not.toContain("error: interrupted");
    expect(result).toContain("Stopped.");
  });
});
