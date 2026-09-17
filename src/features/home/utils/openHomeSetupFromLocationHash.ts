const YOUR_SETUP_HASH = "#your-setup";

export const openHomeSetupFromLocationHash = (): boolean => {
  if (
    typeof window === "undefined" ||
    window.location.hash !== YOUR_SETUP_HASH
  ) {
    return false;
  }

  const details = document.getElementById("your-setup");
  if (details === null || !("open" in details)) {
    return false;
  }

  details.open = true;
  if (typeof details.scrollIntoView === "function") {
    requestAnimationFrame(() => {
      details.scrollIntoView({ block: "nearest" });
    });
  }

  return true;
};
