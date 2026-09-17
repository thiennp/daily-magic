import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { JOB_APPLICATION_PACK_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.jobApplicationPack.exampleRequest";
import { JOB_APPLICATION_PACK_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.jobApplicationPack.operatorSteps";

export const JOB_APPLICATION_PACK_PRESET: PresetHarnessSeed = {
  id: "job-application-pack",
  name: "Job application pack",
  category: "Career",
  description:
    "Tailor resume bullets and a cover letter to a specific job using your real files — submit only after you approve every claim.",
  exampleRequest: JOB_APPLICATION_PACK_EXAMPLE_REQUEST,
  operatorSteps: JOB_APPLICATION_PACK_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Use only facts found in resumeFolderPath; never invent employers or skills.",
      "Mirror keywords from jobDescription without keyword stuffing.",
      "Flag gaps honestly and suggest bridge language where experience is thin.",
      "Wait for operator approval checkpoints before calling the pack submission-ready.",
    ],
    skillSections: [
      {
        heading: "Requirement mapping",
        bullets: [
          "List top job requirements and matching resume evidence.",
          "Note gaps and optional upskilling lines for the cover letter.",
        ],
      },
      {
        heading: "Resume tailoring",
        bullets: [
          "Rewrite 3–5 bullet lines with quantified outcomes where possible.",
          "Keep formatting plain text the operator can paste into Word or PDF.",
        ],
      },
      {
        heading: "Cover letter",
        bullets: [
          "Open with role + company fit; close with one clear ask.",
          "Stay under one page; match tone to companyName and targetRole.",
        ],
      },
    ],
    commandSteps: [
      "Confirm job posting and workflow fields with the operator.",
      "Map requirements to resume evidence.",
      "Draft tailored bullets and cover letter.",
      "Finalize after approval; operator submits and logs.",
    ],
    instructionAddendum:
      "Application submission stays with the operator; the agent prepares truthful materials.",
    subagentMission:
      "You are the job application subagent. Turn real resume files into a targeted, honest application pack.",
    subagentExpertise: [
      "Resume tailoring",
      "Cover letter drafting",
      "ATS-friendly keyword mapping",
    ],
    outputFormat:
      "Requirement map, tailored bullets, cover letter, gap notes, submission checklist.",
  },
};
