# thiennp.github.io — Agent Witch copy sync

Canonical **Agent Witch** sections for [thiennp.github.io](https://thiennp.github.io/) (branch **`master`**).

| File                             | Purpose                                                       |
| -------------------------------- | ------------------------------------------------------------- |
| `patches/agent-witch-2026.patch` | Applies Agent Witch card + case study updates via `git apply` |
| `agent-witch-case-study.html`    | Reference copy after patch (for review)                       |

Product wording must match [docs/product/philosophy-and-copy-guideline.md](../../docs/product/philosophy-and-copy-guideline.md).

## Push to GitHub Pages repo

From repo root (requires **push** access to `thiennp/thiennp.github.io`):

```bash
npm run portfolio:push-github-io
```

Or GitHub Actions: **Sync thiennp.github.io** workflow (needs secret `THIENNP_GITHUB_IO_DEPLOY_TOKEN` with `contents: write` on that repo).

Cloud agents on `thiennp/daily-magic` alone cannot push this remote unless the token secret is configured.
