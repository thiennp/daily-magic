import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import { TEACHER_LESSON_PLAN_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.teacherLessonPlan.exampleRequest";
import { TEACHER_LESSON_PLAN_OPERATOR_STEPS } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.teacherLessonPlan.operatorSteps";

export const TEACHER_LESSON_PLAN_PRESET: PresetHarnessSeed = {
  id: "teacher-lesson-plan",
  name: "Teacher lesson plan",
  category: "Education",
  description:
    "Build a timed lesson plan aligned to your topic and grade — objectives, activities, checks for understanding, and post-lesson reflection prompts after you approve.",
  exampleRequest: TEACHER_LESSON_PLAN_EXAMPLE_REQUEST,
  operatorSteps: TEACHER_LESSON_PLAN_OPERATOR_STEPS,
  profile: {
    ruleFocus: [
      "Align objectives to topicStandard and gradeLevel readability.",
      "Fit every segment inside classDuration with buffer for transitions.",
      "Prefer low-prep activities unless materialsPath supplies resources.",
      "Pause at operator approval before calling the plan teach-ready; use workflow checkpoints, not [[AWAITING_INPUT]].",
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
      "Confirm syllabus fields and optional materialsPath at the first checkpoint.",
      "Draft objectives and timed agenda for operator approval.",
      "Finalize after approval and add reflection prompts.",
      "Teacher delivers class; agent does not access LMS or gradebook.",
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
