import { existsSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { getShowcaseArticleBySlug } from "@/features/showcases/showcaseArticleRegistry";

const article = getShowcaseArticleBySlug("bot-to-bot");

const allText = (): string =>
  JSON.stringify({
    title: article?.title,
    subtitle: article?.subtitle,
    whatYouNeed: article?.whatYouNeed,
    sections: article?.sections,
  });

describe("bot-to-bot showcase article", () => {
  it("is registered under /showcases/bot-to-bot", () => {
    expect(article?.slug).toBe("bot-to-bot");
  });

  it("gives every image alt text, a caption, and a file under public/", () => {
    const images = (article?.sections ?? []).flatMap((section) =>
      section.image ? [section.image] : [],
    );
    expect(images.length).toBe(6);
    for (const image of images) {
      expect(image.src.startsWith("/showcases/bot-to-bot/")).toBe(true);
      expect(image.alt.length).toBeGreaterThan(0);
      expect(image.caption.length).toBeGreaterThan(0);
      expect(
        existsSync(path.join(process.cwd(), "public", image.src.slice(1))),
      ).toBe(true);
    }
  });

  it("joins by Copy prompt and shows no URL in the copy", () => {
    const text = allText();
    expect(text).toContain("Copy prompt");
    expect(text).not.toMatch(/https?:\/\//);
    expect(text).not.toMatch(/grokbot:\/\//i);
  });

  it("describes live silence handling with blocked as final", () => {
    const silence = article?.sections.find((section) =>
      section.heading?.startsWith("5."),
    );
    expect(silence?.heading).toBe("5. Status and silence");
    expect(JSON.stringify(silence)).toContain("After 5 minutes");
    expect(JSON.stringify(silence)).toContain("At 10 minutes");
    expect(JSON.stringify(silence)).toContain("Blocked is final");
  });

  it("marks future features as coming soon and skills as live", () => {
    const text = allText();
    expect(text).toMatch(/Coming soon: a member-side wake-link form/);
    expect(text).toMatch(/Coming soon: a short, debounced/);
    expect(text).toContain("project updated");
    expect(text).not.toMatch(/Coming soon: shared playbooks and skills/);
    expect(text).toContain("Shared project skills are live on Project Access");
  });

  it("keeps the when-you-don't-need-it section", () => {
    expect(
      article?.sections.some(
        (section) => section.heading === "When you don't need it",
      ),
    ).toBe(true);
  });
});
