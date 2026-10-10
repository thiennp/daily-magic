import type { MetadataRoute } from "next";

import { buildRobotsDisallowPaths } from "@/features/marketing/public-api/infrastructure";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...buildRobotsDisallowPaths()],
    },
  };
}
