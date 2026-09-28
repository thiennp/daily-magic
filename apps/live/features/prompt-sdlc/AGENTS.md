# Prompt SDLC — agent instructions

1. The product surface is Agent Witch Live, not the console composer.
2. Do not add a Mac picker. When more than one reasoning writer is installed, the judge and improver start blank until the user chooses. One installed writer fills both roles. A writer that has passed its check is not checked again until that writer returns an error.
3. Do not use Ollama or other small local models.
4. Writer calls run in the folder the user chose. The default is the home directory. Keep the reply file outside that folder.
