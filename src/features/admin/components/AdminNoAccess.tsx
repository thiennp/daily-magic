import Link from "next/link";

import { ADMIN_COPY } from "@/features/admin/adminCopy.constant";
import { APP_SURFACE_CTA_PRIMARY_CLASS } from "@/components/surfaces/appSurfaceStyles.constant";

export default function AdminNoAccess({ what }: { readonly what: string }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-awc-border-strong bg-awc-surface-2 px-4 py-8 text-center"
    >
      <h2 className="text-base font-semibold text-awc-fg">
        {ADMIN_COPY.noAccessTitle}
      </h2>
      <p className="text-sm text-awc-fg-muted">
        {ADMIN_COPY.noAccessBody} {what}
      </p>
      <Link href="/" className={APP_SURFACE_CTA_PRIMARY_CLASS}>
        {ADMIN_COPY.goHome}
      </Link>
    </div>
  );
}
