# Why is there no Connect button when my computer is offline?

## Query aliases

- no connect button when computer is not connected
- Mac offline but no Connect this Mac button
- Mac settings and connect does not connect
- why is Your Devices offline with no connect button
- computer not connected yet missing connect button
- khong co nut connect khi may offline
- Home hides Connect this Mac when devices already exist

## Short answer

**Those computers are already paired.** Home lists them under **Your Devices** and the hero says **Mac offline**. **Connect this Mac** and **Connect another Mac** are the first-time pairing controls. They stay hidden once a device is already on the account (and, on a Mac, once this browser’s pairing-token cookie matches one of those devices). Offline means the helper is not on a live WebSocket right now. The website cannot dial the machine; start Agent Witch on that computer so it checks in. **Mac settings & connect** only scrolls to **Your setup**. It does not pair or wake the computer.

## Details

| What you see                                    | What it means                                                                       |
| ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| **No Mac connected** and a Connect control      | No claimed device yet. Pair from Home.                                              |
| **Mac offline** plus rows such as “Last seen …” | Devices are already claimed. The helper is not live.                                |
| **Mac settings & connect**                      | Link to `/#your-setup` (rules and sharing) when the local Mac app is not reachable. |
| **Cursor Cloud connected**                      | A cloud worker session. Separate from the Mac or Linux host.                        |

### Why the buttons are hidden

- **Connect another Mac** renders only when `shouldShowAgentWitchAppDownloadCta` is true: the devices list has finished loading and there is no claimed device (`useLocalMacBrowserContext` treats any claimed device as “local app installed”).
- **Connect this Mac** is hidden while local identity is still loading, on a phone, and on macOS when `deviceMatchesLocalTokenHash` matches a listed device. A missing local token on macOS still shows the row (HOME-030). Linux and Windows desktops keep the row.
- An offline device row is clickable and opens wake instructions. There is no button labeled **Connect** on that row.

### How to get the computer online

1. On that computer, start Agent Witch (login autostart, or the wake command from the offline row).
2. Wait until Home shows **Mac online**. The helper opens `wss://www.agentwitch.com/api/agent-witch/ws`.
3. If the row says **update available**, update that install before sending tasks. Bundle mismatch blocks dispatch the same way an offline host does.

## Related

- [Home and navigation](../guides/user-guide/03-home-and-navigation.md) — Offline vs none / not connected
- [Mac connect and bridge](../guides/user-guide/04-mac-connect-and-bridge.md)
- [How AWC knows this computer](awc-how-browser-knows-this-computer.md)
- [Reconnecting vs local live](awc-mac-reconnecting-vs-local-live.md)
- Code: `resolveShouldShowConnectThisMac`, `shouldShowAgentWitchAppDownloadCta`, `HomeMacSettingsLink`, `resolveHomeMacStatusSummary`

## Last reviewed

2026-09-28
