# Why is there no Connect button when my computer is not “This computer”?

## Query aliases

- no connect button when computer is not connected
- Mac offline but no Connect this computer button
- no this computer in the device list
- Mac settings and connect does not connect
- why is Your Devices offline with no connect button
- computer not connected yet missing connect button
- khong co nut connect khi may offline
- this computer is not linked

## Short answer

**Connect this computer** is how you link the computer you are using. It shows in the hero and under **Your Devices** whenever that computer is not already matched to a listed device. A missing **This computer** badge means this browser is not linked yet, even if other computers are already on the account and offline. **Mac settings & connect** only opens **Your setup**. It does not link or wake a computer.

If the badge is missing and the button is also missing, Home was stuck treating a skipped identity check as still loading (HOME-057). After that fix, the button stays available until this computer is linked.

## Details

| What you see                                                  | What you can do                                                           |
| ------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **This computer is not linked** and **Connect this computer** | Run the install command on the computer you are using.                    |
| **This computer** on a row, status **Mac offline**            | That computer is already linked. Start Agent Witch on it so it checks in. |
| **Mac settings & connect**                                    | Opens rules and sharing. It does not pair the computer.                   |
| **Cursor Cloud connected**                                    | A cloud worker. Separate from the computer or Linux host.                 |

The button stays hidden on a phone, while a wake-identity probe is actually in progress, and after this browser’s pairing token matches a listed device.

## Related

- [Home and navigation](../guides/user-guide/03-home-and-navigation.md)
- [Mac connect and bridge](../guides/user-guide/04-mac-connect-and-bridge.md)
- [How AWC knows this computer](awc-how-browser-knows-this-computer.md)
- Code: `resolveShouldShowConnectThisMac`, `resolveIsCheckingLocalMacIdentity`, `ConnectThisMacButton`

## Last reviewed

2026-09-28
