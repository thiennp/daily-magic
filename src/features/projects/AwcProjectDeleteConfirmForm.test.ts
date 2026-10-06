import { createElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/ui/button/Button", () => ({
  default: ({
    children,
    disabled,
    onClick,
    ...rest
  }: {
    readonly children?: ReactNode;
    readonly disabled?: boolean;
    readonly onClick?: () => void;
    readonly [key: string]: unknown;
  }) =>
    createElement(
      "button",
      { type: "button", disabled, onClick, ...rest },
      children,
    ),
}));

vi.mock("@/components/ui/modal", () => ({
  Modal: ({
    children,
    isOpen,
  }: {
    readonly children?: ReactNode;
    readonly isOpen: boolean;
  }) =>
    isOpen
      ? createElement("div", { "data-testid": "delete-dialog" }, children)
      : null,
}));

describe("AwcProjectDeleteConfirmForm", () => {
  it("inline: Delete permanently stays disabled until the typed name matches", async () => {
    const { default: Form } = await import(
      "@/features/projects/AwcProjectDeleteConfirmForm"
    );
    const { AWC_PROJECT_DELETE_COPY } = await import(
      "@/features/projects/awcProjectDeleteCopy.constant"
    );

    const html = renderToStaticMarkup(
      createElement(Form, {
        variant: "inline",
        projectName: "Client repo",
        pending: false,
        errorMessage: null,
        onConfirm: () => undefined,
        onCancel: () => undefined,
      }),
    );

    expect(html).toContain(AWC_PROJECT_DELETE_COPY.scope);
    expect(AWC_PROJECT_DELETE_COPY.scope).toContain("members, invites, webhooks");
    expect(AWC_PROJECT_DELETE_COPY.scope).toContain("messages");
    expect(html).toContain(AWC_PROJECT_DELETE_COPY.typeToConfirmPrefix);
    expect(html).toContain("Client repo");
    expect(html).toContain(AWC_PROJECT_DELETE_COPY.confirm);
    expect(html).toMatch(/disabled[^>]*>\s*Delete permanently/);
    expect(html).not.toContain('data-testid="delete-dialog"');
    expect(html).not.toContain(AWC_PROJECT_DELETE_COPY.title);
  });

  it("dialog: wraps the same confirm UI in a modal with the delete title", async () => {
    const { default: Form } = await import(
      "@/features/projects/AwcProjectDeleteConfirmForm"
    );
    const { AWC_PROJECT_DELETE_COPY } = await import(
      "@/features/projects/awcProjectDeleteCopy.constant"
    );

    const html = renderToStaticMarkup(
      createElement(Form, {
        variant: "dialog",
        projectName: "Client repo",
        pending: false,
        errorMessage: null,
        onConfirm: () => undefined,
        onCancel: () => undefined,
      }),
    );

    expect(html).toContain('data-testid="delete-dialog"');
    expect(html).toContain(AWC_PROJECT_DELETE_COPY.title);
    expect(html).toContain(AWC_PROJECT_DELETE_COPY.confirm);
    expect(html).toMatch(/disabled[^>]*>\s*Delete permanently/);
  });
});
