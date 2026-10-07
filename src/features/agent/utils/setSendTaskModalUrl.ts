/**
 * Open/close the layout-level New task modal by changing only `?sendTask…`
 * on the current path. Next syncs history.pushState/replaceState into
 * useSearchParams, so the modal reacts without a server round trip.
 * router.push/replace re-keyed the page segment instead: the (app)
 * loading skeleton flashed and the page under the modal remounted.
 */
export const setSendTaskModalUrl = (
  href: string,
  mode: "push" | "replace",
): void => {
  if (mode === "push") {
    window.history.pushState(null, "", href);
    return;
  }
  window.history.replaceState(null, "", href);
};
