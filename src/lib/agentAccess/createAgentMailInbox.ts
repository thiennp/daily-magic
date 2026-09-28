import {
  isNonEmptyString,
  isNonNullObject,
  isType,
  isUndefinedOr,
} from "guardz";

export interface AgentMailInbox {
  readonly email: string;
}

const isInboxResponse = isType<{
  readonly email?: string;
  readonly inbox_id?: string;
}>({
  email: isUndefinedOr(isNonEmptyString),
  inbox_id: isUndefinedOr(isNonEmptyString),
});

export const parseAgentMailInboxResponse = (
  value: unknown,
): AgentMailInbox | null => {
  if (!isNonNullObject(value) || !isInboxResponse(value)) {
    return null;
  }

  if (value.email?.includes("@")) {
    return { email: value.email };
  }

  if (value.inbox_id?.includes("@")) {
    return { email: value.inbox_id };
  }

  return null;
};

export interface AgentMailInboxClient {
  readonly createInbox: (input: {
    readonly username: string;
    readonly displayName: string;
  }) => Promise<AgentMailInbox>;
}

export class AgentMailUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AgentMailUnavailableError";
  }
}

export const createAgentMailInboxWithFetch = async (input: {
  readonly username: string;
  readonly displayName: string;
  readonly apiKey: string;
  readonly fetchImpl?: typeof fetch;
}): Promise<AgentMailInbox> => {
  const fetchImpl = input.fetchImpl ?? fetch;
  const response = await fetchImpl("https://api.agentmail.to/v0/inboxes", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${input.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: input.username,
      display_name: input.displayName,
    }),
  });

  if (!response.ok) {
    throw new AgentMailUnavailableError(
      "Agent Mail could not create an inbox. Register with method none, or try again later.",
    );
  }

  const parsed = parseAgentMailInboxResponse(await response.json());

  if (parsed === null) {
    throw new AgentMailUnavailableError(
      "Agent Mail returned an inbox without an email address.",
    );
  }

  return parsed;
};
