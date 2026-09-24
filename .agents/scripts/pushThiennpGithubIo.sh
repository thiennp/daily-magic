#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SOURCE_DIR="$REPO_ROOT/external/thiennp.github.io"
PATCH_FILE="$SOURCE_DIR/patches/agent-witch-2026.patch"
REMOTE_REPO="${PORTFOLIO_GITHUB_REPO:-thiennp/thiennp.github.io}"
BRANCH="${PORTFOLIO_GITHUB_BRANCH:-master}"
WORK_DIR="$(mktemp -d)"

cleanup() {
  rm -rf "$WORK_DIR"
}
trap cleanup EXIT

if [[ ! -f "$PATCH_FILE" ]]; then
  echo "Missing $PATCH_FILE" >&2
  exit 1
fi

TOKEN="${THIENNP_GITHUB_IO_DEPLOY_TOKEN:-${GITHUB_TOKEN:-}}"
CLONE_URL="https://github.com/${REMOTE_REPO}.git"
if [[ -n "$TOKEN" ]]; then
  CLONE_URL="https://x-access-token:${TOKEN}@github.com/${REMOTE_REPO}.git"
fi

git clone --depth 1 --branch "$BRANCH" "$CLONE_URL" "$WORK_DIR/site" 2>/dev/null || {
  git clone --depth 1 "$CLONE_URL" "$WORK_DIR/site"
  cd "$WORK_DIR/site"
  git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH"
  cd "$REPO_ROOT"
}

cd "$WORK_DIR/site"
git apply --check "$PATCH_FILE"
git apply "$PATCH_FILE"

if git diff --quiet; then
  echo "No changes to push."
  exit 0
fi

git add index.html agent-witch-case-study.html
git commit -m "docs: sync Agent Witch intro from daily-magic external/thiennp.github.io"
git push origin "$BRANCH"

echo "Pushed to ${REMOTE_REPO} (${BRANCH})."
