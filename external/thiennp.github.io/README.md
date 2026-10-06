# thiennp.github.io — AgentWitch copy sync

Canonical **AgentWitch** sections for [thiennp.github.io](https://thiennp.github.io/) (branch **`master`**).

| File                             | Purpose                                                       |
| -------------------------------- | ------------------------------------------------------------- |
| `patches/agent-witch-2026.patch` | Applies AgentWitch card + case study updates via `git apply` |
| `agent-witch-case-study.html`    | Reference copy after patch (for review)                       |

Product wording must match [docs/product/philosophy-and-copy-guideline.md](../../docs/product/philosophy-and-copy-guideline.md).

## Push to GitHub Pages repo

From repo root (requires **push** access to `thiennp/thiennp.github.io`):

```bash
bash .agents/scripts/pushThiennpGithubIo.sh
# or: npm run portfolio:push-github-io
```

Needs a token with `contents: write` on `thiennp/thiennp.github.io` (`THIENNP_GITHUB_IO_DEPLOY_TOKEN` or `GITHUB_TOKEN`). Portfolio no longer auto-syncs via CI — run the script manually when the portfolio changes.
