import { ImageResponse } from "next/og";

import { showcaseOgImageLayout } from "@/features/showcases/showcaseOgImageLayout";
import { getShowcaseArticleBySlug } from "@/features/showcases/showcaseArticleRegistry";

export const alt = "Agent Witch real example";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface ShowcaseOgImageProps {
  readonly params: Promise<{ readonly slug: string }>;
}

export default async function Image({ params }: ShowcaseOgImageProps) {
  const { slug } = await params;
  const article = getShowcaseArticleBySlug(slug);

  if (!article) {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#ffffff",
          fontSize: 48,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Example not found
      </div>,
      size,
    );
  }

  return new ImageResponse(showcaseOgImageLayout({ article }), size);
}
