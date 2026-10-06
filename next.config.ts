import type { NextConfig } from "next";

import { SECURITY_HEADERS } from "./src/lib/security/securityHeaders.constant";

const svgrLoaderOptions = {
  dimensions: false,
  svgProps: {
    focusable: "false",
  },
};

const nextConfig: NextConfig = {
  transpilePackages: ["@agent-witch/shared"],
  serverExternalPackages: ["esbuild"],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: SECURITY_HEADERS.map(({ key, value }) => ({ key, value })),
      },
    ];
  },
  async redirects() {
    return [
      {
        // Retired My bots — path-level 308. ?project= keeps page redirect → #team.
        source: "/my-bots",
        missing: [{ type: "query", key: "project" }],
        destination: "/projects?intent=bots",
        permanent: true,
      },
      {
        source: "/prompt-sdlc",
        destination: "/prompt-optimizer",
        permanent: true,
      },
      {
        source: "/prompt-sdlc/:path*",
        destination: "/prompt-optimizer/:path*",
        permanent: true,
      },
      {
        source: "/api/prompt-sdlc/:path*",
        destination: "/api/prompt-optimizer/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "agentwitch.com" }],
        destination: "https://www.agentwitch.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: svgrLoaderOptions }],
    });
    return config;
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: [{ loader: "@svgr/webpack", options: svgrLoaderOptions }],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
