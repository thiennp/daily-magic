import { describe, expect, it } from "vitest";

import { restoreMessengerScrollAfterPrepend } from "@/features/projects/messenger/utils/restoreMessengerScrollAfterPrepend";

describe("restoreMessengerScrollAfterPrepend", () => {
  it("offsets scrollTop by the growth in scrollHeight", () => {
    const element = {
      scrollHeight: 1000,
      scrollTop: 0,
    };
    restoreMessengerScrollAfterPrepend({
      element: element as HTMLElement,
      previousScrollHeight: 600,
      previousScrollTop: 40,
    });
    expect(element.scrollTop).toBe(440);
  });
});
