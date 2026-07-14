# Dispatch & approvals — agent instructions

1. Query feature knowledge: `npm run feature-knowledge:query -- "symptom" --feature=dispatch`
2. Read `KNOWN_ISSUES.md` before changing behavior.
3. Add a regression test for every bug fix; document it in `KNOWN_ISSUES.md`.
4. Re-index: `npm run feature-knowledge:index`.
