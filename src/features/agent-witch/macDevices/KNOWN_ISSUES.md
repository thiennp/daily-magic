# Mac devices UI — known issues

| ID              | Symptom                                                            | Fix                                                              |
| --------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------- |
| MAC_DEVICES-001 | Clicking an offline Mac only showed a hover tip; no turn-on prompt | Offline row click opens `MacDeviceWakeModal` via capture handler |
| MAC_DEVICES-002 | This Mac badge showed parentheses and bundle detail on its own line | Label `this Mac`; render bundle detail beside badge on same row  |
