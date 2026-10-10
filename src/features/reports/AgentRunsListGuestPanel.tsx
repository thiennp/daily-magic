import { EmptyStatePanel } from "@/features/empty-states/public-api/presentation";
import {
  CREATE_FREE_ACCOUNT_HREF,
  FIRST_TASK_SHOWCASE_HREF,
  buildSignInHref,
} from "@/features/empty-states/public-api/types";
import { REPORTS_GUEST_EMPTY_COPY } from "@/features/empty-states/public-api/types";

export default function AgentRunsListGuestPanel() {
  return (
    <EmptyStatePanel
      density="page"
      width="full"
      title={REPORTS_GUEST_EMPTY_COPY.title}
      body="Reports are your Run history. After you connect a computer and run a New task, every Run shows up here."
      primaryCta={{
        label: REPORTS_GUEST_EMPTY_COPY.primaryCtaLabel,
        href: CREATE_FREE_ACCOUNT_HREF,
      }}
      secondaryCta={{
        label: REPORTS_GUEST_EMPTY_COPY.secondaryCtaLabel,
        href: buildSignInHref("/reports"),
      }}
      tertiaryLink={{
        label: "Your first task in 5 minutes",
        href: FIRST_TASK_SHOWCASE_HREF,
      }}
    />
  );
}
