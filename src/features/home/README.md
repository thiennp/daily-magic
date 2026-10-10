# Home dashboard

Authenticated hub, onboarding, Mac connect flow, and guest landing at `/`.

## Scope

| Area         | Path                                         |
| ------------ | -------------------------------------------- |
| Feature UI   | `src/features/home/`                         |
| Routes       | `src/app/(app)/page.tsx`                     |
| Related APIs | `/api/agent-witch/devices` (via agent-witch) |

## Dependencies

- **agent-witch** — device pairing, install command, WebSocket presence
- **capabilities** — team offerings on dashboard
- **harness** — catalog shortcuts
- **dispatch** — approval listener mount via shell
- **macDevices** — device row UI in left rail

## Key flows

1. **Guest** — marketing shell on `/` when logged out (hero, presets, showcase articles).
2. **Connect Mac** — until `useHomeConnectedMacs()` returns at least one device, only the left rail + connect guide render (`HomeLinkAccountGate`). Showcase articles still appear below.
3. **Dashboard** — after a computer is paired, children (tasks, marketplace, etc.) render, with the same showcase article sections as the guest landing. The onboarding left rail is omitted when the checklist and automate nudge are hidden (HOME-064), so the main column uses the full content width.
4. **Cursor Cloud** — Your Devices shows a **Connect Cursor Cloud** button (not the API-key form). The form and steps open in `ConnectCursorCloudModal` (HOME-033).

## Query feature knowledge

Before editing home behavior, run:

```bash
npm run feature-knowledge:query -- "home dashboard mac connect"
npm run feature-knowledge:query -- "HOME-003"
```

Or `POST /api/feature-knowledge/query` with `{ "query": "...", "featureSlug": "home" }`.

Re-index after doc changes: `npm run feature-knowledge:index`.

## types public API

`types/public-api/types.ts` exposes `ConnectedClient` and `AgentWitchStatusResponse`; import them from there outside `types/`.

## components public API

`components/public-api/presentation.ts` exposes the marketing landing components (`HomeMarketingAuthModalProvider`, `HomeMarketingHero`, `HomeMarketingPopularPresets`, `HomeMarketingPopularPresetsGrid`) and `HomePromptOptimizerCtaBox`; import them from there outside `components/`.

## constants public API

`constants/public-api/types.ts` exposes the home copy, CTA, preset-id, limit and class constants (and `HomeOnboardingMainStepContent`); import them from there outside `constants/`.

## hooks public API

`hooks/public-api/presentation.ts` exposes the home client hooks (connected Macs, onboarding steps, attention and running-job hooks, install-command and local Mac hooks) and `OnboardingStepsProvider`; import them from there outside `hooks/`.

## Public API: `utils`

Code outside `src/features/home/utils/` imports it only through `utils/public-api/presentation` (helpers, stores, API clients) and `utils/public-api/types` (types and event constants).
