export interface BrandLogoMeaningItem {
  readonly title: string;
  readonly body: string;
}

export const BRAND_LOGO_INTRO =
  "The logo reflects the core premise of Agent Witch: secure, local AI automation that feels like magic but is grounded in strict rules.";

export const BRAND_LOGO_MEANING_ITEMS: readonly BrandLogoMeaningItem[] = [
  {
    title: "The Outer Diamond (Security & The Local Mac)",
    body: "The solid geometric boundary represents the secure, enclosed environment of the user's local machine. Unlike cloud-based AI that sends data everywhere, the diamond visually communicates that the work is contained, safe, and governed by company rules.",
  },
  {
    title: "The Intersecting Axis (The Agent)",
    body: "The bold vertical and horizontal lines (+) represent the intersection of two things: Human Intent (from the browser) and Machine Execution (on the Mac). It is the structural crosshairs of a task being targeted and completed with precision. It also subtly nods to a classic four-point spark, hinting at the Witch or magical aspect of AI.",
  },
  {
    title: "The Diagonal Slash (The Command)",
    body: "The offset diagonal line represents motion, dispatch, and the command line (/). It symbolizes the exact moment a task is sent from the cloud down to the local computer. It breaks the perfect symmetry of the cross, giving the logo forward momentum and making it feel like a dynamic, active tool rather than a static shape.",
  },
] as const;
