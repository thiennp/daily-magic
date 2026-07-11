---
name: command-dev-environment-notes
description: Start daily-magic Next.js dev server locally
---

# Local development

## Start app

```bash
npm install
cp .env.example .env.local   # add DATABASE_URL when using Neon
npm run dev
```

Open http://localhost:3000

## Styleguide

http://localhost:3000/styleguide

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Optional: Chrome without CORS

See **`command-chrome-launch-without-cors.md`** if you need a relaxed browser for local API experiments.
