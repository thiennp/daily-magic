export const TEACHER_LESSON_PLAN_EXAMPLE_REQUEST = `Create a standards-aligned lesson plan a teacher can run in class.

Read subject, gradeLevel, topicStandard, and classDuration from the workflow form.
If materialsPath is set, read existing units or rubrics from that folder on this Mac; otherwise prefer low-prep activities that fit the time box.

## Align objectives and pacing (this step only)
Confirm objectives match topicStandard at a readable level for gradeLevel.
Respect classDuration including transitions; note prerequisites students may need.
If materialsPath is set, skim that folder on this Mac for rubrics or prior units; otherwise prefer low-prep activities.
Summarize assumptions and any open questions in [[PROGRESS]] for the operator — rely on workflow human checkpoints instead of mid-run input stops.

## Draft timed agenda (this step only)
Write 2–3 measurable objectives, a minute-by-minute flow (hook, instruction, practice, exit ticket) inside classDuration, a materials list, differentiation, a formative check, and optional homework or extension.
Present the full draft in [[PROGRESS]] for approval at the next checkpoint.

## Finalize the teach-ready plan (this step only)
Continue from the operator’s approval checkpoint responses (including any revision requests).

Apply requested edits to objectives, timing, activities, and assessment.
Output a clean plan: objectives, timed agenda, materials, differentiation, exit ticket.

## Reflection prompts (this step only)
Add brief post-lesson reflection prompts the teacher can use after they deliver the class.
Do not access LMS or gradebook — classroom delivery stays with the teacher.
Stop before the deliver checkpoint; summarize what to print or project in [[PROGRESS]].`;
