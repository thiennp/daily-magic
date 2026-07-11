---
name: skill-extract-to-util
description: >-
  Deciding when logic graduates from inline to shared utility modules.
---

# Extract To Util

## Heuristics

- Second non-trivial use with identical constraints is the classic trigger—first use stays colocated unless huge.
- Utilities stay pure and narrowly named; frameworks imports stay near components.
- If tests become easier with extraction, that's a clue—not the only signal.
  Executable workflows: `.cursor/commands/command-README.md`
