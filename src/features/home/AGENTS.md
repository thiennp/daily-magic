# Home — agent instructions

## Before you change code

1. Query feature knowledge for the slug `home` and the symptom you are fixing.
2. Read `KNOWN_ISSUES.md` in this folder; add a regression test for every new bug.
3. Prefer pure helpers in `utils/` for branching logic (see `resolveHomeDashboardMode`).

## Invariants

- **Connected state** must come from the device list API, never optimistic `markPaired()` alone.
- **Dashboard gating** uses `resolveHomeDashboardMode` — `connect` until `deviceCount > 0`.
- **Connect copy** uses `resolveConnectAnotherMacLabel(hasExistingDevices)` — never "another" with zero devices.
- **Download CTA** — show DMG download only when local wake `/identity` is unreachable (`shouldShowAgentWitchAppDownloadCta`); never show bash install commands in Home UI.

## Tests to extend

| Helper                             | Test file                                  |
| ---------------------------------- | ------------------------------------------ |
| `resolveHomeDashboardMode`         | `resolveHomeDashboardMode.test.ts`         |
| `resolveConnectAnotherMacLabel`    | `resolveConnectAnotherMacLabel.test.ts`    |
| `resolveHasPairedDeviceAfterFetch` | `resolveHasPairedDeviceAfterFetch.test.ts` |
| `buildHomeSetupNextStep`           | `buildHomeSetupNextStep.test.ts`           |
| `resolveAppBaseUrl` (auth)         | `src/lib/app/resolveAppBaseUrl.test.ts`    |

## After fixing a bug

1. Add row to `KNOWN_ISSUES.md` with ID `HOME-###`.
2. Add or extend a unit test referencing the ID in the test name.
3. Run `npm run feature-knowledge:index`.
