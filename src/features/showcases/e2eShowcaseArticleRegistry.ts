import { e2eAutomationsAndReports } from "@/features/showcases/articles/public-api/types";
import { e2eCompanyAdmin } from "@/features/showcases/articles/public-api/types";
import { e2eHomeAndOnboarding } from "@/features/showcases/articles/public-api/types";
import { e2eMarketplaceAndLibrary } from "@/features/showcases/articles/public-api/types";
import { e2eSelfDelegate } from "@/features/showcases/articles/public-api/types";
import { e2eTestAccountSignIn } from "@/features/showcases/articles/public-api/types";
import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

export const E2E_SHOWCASE_ARTICLES: readonly ShowcaseArticle[] = [
  e2eTestAccountSignIn,
  e2eHomeAndOnboarding,
  e2eSelfDelegate,
  e2eMarketplaceAndLibrary,
  e2eAutomationsAndReports,
  e2eCompanyAdmin,
] as const;

const E2E_SHOWCASE_SLUGS = new Set(
  E2E_SHOWCASE_ARTICLES.map((article) => article.slug),
);

export const isE2eShowcaseSlug = (slug: string): boolean =>
  E2E_SHOWCASE_SLUGS.has(slug);
