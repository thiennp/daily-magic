# Prompt SDLC — agent instructions

1. The product surface is Agent Witch Live, not the console composer.
2. Do not add a Mac picker. Judge and improver start blank until the user chooses. Each list includes I'll score it and I'll rewrite it. A writer that has passed its check is not checked again until that writer returns an error. A judge reply needs a score and a reason.
3. Do not use Ollama or other small local models.
4. Writer calls run in the folder the user chose. The default is the home directory. Keep the reply file outside that folder.
5. Bots call `GET` and `POST /prompt-sdlc/agent` on this Mac before they send a Task. One installed writer fills both roles when judge and improver are omitted. Do not accept `manual` on that API. The human page stays `/prompt-sdlc`.
