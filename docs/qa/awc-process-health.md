# What does GET /api/health prove?

## Query aliases

- api health release label
- process health check Railway
- device supersession migration applied
- server release label deploy proof
- health 200 before Next ready
- 503 Service starting
- kiểm tra health Agent Witch
- prove a deploy without Railway

## Short answer

`GET /api/health` proves the **AWC** Node process is listening. On `npm run dev` and `npm start`, root `server.ts` answers that path itself and returns **HTTP 200** with JSON as soon as `server.listen` succeeds, including while Next is still preparing. A 200 does not mean pages or the computer WebSocket are ready. Other paths return **503** with body `Service starting` until `next.prepare()` finishes, and WebSocket upgrades are dropped until then. The JSON always has `ok: true` when this process answers. `release.label` is the constant you bump to prove a user-visible server deploy. `deviceSupersessionMigrationApplied` is a cached lookup of one migration row. A database error sets that flag to `false` and still returns 200.

## Details

### Who answers

| Entry                                         | What happens                                                                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev` / `npm start` (`tsx server.ts`) | `server.ts` handles `/api/health` before the Next handler. The App Router file `src/app/api/health/route.ts` is not reached.    |
| `npm run dev:next`                            | Next serves `src/app/api/health/route.ts` (`dynamic = "force-dynamic"`). No custom-server early 200, and no computer WebSocket. |

Railway uses `healthcheckPath = "/api/health"` and `healthcheckTimeout = 300` (`railway.toml`). The timeout is how long Railway waits for the first 200. Because the process returns 200 before Next is ready, a green health check can arrive while browsers still see `Service starting` and while `/api/agent-witch/ws` upgrades are destroyed.

The custom server does not check the HTTP method. Any method on pathname `/api/health` gets the same JSON 200. Railway and operators use GET.

### Payload

Built by `buildAgentWitchHealthPayload` in `src/lib/release/buildAgentWitchHealthPayload.ts`.

```json
{
  "ok": true,
  "release": {
    "label": "<AGENT_WITCH_SERVER_RELEASE_LABEL>",
    "commitSha": "<full sha or null>",
    "shortCommitSha": "<first 7 chars or null>"
  },
  "deviceSupersessionMigrationApplied": true
}
```

| Field                                | Source                                                                                           | Constraint                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `ok`                                 | Always `true` on this route                                                                      | This probe does not fail the process when the database is down.                          |
| `release.label`                      | `AGENT_WITCH_SERVER_RELEASE_LABEL` in `src/lib/release/agentWitchServerReleaseLabel.constant.ts` | Bump it when shipping a user-visible server fix you need to see without opening Railway. |
| `release.commitSha`                  | First non-empty of `RAILWAY_GIT_COMMIT_SHA`, `VERCEL_GIT_COMMIT_SHA`, `GITHUB_SHA`               | Local dev usually has none, so both SHA fields are `null`.                               |
| `release.shortCommitSha`             | First 7 characters of `commitSha`                                                                | `null` when no SHA is set.                                                               |
| `deviceSupersessionMigrationApplied` | Row in `schema_migrations` whose `filename` is `026-agent-witch-device-supersession.sql`         | Cached in memory for 60 seconds. A lookup error is stored as `false`.                    |

If the async builder throws, `server.ts` sends the sync fallback: the same release fields, and `deviceSupersessionMigrationApplied: false`. The migration lookup already catches its own errors, so that fallback is for an unexpected throw.

`false` means either the migration row is missing or the lookup failed. It does not by itself say the database is down. Use `GET /api/db/health` for Neon (`connected: true` or HTTP 500). That route is a Next handler, so it stays on **503** until Next is ready.

There is no in-app header badge for the server release label; use `curl` or Railway deploy metadata to compare `release.label` with `AGENT_WITCH_SERVER_RELEASE_LABEL`.

### Prove a deploy

```bash
curl -sS https://www.agentwitch.com/api/health
```

Compare `release.label` with `AGENT_WITCH_SERVER_RELEASE_LABEL` on the commit you shipped. Compare `release.shortCommitSha` with the Railway commit when that env var is set. If `deviceSupersessionMigrationApplied` is `false` after `preDeployCommand` (`npm run db:migrate`), the flag can lag up to 60 seconds on a process that was already up, or the row `026-agent-witch-device-supersession.sql` is absent, or the lookup failed. A restart clears the cache.

### Pitfalls

- Treating HTTP 200 as “the site and the computer bridge are up.” Pages and WebSocket wait on `nextReady`.
- Expecting this route to return 503 until Next is ready. That was the old map. Only non-health routes do that.
- Using `deviceSupersessionMigrationApplied: false` as a database outage. Confirm with `/api/db/health`.
- Editing only `src/app/api/health/route.ts` and expecting `npm start` to change. Production answers from `server.ts`.

## Related

- [deployment.md](../development/deployment.md)
- [Chapter 8 — Deploy, hosting, and Neon](../guides/developer-guide/08-deploy-hosting-neon.md)
- [Chapter 3 — Architecture map](../guides/developer-guide/03-architecture-map.md)
- `server.ts`
- `src/lib/release/buildAgentWitchHealthPayload.ts`
- `src/lib/release/readDeviceSupersessionMigrationApplied.ts`
- `src/app/api/health/route.ts`
- `src/app/api/db/health/route.ts`

## Last reviewed

2026-09-28
