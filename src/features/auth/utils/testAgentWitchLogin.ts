interface TestAgentWitchLoginParams {
  readonly email: string;
}

interface TestAgentWitchLoginResult {
  readonly ok: boolean;
  readonly error?: string;
}

const readTestLoginError = async (
  response: Response,
): Promise<string | undefined> => {
  try {
    const body = (await response.json()) as { error?: unknown };

    if (typeof body.error === "string" && body.error.trim().length > 0) {
      return body.error;
    }
  } catch {
    return undefined;
  }

  return undefined;
};

const testAgentWitchLogin = async ({
  email,
}: TestAgentWitchLoginParams): Promise<TestAgentWitchLoginResult> => {
  const response = await fetch("/api/auth/test-login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (response.ok) {
    return { ok: true };
  }

  const error = await readTestLoginError(response);

  return { ok: false, error };
};

export default testAgentWitchLogin;
