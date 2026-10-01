import { AWC_STORYBOOK_SAMPLE_PROJECT } from "@/utils/storybook/awcStorybookFixtures";

/** Storybook nextjs.navigation.pathname from catalog route patterns. */
const resolveAwcStorybookNavigationPath = (path: string): string =>
  path.replace(":projectId", AWC_STORYBOOK_SAMPLE_PROJECT.id);

export default resolveAwcStorybookNavigationPath;
