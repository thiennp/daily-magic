import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const TEACHER_LESSON_PLAN_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "teacher-lesson-plan",
    "Education",
    "Teacher lesson plan",
    "Build a timed lesson plan aligned to your topic and grade — with objectives, activities, and checks for understanding.",
    "Create a lesson plan for subject and gradeLevel covering topicStandard within classDuration. Use materialsPath if present and wait for my approval before I teach from it.",
    [
      ["subject", "Subject", "text"],
      ["gradeLevel", "Grade level", "text"],
      ["topicStandard", "Topic or standard to cover", "textarea"],
      ["classDuration", "Class duration (e.g. 45 minutes)", "text"],
      [
        "materialsPath",
        "Existing materials folder on your Mac (optional)",
        "text",
        false,
      ],
    ],
  );
