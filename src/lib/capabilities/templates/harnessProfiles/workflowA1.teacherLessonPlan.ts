import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { TEACHER_LESSON_PLAN_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.teacherLessonPlan.operatorSteps";

export const TEACHER_LESSON_PLAN_PRESET: PresetHarnessSeed = {
  id: "teacher-lesson-plan",
  name: "Teacher lesson plan",
  category: "Education",
  description:
    "Build a timed lesson plan aligned to your topic and grade — with objectives, activities, and checks for understanding.",
  exampleRequest:
    "Create a lesson plan for subject and gradeLevel covering topicStandard within classDuration. Use materialsPath if present and wait for my approval before I teach from it.",
  operatorSteps: TEACHER_LESSON_PLAN_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Align objectives to topicStandard and gradeLevel readability.",
      "Fit every segment inside classDuration with buffer for transitions.",
      "Prefer low-prep activities unless materialsPath supplies resources.",
      "Pause with [[AWAITING_INPUT]] before calling the plan teach-ready.",
    ],
    skillSections: [
      {
        heading: "Objectives and standards",
        bullets: [
          "Write 2–3 measurable learning objectives.",
          "Note prerequisite knowledge students may need.",
        ],
      },
      {
        heading: "Agenda",
        bullets: [
          "Minute-by-minute flow: hook, instruction, practice, exit ticket.",
          "Include differentiation for struggling and advanced learners.",
        ],
      },
      {
        heading: "Assessment",
        bullets: ["Add formative check and homework or extension optional."],
      },
    ],
    commandSteps: [
      "Parse standards, duration, and optional materials.",
      "Draft timed agenda and materials list.",
      "Present plan and wait for approval.",
      "Offer post-lesson reflection prompts.",
    ],
    instructionAddendum:
      "Classroom delivery and grading stay with the teacher.",
    subagentMission:
      "You are the teacher lesson plan subagent. Produce practical, standards-aligned plans teachers can run tomorrow.",
    subagentExpertise: [
      "Lesson planning",
      "Formative assessment design",
      "Grade-level pacing",
    ],
    outputFormat:
      "Objectives, timed agenda, materials, differentiation, exit ticket, reflection prompt.",
  },
};
