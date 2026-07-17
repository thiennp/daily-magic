import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const e2eHomeAndOnboarding: ShowcaseArticle = {
  slug: "e2e-home-and-onboarding",
  title: "E2E: Home dashboard and Mac setup",
  subtitle: "Connect your Mac, then unlock the onboarding checklist.",
  category: "E2E verified",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: [
    "Signed-in test account",
    "agent-witch profile pointed at ws://localhost:3000 for local E2E",
  ],
  tryNext: { label: "Open Home", href: "/" },
  sections: [
    {
      bullets: [
        "Fresh users see the connect-Mac guide until a device is paired",
        "After pairing, the dashboard and onboarding checklist appear",
        "Checklist tracks workflow, first task, and optional automation",
      ],
      image: {
        src: "/showcases/e2e/02-home.png",
        alt: "Home while Mac connection status loads",
        caption: "Home after test-account sign-in.",
      },
    },
  ],
};

export default e2eHomeAndOnboarding;
