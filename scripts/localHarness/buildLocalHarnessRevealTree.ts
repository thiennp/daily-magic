import type { LocalHarnessCandidateItem } from "./revealLocalHarnessCandidates.types";

export type LocalHarnessRevealTreeFileNode = {
  readonly type: "file";
  readonly item: LocalHarnessCandidateItem;
};

export type LocalHarnessRevealTreeFolderNode = {
  readonly type: "folder";
  readonly name: string;
  readonly children: readonly LocalHarnessRevealTreeNode[];
};

export type LocalHarnessRevealTreeNode =
  LocalHarnessRevealTreeFileNode | LocalHarnessRevealTreeFolderNode;

const compareTreeNodes = (
  left: LocalHarnessRevealTreeNode,
  right: LocalHarnessRevealTreeNode,
): number => {
  if (left.type === "folder" && right.type === "folder") {
    return left.name.localeCompare(right.name);
  }
  if (left.type === "file" && right.type === "file") {
    return left.item.relativePath.localeCompare(right.item.relativePath);
  }

  return left.type === "folder" ? -1 : 1;
};

type MutableFolder = {
  readonly kind: "folder";
  readonly name: string;
  readonly children: Map<string, MutableFolder | LocalHarnessCandidateItem>;
};

const isMutableFolder = (
  value: MutableFolder | LocalHarnessCandidateItem,
): value is MutableFolder => value.kind === "folder";

export const buildLocalHarnessRevealTreeFromItems = (
  items: readonly LocalHarnessCandidateItem[],
): readonly LocalHarnessRevealTreeNode[] => {
  const mutableRoot: MutableFolder = {
    kind: "folder",
    name: "",
    children: new Map(),
  };

  for (const item of items) {
    const segments = item.relativePath.split("/");
    let current = mutableRoot;

    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index];
      if (segment === undefined) {
        continue;
      }

      const isFile = index === segments.length - 1;
      if (isFile) {
        current.children.set(segment, item);
        continue;
      }

      const existing = current.children.get(segment);
      if (existing !== undefined && isMutableFolder(existing)) {
        current = existing;
        continue;
      }

      const folder: MutableFolder = {
        kind: "folder",
        name: segment,
        children: new Map(),
      };
      current.children.set(segment, folder);
      current = folder;
    }
  }

  const toNodes = (
    folder: MutableFolder,
  ): readonly LocalHarnessRevealTreeNode[] => {
    const nodes: LocalHarnessRevealTreeNode[] = [];

    for (const entry of folder.children.values()) {
      if (isMutableFolder(entry)) {
        nodes.push({
          type: "folder",
          name: entry.name,
          children: toNodes(entry),
        });
        continue;
      }

      nodes.push({ type: "file", item: entry });
    }

    return nodes.toSorted(compareTreeNodes);
  };

  return toNodes(mutableRoot);
};
