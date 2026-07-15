import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const controlMacFromPhone: ShowcaseArticle = {
  slug: "control-mac-from-phone",
  title: "Control AI on your Mac from your phone",
  subtitle:
    "Your Mac does the work. Your phone is the remote — with honest limits.",
  category: "Mobile",
  supportLevel: "partial",
  readMinutes: 4,
  whatYouNeed: [
    "Mobile browser with a connection to the app",
    "Your Mac agent online to actually send a job",
    "Or skip send and use Copy prompt for ChatGPT on your phone",
  ],
  tryNext: { label: "Open the demo library on mobile", href: "/demo/library" },
  sections: [
    {
      paragraphs: [
        "You are in a meeting, on a commute, or away from your desk. You still want to queue research or kick off a weekly report. Your phone can open the library, fill a workflow, and copy a prompt — and when your Mac is online, send the job.",
      ],
    },
    {
      heading: "What works well on phone today",
      bullets: [
        "Browse My library and Marketplace",
        "Use a playbook — workflow stepper on small screens",
        "Copy prompt into ChatGPT or Gemini without a Mac",
        "Send a task when your browser is connected and your Mac agent is online",
      ],
    },
    {
      heading: "What does not work yet",
      paragraphs: [
        "Your phone cannot run Claude on your files by itself. Execution still happens on a connected Mac. Think phone = remote control and clipboard, Mac = engine.",
      ],
    },
  ],
};

export default controlMacFromPhone;
