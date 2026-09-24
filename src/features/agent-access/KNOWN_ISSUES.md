# Known issues

No open issues. Agent Mail registration returns 503 until `AGENTMAIL_API_KEY` is set. That is expected.

Registration, tool calls, and mutations are rate limited. A token is not issued for an email that already has an account. Open Runs are capped so an agent cannot queue work forever.
