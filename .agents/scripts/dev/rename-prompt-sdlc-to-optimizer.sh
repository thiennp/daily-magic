#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$ROOT"

# Directory renames (idempotent skip if already done)
[[ -d apps/live/features/prompt-optimizer ]] && git mv apps/live/features/prompt-optimizer apps/live/features/prompt-optimizer
[[ -d src/features/prompt-optimizer ]] && git mv src/features/prompt-optimizer src/features/prompt-optimizer
[[ -d src/app/api/prompt-optimizer ]] && git mv src/app/api/prompt-optimizer src/app/api/prompt-optimizer
[[ -d "src/app/(app)/prompt-optimizer" ]] && git mv "src/app/(app)/prompt-optimizer" "src/app/(app)/prompt-optimizer"
[[ -d apps/bridge/features/awc-proxy/features/prompt-optimizer-proxy ]] && \
  git mv apps/bridge/features/awc-proxy/features/prompt-optimizer-proxy \
    apps/bridge/features/awc-proxy/features/prompt-optimizer-proxy
[[ -d src/lib/promptOptimizer ]] && git mv src/lib/promptOptimizer src/lib/promptOptimizer

[[ -f docs/qa/prompt-optimizer.md ]] && git mv docs/qa/prompt-optimizer.md docs/qa/prompt-optimizer.md
[[ -f docs/qa/prompt-optimizer-wizard-verification.md ]] && \
  git mv docs/qa/prompt-optimizer-wizard-verification.md docs/qa/prompt-optimizer-wizard-verification.md

# File content replacements (exclude build artifacts)
export LC_ALL=C
while IFS= read -r -d '' f; do
  sed -i \
    -e 's|/prompt-optimizer|/prompt-optimizer|g' \
    -e 's|features/prompt-optimizer|features/prompt-optimizer|g' \
    -e 's|prompt-optimizer-proxy|prompt-optimizer-proxy|g' \
    -e 's|@/lib/promptOptimizer|@/lib/promptOptimizer|g' \
    -e 's|src/lib/promptOptimizer|src/lib/promptOptimizer|g' \
    -e 's|"prompt-optimizer"|"prompt-optimizer"|g' \
    -e 's|prompt-sdlc-cycles\.json|prompt-optimizer-cycles.json|g' \
    -e 's|prompt-sdlc-preferences\.json|prompt-optimizer-preferences.json|g' \
    -e 's|prompt-optimizer-wizard\.log|prompt-optimizer-wizard.log|g' \
    -e 's|prompt-optimizer-writer-ready|prompt-optimizer-writer-ready|g' \
    -e 's|prompt-optimizer-best|prompt-optimizer-best|g' \
    -e 's|id="prompt-optimizer-run"|id="prompt-optimizer-run"|g' \
    -e 's|prompt-optimizer-run|prompt-optimizer-run|g' \
    -e 's|prompt-optimizer-wizard|prompt-optimizer-wizard|g' \
    -e 's|docs/qa/prompt-optimizer|docs/qa/prompt-optimizer|g' \
    -e 's|--feature=prompt-optimizer|--feature=prompt-optimizer|g' \
    -e 's|featureSlug": "prompt-optimizer"|featureSlug": "prompt-optimizer"|g' \
    "$f"
done < <(find . -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.md' -o -name '*.json' -o -name '*.css' -o -name '*.sh' \) \
  ! -path './node_modules/*' ! -path './.git/*' ! -path './public/install/*' ! -path './.feature-knowledge/*' -print0)

echo "Rename script finished."
