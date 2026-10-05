/** Join step — 9. check_product_updates. */
export const buildProjectInviteJoinProductUpdatesStep =
  (): readonly string[] => {
    return [
      "9. Product updates — after connect / post-Approve summary, and periodically while active:",
      '   Call check_product_updates { "sinceCatalogVersion": <lastSeen or 0> }.',
      "   Start with sinceCatalogVersion 0 after join; afterwards pass the last catalogVersion you stored.",
      "   Response includes catalogVersion, entries[], tools[], connect, and adaptHint.",
      "   When hasUpdates (catalog advances): adapt behavior from entries[].adapt, tools, connect, and adaptHint; tell your user briefly that the product catalog advanced.",
      "   Store returned catalogVersion for the next call. check_product_updates is catalog-wide — use agent-access Bearer (required/preferred); awc_proj_ alone 401s. Dual-auth: awc_proj_ OK only for project-scoped tools listed in step 4c; prefer agent-access for register_project_webhook and ack_project_message.",
    ];
  };
