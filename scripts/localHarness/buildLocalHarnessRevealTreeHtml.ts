import type { LocalHarnessRevealTreeNode } from "./buildLocalHarnessRevealTree";

export const buildLocalHarnessRevealTreeHtml = (
  nodes: readonly LocalHarnessRevealTreeNode[],
  escapeHtml: (value: string) => string,
): string =>
  nodes
    .map((node) => {
      if (node.type === "folder") {
        return `<li class="harness-tree-folder">
            <details open>
              <summary><span class="harness-tree-folder-name">${escapeHtml(node.name)}</span></summary>
              <ul class="harness-tree">${buildLocalHarnessRevealTreeHtml(node.children, escapeHtml)}</ul>
            </details>
          </li>`;
      }

      return `<li class="harness-tree-file">
          <button
            type="button"
            class="harness-tree-preview"
            data-source-path="${escapeHtml(node.item.sourcePath)}"
          >
            <code>${escapeHtml(node.item.relativePath)}</code>
            <span class="muted">${escapeHtml(node.item.kind)}</span>
          </button>
          <pre class="harness-tree-preview-body" hidden></pre>
        </li>`;
    })
    .join("");
