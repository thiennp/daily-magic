import type ShowcaseArticle from "@/features/showcases/types/ShowcaseArticle.type";

const controlMacFromPhone: ShowcaseArticle = {
  slug: "control-mac-from-phone",
  title: "Control AI on your Mac from your phone",
  subtitle:
    "Your Mac does the work. Your phone is the remote—browse, fill, copy, and send when you are ready.",
  category: "Mobile",
  supportLevel: "partial",
  readMinutes: 4,
  whatYouNeed: [
    "Mobile browser with a connection to the app",
    "Your Mac agent online to actually send a job",
    "Or skip send and use Copy prompt for ChatGPT on your phone",
  ],
  tryNext: { label: "Open Library", href: "/library" },
  relatedShowcases: [
    {
      slug: "what-phone-can-do-alone",
      label: "What your phone can do without your Mac",
    },
    {
      slug: "phone-asks-coworker-mac-runs",
      label: "Ask a teammate's Mac to run the job",
    },
  ],
  sections: [
    {
      paragraphs: [
        "You are in a meeting, on a commute, or away from your desk. You still want to queue research or kick off a weekly report. Your phone can open the library, fill a workflow, and copy a prompt — and when your Mac is online, send the job.",
      ],
    },
    {
      heading: "What works well on phone",
      bullets: [
        "Browse My library and Marketplace",
        "Use a playbook — workflow stepper on small screens",
        "Copy prompt into ChatGPT or Gemini without a Mac",
        "Send a task when your browser is connected and your Mac agent is online",
      ],
    },
    {
      heading: "Phone as remote, Mac as engine",
      paragraphs: [
        "Your phone opens Library, fills the form, and sends the request. Claude still runs on a connected Mac with your files—think remote control and clipboard on the phone, engine on the Mac.",
      ],
    },
  ],
};

export default controlMacFromPhone;
