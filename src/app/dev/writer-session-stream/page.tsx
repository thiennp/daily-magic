import { Suspense } from "react";

import DevWriterSessionStreamPageClient from "./DevWriterSessionStreamPageClient";

export default function DevWriterSessionStreamPage() {
  return (
    <Suspense fallback={null}>
      <DevWriterSessionStreamPageClient />
    </Suspense>
  );
}
