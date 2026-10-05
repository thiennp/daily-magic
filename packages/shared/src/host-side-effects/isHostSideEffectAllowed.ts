/** Opt-in env var that lets a Vitest run touch the real host (launchctl, brew, Ollama). */
export const AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS_ENV =
  "AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS";

type HostSideEffectEnv = Readonly<Record<string, string | undefined>>;

/**
 * False while Vitest drives the process unless the run explicitly opts in.
 *
 * Unit tests that forget to mock a host-side-effect boundary must fail closed:
 * LaunchAgent labels are production (`com.agent-witch*`), not scoped by a temp
 * `AGENT_WITCH_HOME`, so a stray `launchctl kickstart -k` SIGTERMs the user's
 * live AWL.
 */
export const isHostSideEffectAllowed = (
  env: HostSideEffectEnv = process.env,
): boolean => {
  const vitest = env.VITEST;
  if (vitest === undefined || vitest.length === 0) {
    return true;
  }

  return env[AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS_ENV] === "1";
};

export const buildHostSideEffectRefusalMessage = (subject: string): string =>
  `Refusing ${subject} host side effects under VITEST (set ${AGENT_WITCH_ALLOW_HOST_SIDE_EFFECTS_ENV}=1 to override).`;
