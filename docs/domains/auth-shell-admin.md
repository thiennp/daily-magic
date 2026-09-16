# Domain: Auth, shell & admin

**Scope:** Sign-in (NextAuth, Google/email), app chrome (nav, connection badge), admin users/groups/dispatch rules, guest marketing on `/`.

**Registry slugs:** `auth`, `shell`, `admin`, `marketing`, `showcases`, `styleguide`

## Skim (L1)

- Sessions in **Neon** (database strategy); `/login` and `/api/auth`.
- **Shell** mounts global listeners (e.g. approvals); most routes sit inside authenticated layout.
- **Admin** = `/admin/*` and `/api/admin` (super_admin / company policies).

## Read next if…

| If you need…                | Open                                                                   |
| --------------------------- | ---------------------------------------------------------------------- |
| Local setup, env vars       | [development/setup.md](../development/setup.md)                        |
| Session cookie testing (VM) | [AGENTS.md](../../AGENTS.md) § Cursor Cloud                            |
| Security boundaries         | [security/threat-model.md](../security/threat-model.md)                |
| Nav / onboarding UX         | [product/ux-simplification.md](../product/ux-simplification.md)        |
| Feature-specific behavior   | L2 `src/features/auth/README.md`, `shell/README.md`, `admin/README.md` |

```bash
npm run feature-knowledge:query -- "NextAuth session" --feature=auth
```
