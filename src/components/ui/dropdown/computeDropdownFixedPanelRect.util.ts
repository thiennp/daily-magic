export interface DropdownFixedPanelRect {
  readonly top: number;
  readonly left: number;
}

export const computeDropdownFixedPanelRect = (
  toggleRect: DOMRect,
  panelWidth: number,
  viewportWidth: number,
): DropdownFixedPanelRect => {
  const margin = 8;
  const top = toggleRect.bottom + margin;
  let left = toggleRect.right - panelWidth;
  left = Math.max(margin, Math.min(left, viewportWidth - panelWidth - margin));
  return { top, left };
};
