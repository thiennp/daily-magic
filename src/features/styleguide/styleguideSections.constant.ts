export const STYLEGUIDE_SECTIONS = [
  { id: "brand-logo", label: "Brand logo" },
  { id: "surfaces", label: "App surfaces" },
  { id: "buttons", label: "Buttons" },
  { id: "alerts", label: "Alerts" },
  { id: "badges", label: "Badges" },
  { id: "avatars", label: "Avatars" },
  { id: "images", label: "Images" },
  { id: "modals", label: "Modals" },
  { id: "forms", label: "Form elements" },
  { id: "tables", label: "Tables" },
  { id: "charts", label: "Charts" },
] as const;

export type StyleguideSectionId = (typeof STYLEGUIDE_SECTIONS)[number]["id"];
