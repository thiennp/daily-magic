import {
  buildLoginFeedback,
  type LoginFeedback,
} from "@/features/auth/utils/buildLoginFeedback";
import secretLogin from "@/features/auth/utils/secretLogin";
import testAgentWitchLogin from "@/features/auth/utils/testAgentWitchLogin";
import isTestAgentWitchEmail from "@/lib/auth/isTestAgentWitchEmail";

type DevLoginOutcome =
  | { readonly handled: false }
  | { readonly handled: true; readonly feedback: LoginFeedback | null };

const TEST_FAILED =
  "Test account login failed. Use npm run dev locally, or set ALLOW_TEST_AUTH=1 for production builds on localhost.";
const SECRET_FAILED =
  "Dev secret login failed. Check localStorage secret and SECRET env.";

/** Test-account / dev-secret shortcuts. `feedback: null` means signed in. */
export default async function runDevLogin(
  email: string,
  devSecret: string | null,
): Promise<DevLoginOutcome> {
  if (isTestAgentWitchEmail(email)) {
    const result = await testAgentWitchLogin({ email });
    return {
      handled: true,
      feedback: result.ok
        ? null
        : buildLoginFeedback(result.error ?? TEST_FAILED),
    };
  }
  if (devSecret) {
    const result = await secretLogin({ email, secret: devSecret });
    return {
      handled: true,
      feedback: result.ok
        ? null
        : buildLoginFeedback(result.error ?? SECRET_FAILED),
    };
  }
  return { handled: false };
}
