import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const e2eMarketplaceAndLibrary: ShowcaseArticle = {
  slug: "e2e-marketplace-and-library",
  title: "E2E: Marketplace and Library",
  subtitle: "Browse team playbooks and save them to your library.",
  category: "E2E verified",
  supportLevel: "full",
  readMinutes: 3,
  whatYouNeed: ["Signed-in test account", "Paired Mac for install actions"],
  tryNext: { label: "Open Marketplace", href: "/marketplace" },
  sections: [
    {
      heading: "Marketplace",
      image: {
        src: "/showcases/e2e/03-marketplace.png",
        alt: "Marketplace listings",
        caption: "Marketplace browse scenario.",
      },
    },
    {
      heading: "Library",
      image: {
        src: "/showcases/e2e/04-library.png",
        alt: "Library playbooks list",
        caption: "Library empty or saved playbooks scenario.",
      },
    },
  ],
};

export default e2eMarketplaceAndLibrary;
