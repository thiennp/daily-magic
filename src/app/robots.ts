import type { MetadataRoute } from "next";

import { buildRobotsDisallowPaths } from "@/features/marketing/buildRobotsDisallowPaths";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...buildRobotsDisallowPaths()],
    },
  };
}
