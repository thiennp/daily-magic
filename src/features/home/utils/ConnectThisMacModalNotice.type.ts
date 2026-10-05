/** Status block shown at the top of the Connect this Mac modal. */
export type ConnectThisMacModalNotice =
  | {
      readonly kind: "version_too_old";
      readonly installBundleVersion: string | null;
      readonly minBundleVersion: string;
      readonly downloadUrl: string;
    }
  | { readonly kind: "not_running" }
  | { readonly kind: "retry" };
