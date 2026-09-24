# Chapter 2 — Accounts and sign-in

Agent Witch is a **signed-in** product: your **Tasks**, **Runs**, paired **Macs**, and saved **Playbooks** belong to your user (and optionally your team). This chapter covers how you get in, what an account controls, and how sign-in relates to **Connect this Mac**.

For vocabulary (**Mac**, **Task**, **Run**, **Playbook**), see [Chapter 0](00-philosophy-and-vocabulary.md).

---

## Where you sign in

| Surface        | URL                                                                  | Notes                                                                       |
| -------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Production** | [https://www.agentwitch.com/login](https://www.agentwitch.com/login) | Magic link and/or Google, per environment config.                           |
| **Local dev**  | `http://localhost:3000/login`                                        | Engineers use `.env.local` auth secrets; test accounts available—see below. |

After sign-in, you land in the **Console** (Home, Runs, New task). Marketing pages without a session do **not** probe your Mac for identity ([browser knows this computer](../../qa/awc-how-browser-knows-this-computer.md)).

---

## Sign-in methods

### Google OAuth

When enabled, **Continue with Google** creates or links a user record in Agent Witch’s database (NextAuth + Neon). Use the Google account your organization expects—team features and admin roles may depend on email domain or manual promotion.

### Email magic link

When Resend (or your configured provider) is set up:

1. Enter your email on **Sign in**.
2. Open the link in the email (same browser recommended).
3. You receive a session cookie for `www.agentwitch.com`.

**Honest UX:** Links expire; requesting many links in a row can rate-limit. Use one tab; avoid forwarding magic links—they are bearer tokens for your account.

### Test sign-in (development and QA only)

On **localhost** (or when `ALLOW_TEST_AUTH=1` in non-production builds):

- Emails matching `test*@agentwitch.com` can sign in from `/login` **without** email delivery.
- Scripts like `npm run test:auth:session` print cookie values for automation.

This bypass is **off on production** `www.agentwitch.com` for security. Details: [Local setup — test auth](../../development/setup.md#test-auth-no-google--magic-link).

---

## What your account owns

| Owned by you (cloud)                                                | Lives on the Mac                                                             |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Paired **Mac** rows (device name, presence, pairing token **hash**) | Pairing token secret, harness/playbook **files**, writer session transcripts |
| **Runs** / reports history                                          | Shell execution, project folders on disk                                     |
| Saved capabilities, library drafts (after sync), workflow runs      | Installed playbook files under `~/.agent-witch/harness/`                     |
| Optional Cursor Cloud API keys (if configured)                      | Local CLI binaries (Cursor, Claude Code, etc.)                               |

Signing out of the browser **does not** uninstall the Mac helper. Uninstalling the Mac helper **does not** delete cloud run history—it may mark the Mac **Offline** until you remove or reclaim the device.

---

## Solo vs company (same account, different chrome)

Agent Witch uses one codebase with **persona gates** in navigation:

| Mode               | What you typically see                                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Solo maker**     | Home, Runs, **New task**, **Marketplace** (official playbook install), **Playbooks** (`/library`), account menu.                                             |
| **Company / team** | Same core loop plus team visibility on **Runs**, shared **Playbooks**, fewer solo-only growth surfaces; **Automations** may appear when team nav is enabled. |

Exact nav labels follow [UX simplification](../../product/ux-simplification.md). Your org may enable groups without changing how **Mac** pairing works.

**Team learning** ([Chapter 0 — four pillars](00-philosophy-and-vocabulary.md#four-pillars)) starts here: the same account can see shared **Runs**, install org **Playbooks** from **Marketplace**, and reuse templates in **Library**—not only private one-off prompts. Solo makers still pair a **Mac** the same way; company mode adds visibility and shared standards.

**Admins** (super-admin or team admin) may see extra routes (user management, policy). Those are not part of every user’s Home checklist.

---

## Pairing a Mac to your account

Pairing is the bridge between **account** and **machine**:

1. **Sign in** on the Mac’s browser (same machine as the install).
2. Run the **install script** from Home ([Chapter 1](01-getting-started.md)).
3. Complete **Connect this Mac** so the cloud stores a **claimed device** with a `tokenHash`.
4. On macOS, the browser reads `GET http://127.0.0.1:{wakePort}/identity` from the **Mac bridge** and matches hashes—see [Q&A: this computer](../../qa/awc-how-browser-knows-this-computer.md) and [localhost identity / CORS](../../qa/awb-localhost-identity-and-cors.md).

**Two UI phrases (do not confuse them):**

| Copy                               | Meaning                                                         |
| ---------------------------------- | --------------------------------------------------------------- |
| **“This computer”** (connect row)  | Product copy: link the Mac you’re sitting at now.               |
| **“this Mac” badge / On this Mac** | Computed match: cloud device hash equals local bridge identity. |

If identity is not linked after install, run **Connect this Mac** again while signed in—pairing token under `~/.agent-witch` must match a claimed device ([update / reconnecting Q&A](../../qa/awi-update-local-launchagent-plist.md)).

---

## Account menu essentials

Open your profile / account menu (top bar) for:

| Item              | Purpose                                                   |
| ----------------- | --------------------------------------------------------- |
| **Mac & devices** | List paired Macs, presence, install bundle version hints. |
| **Settings**      | Profile, notifications, integrations (as shipped).        |
| **Sign out**      | Ends browser session; Mac helper may keep running.        |

**Mac settings** links often open the **local helper** or `#your-setup` anchors for update, wake, and repositories—browser daily work stays on Home and **New task** ([Chapter 4](04-mac-connect-and-bridge.md)).

---

## Guest vs signed-in (library only)

Unsigned visitors may browse **Marketplace** / guest library drafts in **browser storage** on that device only. **Running** workflows and dispatch require sign-in and a dispatch-ready **Mac** (or configured Cursor Cloud key). See [guest library Q&A](../../qa/guest-library-browser-drafts.md).

After you sign in, guest drafts can sync to your cloud library (newer `updatedAt` wins). That handoff is personal reuse today; team **Library** and **Marketplace** are where org-wide **team learning** lives ([Chapter 7](07-capabilities-library-playbooks.md)).

---

## Security habits (plain language)

- Treat magic links like passwords—do not paste them in public chats.
- Pairing tokens on disk prove your Mac to the cloud; protect your Mac login and disk encryption.
- The Console never receives your raw pairing token in the device list—only a **hash** ([Q&A](../../qa/awc-how-browser-knows-this-computer.md)).
- Loopback **identity** is allowed only from Agent Witch origins to **your** `127.0.0.1` on the same Mac—not from random websites ([CORS Q&A](../../qa/awb-localhost-identity-and-cors.md)).

Threat model for engineers: [security/threat-model.md](../../security/threat-model.md).

---

## Troubleshooting sign-in

| Symptom                             | Try                                                                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Google error / redirect loop        | Confirm `AUTH_SECRET` and OAuth URLs on custom deployments; production uses Agent Witch’s configured Google app.                |
| No magic email                      | Spam folder; resend once; verify Resend/domain on self-hosted envs.                                                             |
| Signed in but no Mac badge          | Must be **macOS browser on same Mac as bridge**; refresh tab; check helper running ([Chapter 4](04-mac-connect-and-bridge.md)). |
| Test account rejected on production | Expected—use real auth on `www.agentwitch.com`.                                                                                 |

---

## Related docs

- [Chapter 1 — Getting started](01-getting-started.md)
- [Chapter 3 — Home and navigation](03-home-and-navigation.md)
- [Auth domain (engineers)](../../domains/auth-shell-admin.md)
- [System Q&A](../../qa/README.md)

---

## Query aliases

- Agent Witch sign in, login, Google OAuth, magic link
- account pairing Mac, connect this Mac, this computer badge
- dang nhap Agent Witch, tai khoan, lien ket Mac
- email magic link Agent Witch, test auth localhost
- team nav solo marketplace Agent Witch account
- team learning shared runs library account, team chia se kinh nghiem tai khoan
