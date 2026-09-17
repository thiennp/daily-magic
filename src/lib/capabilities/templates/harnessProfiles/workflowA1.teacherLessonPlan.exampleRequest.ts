export const TEACHER_LESSON_PLAN_EXAMPLE_REQUEST = `Create a standards-aligned lesson plan a teacher can run in class.

Read subject, gradeLevel, topicStandard, and classDuration from the workflow form.
If materialsPath is set, read existing units or rubrics from that folder on this Mac; otherwise prefer low-prep activities that fit the time box.

## 1. Align objectives and pacing (agent step — constraints only)
Confirm readability for gradeLevel and measurable objectives tied to topicStandard.
Note prerequisite knowledge and classroom constraints the operator confirmed at the first checkpoint.
Summarize assumptions in [[PROGRESS]]; rely on workflow human checkpoints instead of mid-run input stops.

## 2. Draft timed agenda and checks for understanding (agent step — draft plan)
Produce 2–3 learning objectives, a minute-by-minute agenda inside classDuration (include transition buffer), materials list, differentiation for struggling and advanced learners, a formative check, and an optional homework or extension.
Present the draft in [[PROGRESS]] for operator approval at the next checkpoint.

## 3. Finalize after approval and add reflection prompts (agent step — polish)
Apply revision notes from the approval checkpoint if the operator asked for changes.
Output a teach-ready plan (objectives, timed agenda, materials, differentiation, exit ticket).
Add short post-lesson reflection prompts the teacher can use after class — delivery and grading stay with the teacher.`;
