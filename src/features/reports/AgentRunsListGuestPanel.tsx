import EmptyStatePanel from "@/features/empty-states/EmptyStatePanel";
import {
  CREATE_FREE_ACCOUNT_HREF,
  FIRST_TASK_SHOWCASE_HREF,
  buildSignInHref,
} from "@/features/empty-states/buildGuestAuthHrefs";
import { REPORTS_GUEST_EMPTY_COPY } from "@/features/empty-states/signedOutPageEmptyCopy.constant";

export default function AgentRunsListGuestPanel() {
  return (
    <EmptyStatePanel
      density="page"
      title={REPORTS_GUEST_EMPTY_COPY.title}
      body="Reports are your Run history. After you connect a Mac and run a New task, every Run shows up here."
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
