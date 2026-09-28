# Prompt SDLC — agent instructions

1. The product surface is Agent Witch Live, not the console composer.
2. Do not add a Mac picker. Judge and improver start blank until the user chooses. Each list includes I'll score it and I'll rewrite it. A writer that has passed its check is not checked again until that writer returns an error. A judge reply needs a score and a reason.
3. Do not use Ollama or other small local models.
4. Writer calls run in the folder the user chose. The default is the home directory. Keep the reply file outside that folder.
5. Bots call `GET` and `POST /prompt-sdlc/agent` on this Mac before they send a Task. One installed writer fills both roles when judge and improver are omitted. Do not accept `manual` on that API. The human page stays `/prompt-sdlc`.
6. The loop stops when the score passes, at the round limit (default 10, whole numbers 1–30), or after 3 judged rounds that do not beat the best score. Stop ends the writer so the next round does not start. A drop rewrites the best prompt so far. Later prompts include the other rounds, and include their prompt text when the score is not rising.
7. A timeline step opens the score, feedback, and saved prompt. A finished run shows the highest scoring prompt. Save as a skill writes `.cursor/skills/<slug>/SKILL.md` in that run’s folder.
