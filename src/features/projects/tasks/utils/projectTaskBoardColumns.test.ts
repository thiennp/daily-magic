import { describe, expect, it } from "vitest";

import {
  parseHiddenBoardColumns,
  toggleHiddenBoardColumn,
  visibleBoardColumns,
} from "@/features/projects/tasks/utils/projectTaskBoardColumns";
import { PROJECT_TASK_BOARD_COLUMNS } from "@/features/projects/tasks/utils/projectTaskBoard";

describe("parseHiddenBoardColumns", () => {
  it("keeps known statuses and survives junk", () => {
    expect(parseHiddenBoardColumns('["done","nope",3]')).toEqual(["done"]);
    expect(parseHiddenBoardColumns("{bad")).toEqual([]);
    expect(parseHiddenBoardColumns(null)).toEqual([]);
  });
});

describe("visibleBoardColumns / toggleHiddenBoardColumn", () => {
  it("drops hidden columns, keeps order, and never hides the last one", () => {
    expect(visibleBoardColumns(["planned", "cancelled"])).toEqual([
      "queued",
      "in_progress",
      "blocked",
      "done",
    ]);
    let hidden: readonly string[] = [];
    for (const status of PROJECT_TASK_BOARD_COLUMNS) {
      hidden = toggleHiddenBoardColumn(hidden as never, status);
    }
    expect(visibleBoardColumns(hidden as never)).toHaveLength(1);
    expect(toggleHiddenBoardColumn(["done"], "done")).toEqual([]);
  });
});
