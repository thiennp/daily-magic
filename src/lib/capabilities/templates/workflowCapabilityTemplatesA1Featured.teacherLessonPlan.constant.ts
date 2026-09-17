import buildWorkflowTemplate from "@/lib/capabilities/templates/buildWorkflowTemplate";
import { TEACHER_LESSON_PLAN_EXAMPLE_REQUEST } from "@/lib/capabilities/templates/harnessProfiles/workflowA1.teacherLessonPlan.exampleRequest";
import type { WorkflowCapabilityTemplate } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

export const TEACHER_LESSON_PLAN_WORKFLOW: WorkflowCapabilityTemplate =
  buildWorkflowTemplate(
    "teacher-lesson-plan",
    "Education",
    "Teacher lesson plan",
    "Build a timed lesson plan aligned to your topic and grade — objectives, activities, checks for understanding, and post-lesson reflection prompts after you approve.",
    TEACHER_LESSON_PLAN_EXAMPLE_REQUEST,
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
