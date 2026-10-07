import { isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { reactHookRunner as runner, runWithHookSlots } from "@/features/projects/access/hooks/reactHookRunner.testUtils";
import AwcProjectMembersHelperRowMoreMenu from "@/features/projects/members/AwcProjectMembersHelperRowMoreMenu";

vi.mock("react", async (importOriginal) => {
  const { mockReactWithHookRunner } = await import("@/features/projects/access/hooks/reactHookRunner.testUtils");
  return mockReactWithHookRunner(await importOriginal());
});

type Clickable = ReactElement<{ onClick: () => void; children: ReactNode }>;

const find = (node: ReactNode, match: (props: Record<string, unknown>) => boolean): Clickable | null => {
  if (Array.isArray(node)) return node.map((child) => find(child, match)).find(Boolean) ?? null;
  if (!isValidElement(node)) return null;
  const props = node.props as Record<string, unknown>;
  return match(props) ? (node as Clickable) : find(props.children as ReactNode, match);
};

const handlers = { onMessage: vi.fn(), onRename: vi.fn(), onWakeLink: vi.fn(), onRemove: vi.fn() };
const render = () => runWithHookSlots(() => AwcProjectMembersHelperRowMoreMenu({ name: "NRG Lead", ...handlers }));

describe("DF-036 F12: assistant row ⋯ menu", () => {
  beforeEach(() => {
    runner.slots = [];
    Object.values(handlers).forEach((fn) => fn.mockClear());
  });

  it("closed: one ⋯ button that announces a menu", () => {
    const html = renderToStaticMarkup(render());
    expect(html).toContain('aria-label="More for NRG Lead"');
    expect(html).toContain('aria-haspopup="menu"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain('role="menu"');
  });

  it("open: Message privately · Rename · Wake link · Remove (Remove in --bad)", () => {
    find(render(), (p) => p["aria-haspopup"] === "menu")?.props.onClick();
    const html = renderToStaticMarkup(render());
    const labels = [...html.matchAll(/role="menuitem"[^>]*>([^<]+)</g)].map((m) => m[1]);
    expect(labels).toEqual(["Message privately", "Rename", "Wake link", "Remove"]);
    expect(html).toMatch(/text-awc-bad"[^>]*>Remove</);
  });

  it("picking an item runs it and closes the menu", () => {
    find(render(), (p) => p["aria-haspopup"] === "menu")?.props.onClick();
    find(render(), (p) => p.role === "menuitem" && p.children === "Wake link")?.props.onClick();
    expect(handlers.onWakeLink).toHaveBeenCalledTimes(1);
    expect(renderToStaticMarkup(render())).not.toContain('role="menu"');
  });
});
