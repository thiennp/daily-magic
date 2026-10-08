import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

type Captured = {
  modalOnClose?: () => void;
  quickReplySelect?: (response: string) => void;
  quickReplies?: readonly { label: string; response: string }[];
  sendOnClick?: () => void;
  sendDisabled?: boolean;
};
const captured: Captured = {};

vi.mock("@/components/ui/modal", () => ({
  Modal: ({
    children,
    onClose,
  }: {
    children: ReactNode;
    onClose: () => void;
  }) => {
    captured.modalOnClose = onClose;
    return children;
  },
}));
vi.mock("@/components/ui/button/Button", () => ({
  default: ({
    children,
    onClick,
    disabled,
  }: {
    children: ReactNode;
    onClick: () => void;
    disabled?: boolean;
  }) => {
    captured.sendOnClick = onClick;
    captured.sendDisabled = disabled;
    return children;
  },
}));
vi.mock("@/features/dispatch/AgentRunInputQuickReplies", () => ({
  default: (props: {
    replies: readonly { label: string; response: string }[];
    onSelect: (response: string) => void;
  }) => {
    captured.quickReplies = props.replies;
    captured.quickReplySelect = props.onSelect;
    return null;
  },
}));

import AgentRunInputModal from "@/features/dispatch/AgentRunInputModal";

const CANNED =
  "Do not commit or push. Do not touch .git. Leave all changes in the working tree and stop after npm run build passes.";

const render = (onSubmit: (r: string) => void, onDismiss: () => void) =>
  renderToStaticMarkup(
    createElement(AgentRunInputModal, {
      request: {
        agentRunId: "9b899065-cdb2-436d-b3c6-5196c7644ce3",
        question:
          "Could you verify the repository URL or permissions for baby-care, or should we proceed with /home/box/qa-vibe-app?",
        partialOutput: "",
      },
      onSubmit,
      onDismiss,
    }),
  );

describe("AgentRunInputModal sends only on an explicit Send (8181f143)", () => {
  beforeEach(() => {
    Object.keys(captured).forEach((key) => {
      delete captured[key as keyof Captured];
    });
  });

  it("Esc / backdrop (the Modal's onClose) only dismisses", () => {
    const onSubmit = vi.fn();
    const onDismiss = vi.fn();
    render(onSubmit, onDismiss);
    captured.modalOnClose?.();
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("opens with an empty answer and a disabled Send", () => {
    const onSubmit = vi.fn();
    const html = render(onSubmit, vi.fn());
    expect(captured.sendDisabled).toBe(true);
    expect(html).not.toContain(CANNED);
    captured.sendOnClick?.();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("no quick reply carries a canned instruction, and picking one does not send", () => {
    const onSubmit = vi.fn();
    render(onSubmit, vi.fn());
    expect(
      (captured.quickReplies ?? []).map((reply) => reply.response),
    ).not.toContain(CANNED);
    expect(
      (captured.quickReplies ?? []).every(
        (reply) => reply.response.length < 80,
      ),
    ).toBe(true);
    captured.quickReplySelect?.("Yes.");
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
