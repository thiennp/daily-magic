/**
 * Keep the viewport stable when older messages are prepended above.
 * Call after DOM update with the pre-prepend scrollHeight + scrollTop.
 */
export const restoreMessengerScrollAfterPrepend = (input: {
  readonly element: HTMLElement;
  readonly previousScrollHeight: number;
  readonly previousScrollTop: number;
}): void => {
  const { element, previousScrollHeight, previousScrollTop } = input;
  element.scrollTop =
    element.scrollHeight - previousScrollHeight + previousScrollTop;
};
