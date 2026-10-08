const openModals: symbol[] = [];

export function pushModal(id: symbol): void {
  openModals.push(id);
}

export function removeModal(id: symbol): void {
  const index = openModals.indexOf(id);
  if (index !== -1) {
    openModals.splice(index, 1);
  }
}

export function isTopModal(id: symbol): boolean {
  if (openModals.length === 0) {
    return false;
  }
  return openModals[openModals.length - 1] === id;
}

export function isAnyModalOpen(): boolean {
  return openModals.length > 0;
}
