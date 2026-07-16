# Marketing — known issues

| ID            | Symptom | Fix |
| ------------- | ------- | --- |
| MARKETING-001 | Agent Witch logo text/mark nearly invisible on login and marketing pages when global dark mode is enabled (light text on white header/background). | Use `AgentWitchLogo surface="light"` on marketing surfaces; regression test in `resolveAgentWitchLogoSurfaceClasses.test.ts`. |
| MARKETING-002 | Home/login marketing header still shows dark-mode link and CTA colors on white backgrounds (faint logo, faint Sign in, inverted Get started) when `html` has `.dark`. | Wrap `MarketingShell` in `marketing-light-surface` and exclude that subtree from the Tailwind `dark` variant in `globals.css`; header links use `MARKETING_HEADER_LINK_CLASSES`. |
