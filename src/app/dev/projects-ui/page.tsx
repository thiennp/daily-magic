import { notFound } from "next/navigation";

import DevProjectsUiStorybookPageClient from "./DevProjectsUiStorybookPageClient";

export default function DevProjectsUiStorybookPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return <DevProjectsUiStorybookPageClient />;
}
