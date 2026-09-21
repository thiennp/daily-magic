# Library — known issues

| ID          | Symptom                                                                                   | Fix / test                                                                                                         |
| ----------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| LIBRARY-001 | Duplicate template installs cluttered New task with identical workflow rows and no delete | Archive from picker trash (AGENT-035); Library page Delete already archives                                        |
| LIBRARY-002 | Guest browser drafts did not sync if user signed in without visiting `/library` first     | `GuestLibraryDraftSyncListener` in `AppShell`; event `agentwitch.guest-library-drafts-synced` refreshes library UI |
