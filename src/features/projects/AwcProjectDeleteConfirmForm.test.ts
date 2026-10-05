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

describe("AwcProjectDeleteConfirmForm", () => {
  it("keeps Delete project disabled until the typed name matches exactly", async () => {
    const { default: AwcProjectDeleteConfirmForm } = await import(
      "@/features/projects/AwcProjectDeleteConfirmForm"
    );
    const { AWC_PROJECT_DELETE_COPY } = await import(
      "@/features/projects/awcProjectDeleteCopy.constant"
    );

    const html = renderToStaticMarkup(
      createElement(AwcProjectDeleteConfirmForm, {
        projectName: "Client repo",
        isDeleting: false,
        errorMessage: null,
        onConfirm: () => undefined,
        onCancel: () => undefined,
      }),
    );

    expect(html).toContain(AWC_PROJECT_DELETE_COPY.typeToConfirm);
    expect(html).toContain("Client repo");
    expect(html).toContain(AWC_PROJECT_DELETE_COPY.confirm);
    expect(html).toMatch(/disabled[^>]*>\s*Delete project/);
  });
});
