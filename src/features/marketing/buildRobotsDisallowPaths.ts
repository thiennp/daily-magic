import { E2E_SHOWCASE_ARTICLES } from "@/features/showcases/e2eShowcaseArticleRegistry";

const STAFF_AND_INTERNAL_DISALLOW_PATHS: readonly string[] = [
  "/admin/",
  "/api/",
  "/dev/",
  "/connection-lab",
  "/styleguide",
  "/ws-test",
];

export const buildRobotsDisallowPaths = (): readonly string[] => [
  ...STAFF_AND_INTERNAL_DISALLOW_PATHS,
  ...E2E_SHOWCASE_ARTICLES.map((article) => `/showcases/${article.slug}`),
];
