/**
 * Returns true when a document mousedown should close this dropdown.
 * When `toggleElement` is set, only that button is ignored (fixes multiple
 * card menus staying open when opening a sibling menu).
 */
export const isDocumentMouseDownOutsideDropdown = (
  target: Node,
  dropdownElement: HTMLElement | null,
  toggleElement: HTMLElement | null | undefined,
): boolean => {
  if (dropdownElement?.contains(target)) {
    return false;
  }

  if (toggleElement?.contains(target)) {
    return false;
  }

  if (toggleElement === undefined) {
    const element = target as HTMLElement;
    if (
      typeof element.closest === "function" &&
      element.closest(".dropdown-toggle") !== null
    ) {
      return false;
    }
  }

  return true;
};
