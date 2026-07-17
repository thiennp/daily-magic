import e2eAutomationsAndReports from "@/features/showcases/articles/e2eAutomationsAndReports.article";
import e2eCompanyAdmin from "@/features/showcases/articles/e2eCompanyAdmin.article";
import e2eHomeAndOnboarding from "@/features/showcases/articles/e2eHomeAndOnboarding.article";
import e2eMarketplaceAndLibrary from "@/features/showcases/articles/e2eMarketplaceAndLibrary.article";
import e2eSelfDelegate from "@/features/showcases/articles/e2eSelfDelegate.article";
import e2eTestAccountSignIn from "@/features/showcases/articles/e2eTestAccountSignIn.article";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

export const E2E_SHOWCASE_ARTICLES: readonly ShowcaseArticle[] = [
  e2eTestAccountSignIn,
  e2eHomeAndOnboarding,
  e2eSelfDelegate,
  e2eMarketplaceAndLibrary,
  e2eAutomationsAndReports,
  e2eCompanyAdmin,
] as const;
