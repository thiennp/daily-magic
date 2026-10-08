/** Removes CSI / SGR color codes and the orphaned `[36m` / `[0m` leftovers some CLIs leave. */
export const stripAgentRunCliAnsi = (text: string): string =>
  text.replace(/\u001b\[[0-9;]*m/g, "").replace(/\[[0-9]{1,3}m/g, "");
