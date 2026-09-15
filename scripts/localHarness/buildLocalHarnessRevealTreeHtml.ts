import path from "node:path";

import type { LocalHarnessRevealTreeNode } from "./buildLocalHarnessRevealTree";

export const buildLocalHarnessRevealTreeHtml = (
  nodes: readonly LocalHarnessRevealTreeNode[],
  escapeHtml: (value: string) => string,
): string =>
  nodes
    .map((node) => {
      if (node.type === "folder") {
        return `<li class="harness-tree-folder">
            <details class="harness-tree-details">
              <summary class="harness-tree-summary">
                <span class="harness-tree-folder-name">${escapeHtml(node.name)}</span>
              </summary>
              <ul class="harness-tree">${buildLocalHarnessRevealTreeHtml(node.children, escapeHtml)}</ul>
            </details>
          </li>`;
      }

      const fileName = path.basename(node.item.relativePath);

      return `<li class="harness-tree-file">
          <button
            type="button"
            class="harness-tree-preview"
            data-source-path="${escapeHtml(node.item.sourcePath)}"
            title="${escapeHtml(node.item.relativePath)}"
          >
            <span class="harness-tree-file-name">${escapeHtml(fileName)}</span>
            <span class="muted harness-tree-file-kind">${escapeHtml(node.item.kind)}</span>
          </button>
          <pre class="harness-tree-preview-body" hidden></pre>
        </li>`;
    })
    .join("");
