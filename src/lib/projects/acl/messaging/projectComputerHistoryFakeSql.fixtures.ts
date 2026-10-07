/** In-memory stand-in for the project computer history queries. */
export type FakeHistoryMessage = {
  id: string;
  project_id: string;
  created_at: Date;
  acked_at: Date | null;
};

export const createProjectComputerHistoryFakeSql = () => {
  const states = new Map<string, string>();
  const messages = new Map<string, FakeHistoryMessage>();
  const acks = new Map<string, string>();
  const ackKey = (projectId: string, messageId: string): string =>
    `${projectId}:${messageId}`;
  const sql = async (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): Promise<unknown[]> => {
    const query = strings.join("?");
    if (query.includes("SELECT state FROM project_computer_history_settings")) {
      const state = states.get(String(values[0]));
      return state === undefined ? [] : [{ state }];
    }
    if (query.includes("INSERT INTO project_computer_history_settings")) {
      const [projectId, next, from] = values.map(String);
      if ((states.get(projectId) ?? "on_configuring") !== from) return [];
      states.set(projectId, next);
      return [{ state: next }];
    }
    if (query.includes("INSERT INTO project_message_computer_acks")) {
      const [deviceId, messageId, projectId] = values.map(String);
      const message = messages.get(messageId);
      const key = ackKey(projectId, messageId);
      if (message?.project_id !== projectId || acks.has(key)) return [];
      acks.set(key, deviceId);
      return [{ message_id: messageId }];
    }
    if (query.includes("NOT EXISTS")) {
      const projectId = String(values[0]);
      return [...messages.values()]
        .filter((m) => m.project_id === projectId)
        .filter((m) => !acks.has(ackKey(projectId, m.id)))
        .map((m) => ({ ...m, kind: "task", summary: "s", refs: {} }));
    }
    if (query.includes("FROM project_message_computer_acks")) {
      const [projectId, messageId] = values.map(String);
      return acks.has(ackKey(projectId, messageId)) ? [{ found: 1 }] : [];
    }
    if (
      query.includes("SELECT acked_at") &&
      query.includes("FROM project_messages")
    ) {
      const messageId = String(values[0]);
      const projectId =
        values.length > 1 ? String(values[1]) : undefined;
      const message = messages.get(messageId);
      if (message === undefined) return [];
      if (projectId !== undefined && message.project_id !== projectId) {
        return [];
      }
      return [{ acked_at: message.acked_at }];
    }
    if (query.includes("DELETE FROM project_messages")) {
      const messageId = String(values[0]);
      const projectId =
        values.length > 1 ? String(values[1]) : undefined;
      const message = messages.get(messageId);
      if (message === undefined || message.acked_at === null) return [];
      if (projectId !== undefined && message.project_id !== projectId) {
        return [];
      }
      messages.delete(message.id);
      return [{ id: message.id }];
    }
    throw new Error(`unexpected query: ${query}`);
  };
  return { sql, states, messages, acks };
};
