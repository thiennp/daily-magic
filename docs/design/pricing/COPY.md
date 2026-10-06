# AgentWitch Pricing — user-facing copy extract

Source: `/workspace/agentwitch/docs/design/pricing/AgentWitch-Pricing.html`  
Claude artifact: **1a19bd9d** (~22:32 CEST, 2026-10-06)  
Extracted: 2026-10-06 ~22:36 CEST (Europe/Berlin)  
Method: static chrome + JS string/template extract (UI is JS-rendered into `#panel` / `#head`).  
Dev-corner (“Not part of the product”) is **not** shipping copy.

**Locked rules win over HTML.** Provisional prices and sample-claim exclusions are in BUILD-NOTES.

---

## Provisional price constants (recommend one config)

```
PRICING = {
  currency: 'USD',
  pro:  { pricePerSeatMonth: 29, minSeats: 1 },
  team: { pricePerSeatMonth: 49, minSeats: 3 },
  trialDays: 30,   // “1 month free”
  maxComputers: 2,
  assistantsConnect: { pro: 3, team: 10 }
}
```

Thien changes numbers in **one** place. Do not hard-code `$29` / `$49` across components.

---

## Nav notes

### Signed-out (marketing shell)
- Brand: AgentWitch
- Top: Sign in · Start trial
- Skip to content

### Signed-in (app shell)
| Label | Note |
|-------|------|
| Home | keep |
| Projects | keep |
| Marketplace | **never hide** |
| Connect | **never hide** |
| My bots | **keep as-is** (Lead later may rename) |
| New task | keep |
| Billing | current page (`aria-current`) |
| Devices | side section + Connect this / another computer |
| Cursor Cloud | Connected / Not connected + Connect / Disconnect |

Breadcrumb (signed-in): Account › Billing and plans

---

## Hero

1. h1 — Simple pricing
2. lead — Assistants on your projects. Start with a free month, then pay per seat. Cancel anytime. Prices in USD, excl. tax
3. tip (About prices) — Sales tax is added at checkout where it applies. All prices are per seat per month unless said otherwise.

---

## Trial card

- Name: Trial
- Tag: Try everything in Pro for a month.
- Price: $0 · for 1 month
- Min line: Then choose Pro or Team
- Feats:
  - All Pro features for 1 month
  - No card needed
  - Connect up to 3 assistants
  - Up to 2 computers
  - No cloud message storage during the trial
- CTA signed-out: Start trial
- CTA on-plan: Your plan
- Footer note: Cancel anytime.
- Modal title: Start your free month
- Modal body bullets: Connect up to 3 assistants · Up to 2 computers · Local LLM and token savings · Use your own AI accounts and S3, free · No cloud message storage during the trial
- Modal help: Ends {date}. Choose Pro or Team before then. Cancel anytime.
- Modal actions: Not now · Start trial

---

## Pro card

- Badge: Most popular
- Name: Pro
- Tag: Full access for people who use assistants every day.
- Price: $29 · per seat / month *(provisional)*
- Min line: From 1 seat
- Feats:
  - Every AgentWitch feature for each seat
  - Connect up to 3 assistants
  - Local LLM
  - Token savings with auto skill build
  - Up to 2 computers
- CTA signed-out / upgrade: Subscribe
- CTA switch: Switch to Pro
- Footer note: Cancel anytime.

---

## Team card

- Name: Team
- Tag: For teams that share work and billing.
- Price: $49 · per seat / month *(provisional)*
- Min line: Minimum 3 seats · $147 / month *(3 × provisional)*
- Feats:
  - Everything in Pro
  - Connect up to 10 assistants
  - Share harness across your team
  - Team token savings on repeated work
  - Seat management and roles
  - Pay by invoice
- CTA: Start team / Switch to Team
- Extra: Contact sales
- Note: 10 or more seats? Ask us about a volume discount.

---

## Trust strip (under cards)

1. **1 month free** — No card needed
2. **Cancel anytime** — No fees, no calls
3. **Seats are access only** — AI and storage are optional

---

## Comparison rows

Caption (sr): Compare Trial, Pro and Team  
Columns: Trial ($0 for 1 month) · Pro ($29 / seat) · Team ($49 / seat)

### Access
| Feature | Trial | Pro | Team | Tip (if any) |
|---------|-------|-----|------|--------------|
| Every AgentWitch feature | Included | Included | Included | |
| Length | 1 month | Ongoing | Ongoing | |
| Assistants you can connect | 3 | 3 | 10 | How many assistants can be connected at once. Each API key you add counts as 1 assistant. |
| Computers | Up to 2 | Up to 2 | Up to 2 | The same limit of 2 computers applies to every plan. |
| Projects | Unlimited | Unlimited | Unlimited | |

### Saving tokens
| Feature | Trial | Pro | Team | Tip |
|---------|-------|-----|------|-----|
| Local LLM | Included | Included | Included | |
| Token savings with auto skill build | Included | Included | Included | AgentWitch builds a skill from work you repeat… Works with your own AI accounts or AI credit you buy. |
| Skill from repeated work runs on | Your own AI or an AgentWitch AI pack | (same) | (same) | When you create a skill… choose: own tokens/AI or buy an AgentWitch AI pack. |
| Prompt Optimizer runs on | Your CLI, an assistant or tokens you buy | (same) | (same) | You can also add your own API key. Each API key counts as 1 assistant… |
| Team token savings on repeated work | – | – | Included | When the same work repeats across your team… |
| Share harness across your team | – | – | Included | Your team shares one harness setup across all seats. |

### AI and storage, all optional
| Feature | Trial | Pro | Team | Tip |
|---------|-------|-----|------|-----|
| Your own AI accounts | Free | Free | Free | Connect AI accounts you already have… AgentWitch charges nothing for that. |
| Your own S3 for messages | Free | Free | Free | Keep messages in your own bucket, or on this computer… |
| AgentWitch AI credit | On demand | On demand | On demand | Only if you want AgentWitch to bill the AI. Never part of a seat. |
| AgentWitch cloud message storage | Not in the trial | Optional add-on | Optional add-on | Starts when paid billing starts… not available during the free month. |

### Team
| Feature | Trial | Pro | Team |
|---------|-------|-----|------|
| Seat management and roles | – | – | Included |
| Pay by invoice | – | – | Included |
| Minimum seats | 1 | 1 | 3 |
| Support | Email | Email | Priority email |
| Cancel anytime | Included | Included | Included |

---

## How AI works / add-ons

Design uses two sections (no exact h2 “How AI works”):

### Bring your own
- h2 — Bring your own
- sub — AI and storage are not part of a seat. Use your own, free, or add ours only when you need it.
- Card: Your own AI accounts — Free to connect — Connect the AI accounts you already pay for…
- Card: Your own S3 — Free to connect — Keep messages in your own bucket, or leave them on this computer…

### On demand, only if you need it
- h2 — On demand, only if you need it
- sub — Need AgentWitch to run the AI or keep your messages? Add it when you want, cancel anytime.
- Add-on: **AI credit** — $10 / pack of $10 credit — For skills from repeated work and the Prompt Optimizer, when you do not want to use your own AI… Packs of $10, $20 or $50.
- Add-on: **Cloud storage** — $0.90 / GB / month — Only if you do not want to keep messages on this computer or in your own S3. Starts when paid billing starts, not during the free month.
- Control note: You stay in control of spend. AI you run through AgentWitch is billed as you use it… Set a monthly limit… email at 80%.
- Estimator (demo UI): Plan / Seats / AI / Credit packs / Message storage / Storage (GB) → Per month. Help: Monthly cost once paid billing starts. Your free month costs $0.

### Skill-from-repeat modal
- Title: Create a skill from repeated work
- Intro: Pick what pays for the AI that builds the skill.
- Option A: Use my own tokens or AI — Free from AgentWitch…
- Option B: Buy an AgentWitch AI pack — Packs of $10, $20 or $50…

### Prompt Optimizer modal
- Title: Prompt Optimizer
- Intro: Pick how the Prompt Optimizer runs.
- Options: My CLI · An assistant · Tokens I buy
- Help: You can also add your own API key. Each API key counts as 1 assistant.

---

## FAQ Q&A

| Q | A |
|---|---|
| Is there a free trial? | Yes. Your first month is free, with all Pro features and no card needed. Choose Pro or Team before it ends. |
| What happens after the trial? | You pick Pro or Team and pay per seat. If you do nothing, your access ends and you are not charged. |
| Can I cancel anytime? | Yes, anytime. Cancel in billing and your plan runs to the end of the period you paid for. No fees, nothing to call about. |
| What counts as a seat? | One person who runs assistants in your account. Members count. Viewers do not. A seat is access to AgentWitch only. It never includes AI or storage. **(Sample claim — do not ship “Viewers do not / viewers are free” until Product locks it.)** |
| Can I use my own AI accounts? | Yes, and it is free. Connect the AI accounts you already have. Your provider bills you, not AgentWitch. AgentWitch AI credit is optional… |
| Can I use my own S3? | Yes. Keep messages in your own S3 bucket or on this computer. You never have to buy AgentWitch storage. |
| When is cloud message storage available? | Only after paid billing starts, not during the free month. It is optional, costs $0.90 per GB per month, and your own S3 works any time. |
| How is on-demand AI billed? | AI you run through AgentWitch is billed as you use it, at list rates, on your next invoice. You choose a monthly limit; assistants pause when you reach it, and we email you at 80%. |
| How does a skill from repeated work get its AI? | When you create a skill from work you repeat, you choose: use your own tokens or AI account, or buy an AgentWitch AI pack. Seats never include AI. |
| How does the Prompt Optimizer run? | Pick your CLI, an assistant, or tokens you buy. You can also add your own API key. Each API key counts as 1 assistant toward your limit (3 on Pro, 10 on Team). |
| How many computers can I use? | Up to 2 computers on every plan. |
| Can I switch plans? | Yes. Switching starts right away and is prorated. |
| Do prices include tax? | Prices are in US dollars and exclude sales tax. Tax is added at checkout where it applies. |

Section h2: Questions  
Legal foot: Terms · Privacy

---

## CTAs (summary)

| Context | Label |
|---------|-------|
| Public top | Sign in · Start trial |
| Trial card | Start trial |
| Pro card | Subscribe |
| Team card | Start team · Contact sales |
| Trial banner | Subscribe to Pro |
| Cancel banner | Keep my trial / Keep my plan |
| Paid account | Manage billing · Change seats |
| No plan / admin Free | Start trial · Subscribe to Pro · Start team |
| Add-ons | Sign in to add · Buy credit · Add storage · Subscribe to add · Start trial to add |
| Error | Try again |
| Checkout | Subscribe · Start team · Switch to {plan} · Save · {price} / month |
| Sales | Send |
| Portal | Save payment method · Cancel plan · View (invoice) |
| AI / S3 | Connect · Add an API key · Connect S3 / Change bucket |
| Skill / Optimizer | Save |

---

## States

| State | Copy / behavior |
|-------|-----------------|
| Signed-out | Public nav; hero; three cards; no account panel |
| Loading | sr: Loading plans… + skeleton cards |
| Error | Could not load plans / Check your connection and try again. / Try again |
| Trial | Banner: Your free month ends {date}. Choose Pro or Team… Cancel anytime. Account: Free trial |
| Pro / Team | Account: {Plan} plan · Active; Manage billing |
| Admin Free | Free plan · Set by your admin (edge, not a package CTA) |
| No plan yet | Your first month is free… |
| Cancel scheduled | Banner warning + Keep my plan/trial |
| Offline | No internet. You can read the plans… |
| Billing portal | Billing modal: plan summary, payment method, invoices, Cancel plan |
| Card declined | Card declined. Try another card… |

---

## Sample / demo-only (do not ship as claims)

- “Viewers are free.” / “Viewers do not.”
- `awSpend: 6.2` and “On demand: $6.20 so far this month”
- Fake cards ending 4242 / 1881, sample invoices, sample Anthropic ••••3f9a
- Estimator default seats/GB/credit packs as illustrative UI only
