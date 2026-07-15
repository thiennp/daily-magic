# Marketing — known issues

| ID            | Symptom | Fix |
| ------------- | ------- | --- |
| MARKETING-001 | Agent Witch logo text/mark nearly invisible on login and marketing pages when global dark mode is enabled (light text on white header/background). | Use `AgentWitchLogo surface="light"` on marketing surfaces; regression test in `resolveAgentWitchLogoSurfaceClasses.test.ts`. |
