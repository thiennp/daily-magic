/** Inline SVG X for AWL modal close controls (top-right). */
export const AWL_DIALOG_CLOSE_ICON_HTML = `<svg class="history-dialog-close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18 6 6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;

type RenderAwlDialogCloseButtonInput = {
  readonly type: "button" | "submit";
  readonly id?: string;
};

export const renderAwlDialogCloseButton = (
  input: RenderAwlDialogCloseButtonInput,
): string => {
  const idAttr =
    input.id === undefined ? "" : ` id="${input.id.replaceAll('"', "&quot;")}"`;
  return `<button${idAttr} type="${input.type}" class="history-dialog-close" aria-label="Close">${AWL_DIALOG_CLOSE_ICON_HTML}</button>`;
};
