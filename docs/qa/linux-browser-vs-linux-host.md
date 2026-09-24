# Can Agent Witch be used from Linux?

## Query aliases

- Agent Witch Linux access, can I use Agent Witch on Linux
- agentwitch can't be accessed via linux
- Linux browser vs Linux host AWI
- Agent Witch installs on macOS only
- truy cap Agent Witch tren Linux, cai dat host Linux
- console AWC on Linux, AWL Mac only, Linux device picker

## Short answer

**The website can be used from Linux.** Agent Witch Console (AWC) at `https://www.agentwitch.com` is a normal browser app. A Linux desktop can sign in, read Runs, and send Tasks to a host that is already live.

**Running the agent on that Linux machine is a separate, narrower path.** The install script can pair an **x86_64 Linux** host (AWI) with `platform: "linux"`, a systemd user unit, and the same WebSocket dispatch rules as a Mac. Desktop Linux Home shows that install command. The device picker labels the row **Linux device**. **Agent Witch Live (AWL)** and the loopback bridge (**AWB**, “this computer”) stay **Mac-only**. Many status lines still say “Your Mac”.

## Details

| Surface                                        | Linux today                                                                                                      | What people mean by “access”           |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **AWC** Console (`www.agentwitch.com`)         | Yes, any desktop browser                                                                                         | Open the product, sign in, watch Runs  |
| **AWI** host (runs Tasks in a real shell)      | Yes on **x86_64** with `curl`, `tar`, and a systemd **user** session (or foreground). Same pairing token as Mac. | “Install Agent Witch on this computer” |
| **AWL** (`http://127.0.0.1:43347`)             | No. Mac-local UI                                                                                                 | Projects, folders, local knowledge     |
| **AWB** identity (`127.0.0.1:47892` / `47893`) | No. The browser probes identity only when the user agent is **macOS**                                            | “This computer” / “this Mac” badge     |

Send still requires `presenceTier: live`. A Linux host that is paired but not live blocks Send the same way a Mac does. Readiness reason codes are still named `mac_*` even when the live row is Linux.

### Why the answer sounds contradictory

1. **Product vocabulary still says Mac.** Philosophy and Home copy treat “Mac” as the machine that runs agents. That sentence is true for the original product and false as a blanket for the console and for the Linux host.
2. **Desktop Linux Home shows the install command.** `detectBrowserOperatingSystem` returns `linux`. Windows and phones still say “Agent Witch installs on macOS.” The installer branches on `uname -s` == `Linux` and posts `platform: "linux"`.
3. **Only the picker is honest.** `MacDevicePickerRows` and `resolveMacDeviceDisplayName` say **Linux device**. Offline banners, benefit copy, and the user guide still say **Your Mac**.
4. **“This computer” is not the Linux host.** A Linux browser never reads AWB `/identity`, so it will not show a local badge even after a Linux host is live. The host still appears in the cloud device list.

### What to fix

| Fix                                                                                                             | Why                                                                                      |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Split the sentence in support, philosophy, and Home: console vs host vs Mac-only local app                      | Stops “can’t access via Linux”                                                           |
| Detect desktop Linux in `detectBrowserOperatingSystem` and give Terminal + systemd steps instead of “Use a Mac” | Shipped. Desktop Linux gets the install command. Windows and phones still say use a Mac. |
| Keep AWL and AWB Mac-only in that copy                                                                          | Do not promise the local Mac app on Linux                                                |
| Status and error strings that say “Your Mac” need a host-neutral line when `platform` is `linux`                | Picker and banners currently disagree                                                    |
| Leave `mac_*` reason codes, or rename them in one pass with tests                                               | Renaming without a pass will break readiness clients                                     |

Smoke checklist and install command: [linux-agent-host-smoke.md](../product/linux-agent-host-smoke.md).

## Related

- [How AWC knows this computer](awc-how-browser-knows-this-computer.md) — identity probe is macOS-only
- [Deployables](../product/agent-witch-deployables.md) — AWC / AWL / AWB / AWI
- [User guide ch.0](../guides/user-guide/00-philosophy-and-vocabulary.md) — Mac vocabulary
- [User guide ch.4](../guides/user-guide/04-mac-connect-and-bridge.md) — connect and bridge
- Code: `buildConnectComputerGuideSteps`, `detectBrowserOperatingSystem`, `buildAgentWitchInstallScriptRegisterInstall`, `MacDevicePickerRows`

## Last reviewed

2026-09-24
