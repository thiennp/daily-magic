import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export const TEACHER_LESSON_PLAN_OPERATOR_STEPS: readonly OperatorStepDefinition[] =
  [
    {
      id: "teacher-lesson-plan-operator-standards",
      title: "Confirm standards and class constraints",
      content: [
        "1. Verify subject, gradeLevel, and topicStandard against your syllabus.",
        "2. Open materialsPath on your Mac if you have prior units or rubrics.",
        "3. Reply ready when classDuration and classroom constraints are final.",
      ].join("\n"),
    },
    {
      id: "teacher-lesson-plan-operator-approve",
      title: "Approve the lesson plan",
      content: [
        "1. Review objectives, activities, timing, and assessment for your class.",
        "2. Reject activities that need unavailable materials or unsafe setups.",
        "3. Reply approve when you will teach from this plan.",
      ].join("\n"),
    },
    {
      id: "teacher-lesson-plan-operator-deliver",
      title: "Deliver the lesson on your side",
      content: [
        "1. Print, project, or share materials with students as you normally do.",
        "2. The agent does not access your LMS or gradebook.",
        "3. Ask the agent to save a short reflection prompt for after class.",
      ].join("\n"),
    },
  ];
