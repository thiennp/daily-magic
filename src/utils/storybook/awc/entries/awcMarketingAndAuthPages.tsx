import LoginPageView from "@/features/auth/LoginPageView";
import ForAgentsPage from "@/app/for-agents/page";
import HomeMarketingLanding from "@/features/home/HomeMarketingLanding";
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
    onlyReady("for-agents", "For agents", "/for-agents", "marketing", () => (
      <ForAgentsPage />
    )),
    onlyReady("setup-writer", "Setup writer", "/setup/writer", "app", () => (
      <SetupWriterRoutePage />
    )),
    onlyReady("privacy", "Privacy", "/privacy", "app", () => (
      <MarketingLegalPageLayout
        title={MARKETING_PRIVACY_COPY.title}
        lastUpdated={MARKETING_PRIVACY_COPY.lastUpdated}
        intro={MARKETING_PRIVACY_COPY.intro}
        sections={MARKETING_PRIVACY_COPY.sections}
      />
    )),
    onlyReady("terms", "Terms", "/terms", "app", () => (
      <MarketingLegalPageLayout
        title={MARKETING_TERMS_COPY.title}
        lastUpdated={MARKETING_TERMS_COPY.lastUpdated}
        intro={MARKETING_TERMS_COPY.intro}
        sections={MARKETING_TERMS_COPY.sections}
      />
    )),
  ];
