import { Suspense } from "react";

import { requireStaffPageAccess } from "@/lib/auth/requireStaffPageAccess";

import DevWriterSessionStreamPageClient from "./DevWriterSessionStreamPageClient";

export default async function DevWriterSessionStreamPage() {
  await requireStaffPageAccess();

  return (
    <Suspense fallback={null}>
      <DevWriterSessionStreamPageClient />
    </Suspense>
  );
}
