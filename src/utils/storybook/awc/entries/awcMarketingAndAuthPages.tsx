import { LoginPageView } from "@/features/auth/public-api/presentation";
import HomeMarketingLanding from "@/features/home/HomeMarketingLanding";
import { formatAgentAccessGuidelineMarkdown } from "@/lib/agentAccess/formatAgentAccessGuidelineMarkdown";
import MarketingLegalPageLayout from "@/features/marketing/MarketingLegalPageLayout";
import {
  MARKETING_PRIVACY_COPY,
  MARKETING_TERMS_COPY,
} from "@/features/marketing/marketingLegalCopy.constant";
import SetupWriterRoutePage from "@/app/(app)/setup/writer/page";
import type { AwcStorybookPageEntry } from "@/utils/storybook/awc/awcStorybookPageEntry.type";
const onlyReady = (
  id: string,
  title: string,
  path: string,
  shell: AwcStorybookPageEntry["shell"],
  render: () => React.ReactElement,
): AwcStorybookPageEntry => ({
  id,
  title,
  path,
  shell,
  statuses: ["ready"],
  renderBody: () => render(),
});

export const AWC_MARKETING_AND_AUTH_PAGE_ENTRIES: readonly AwcStorybookPageEntry[] =
  [
    onlyReady("home-marketing", "Home (marketing)", "/", "marketing", () => (
      <HomeMarketingLanding />
    )),
    onlyReady("login", "Login", "/login", "none", () => <LoginPageView />),
    onlyReady("for-agents", "For agents", "/for-agents", "none", () => (
      <pre style={{ whiteSpace: "pre-wrap", margin: 0, padding: 16 }}>
        {formatAgentAccessGuidelineMarkdown()}
      </pre>
    )),
    onlyReady("setup-writer", "Setup writer", "/setup/writer", "app", () => (
      <SetupWriterRoutePage />
    )),
    onlyReady("privacy", "Privacy", "/privacy", "app", () => (
      <MarketingLegalPageLayout doc={MARKETING_PRIVACY_COPY} />
    )),
    onlyReady("terms", "Terms", "/terms", "app", () => (
      <MarketingLegalPageLayout doc={MARKETING_TERMS_COPY} />
    )),
  ];
