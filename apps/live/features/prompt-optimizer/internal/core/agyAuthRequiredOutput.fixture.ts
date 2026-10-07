/**
 * Exact `agy --sandbox -p …` stderr on MKX (agy 1.3.1, not signed in), from
 * /workspace/aw-dogfood/evidence/awl-df035-antigravity-01-agy-auth-required.txt.
 * OAuth query values were redacted at capture time.
 */
export const AGY_AUTH_REQUIRED_PROMPT_STDERR = `Authentication required. Please visit the URL to log in:
  https://accounts.google.com/o/oauth2/auth?access_type=offline&client_id=<redacted>&code_challenge=<redacted>&code_challenge_method=S256&prompt=consent&redirect_uri=<redacted>&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcclog+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fexperimentsandconfigs+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Faicode+openid&state=<redacted>

Waiting for authentication (timeout 60s)...
Or, paste the authorization code here and press Enter:
`;

export const AGY_AUTH_TIMED_OUT_STDERR = `${AGY_AUTH_REQUIRED_PROMPT_STDERR}Error: authentication timed out.
error: authentication failed or timed out
`;
