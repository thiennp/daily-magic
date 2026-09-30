import { describe, expect, it } from "vitest";

import {
  AWL_DIALOG_CLOSE_ICON_HTML,
  renderAwlDialogCloseButton,
} from "./renderAwlDialogCloseButton";

describe("renderAwlDialogCloseButton", () => {
  it("renders an accessible icon close control without visible text", () => {
    const html = renderAwlDialogCloseButton({ type: "submit" });

    expect(html).toContain('class="history-dialog-close"');
    expect(html).toContain('aria-label="Close"');
    expect(html).toContain('type="submit"');
    expect(html).toContain(AWL_DIALOG_CLOSE_ICON_HTML);
    expect(html).not.toContain(">Close<");
  });

  it("supports optional id for dialog scripts", () => {
    const html = renderAwlDialogCloseButton({
      type: "button",
      id: "history-detail-close",
    });

    expect(html).toContain('id="history-detail-close"');
    expect(html).toContain('type="button"');
  });
});
