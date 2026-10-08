import { isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  reactHookRunner as runner,
  runWithHookSlots,
} from "@/features/projects/access/hooks/reactHookRunner.testUtils";
import AwcProjectMembersRailMenu from "@/features/projects/members/AwcProjectMembersRailMenu";

vi.mock("react", async (importOriginal) => {
  const { mockReactWithHookRunner } =
    await import("@/features/projects/access/hooks/reactHookRunner.testUtils");
  return mockReactWithHookRunner(await importOriginal());
});

type Node_ = ReactElement<{ onClick: () => void; children: ReactNode }>;
const find = (
  node: ReactNode,
  match: (props: Record<string, unknown>) => boolean,
): Node_ | null => {
  if (Array.isArray(node))
    return node.map((c) => find(c, match)).find(Boolean) ?? null;
  if (!isValidElement(node)) return null;
  const props = node.props as Record<string, unknown>;
  return match(props)
    ? (node as Node_)
    : find(props.children as ReactNode, match);
};

const run = vi.fn();
const del = vi.fn();
const render = () =>
  runWithHookSlots(() =>
    AwcProjectMembersRailMenu({
      items: [
        { label: "Access log", run },
        { label: "Delete project", run: del, bad: true, separated: true },
      ],
    }),
  );

describe("Members rail ⋯ menu", () => {
  beforeEach(() => {
    runner.slots = [];
    run.mockClear();
    del.mockClear();
  });

  it("closed: ⋯ announces a menu", () => {
    const html = renderToStaticMarkup(render());
    expect(html).toContain('aria-haspopup="menu"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).not.toContain('role="menu"');
  });

  it("open: items, separator, Delete in --bad, and picking runs the action", () => {
    find(render(), (p) => p["aria-haspopup"] === "menu")?.props.onClick();
    const html = renderToStaticMarkup(render());
    expect(html).toContain('role="menu"');
    expect(html).toContain('role="separator"');
    expect(html).toContain("text-awc-bad");
    find(
      render(),
      (p) => p.role === "menuitem" && p.children === "Delete project",
    )?.props.onClick();
    expect(del).toHaveBeenCalledOnce();
  });
});
