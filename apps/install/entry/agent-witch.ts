#!/usr/bin/env node
/**
 * AWI runtime entry (FSA target). Forwards to `scripts/agent-witch.ts` until the
 * WebSocket client orchestration moves out of scripts in a later slice.
 */
export { startAgentWitchClient } from "../../../scripts/agent-witch";
