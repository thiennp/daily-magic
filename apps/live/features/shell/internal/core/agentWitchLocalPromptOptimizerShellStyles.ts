/**
 * DF-034: PO-only chrome for the Mac app webview — sand palette, Pine primary
 * #1f6656 (AWL Mac UX redo). Appended after AGENT_WITCH_LOCAL_APP_STYLES.
 */
export const AGENT_WITCH_LOCAL_PROMPT_OPTIMIZER_SHELL_STYLES = `
body.awl-po { padding-left: 0; background: #e8e6e1; }
.awl-po-header {
  position: sticky; top: 0; z-index: 20;
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.75rem 2rem;
  background: rgb(247 246 244 / 0.94);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid #ddd9d2;
}
.awl-po-glyph {
  display: grid; place-items: center; width: 1.5rem; height: 1.5rem;
  border-radius: 0.4rem; background: #1f6656; color: #fff;
  font-size: 0.625rem; font-weight: 700; letter-spacing: -0.02em;
}
.awl-po-title { font-size: 0.9375rem; font-weight: 600; color: #101828; }
.awl-po-nav { display: flex; gap: 0.25rem; margin-left: 0.75rem; }
.awl-po-link {
  padding: 0.3rem 0.7rem; border-radius: 0.45rem;
  font-size: 0.8125rem; font-weight: 500; color: #4b5567;
}
.awl-po-link:hover { background: #ebe9e4; color: #101828; }
.awl-po-version {
  margin-left: auto; font-size: 0.6875rem; color: #566073;
  font-family: "SF Mono", ui-monospace, Menlo, monospace;
}
.awl-po-main { max-width: 64rem; }
`;
