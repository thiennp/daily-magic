import type { NextConfig } from "next";

const svgrLoaderOptions = {
  dimensions: false,
  svgProps: {
    focusable: "false",
  },
};

const nextConfig: NextConfig = {
  serverExternalPackages: ["esbuild"],
  async redirects() {
    return [
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
