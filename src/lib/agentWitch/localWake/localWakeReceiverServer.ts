/** Part 2/3 of the local wake receiver (see localWakeReceiverSource.ts); split to stay under the file line cap. */
export const LOCAL_WAKE_RECEIVER_PART_2 = String.raw`const parseJson = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const wakeAgent = (payload) => {
  mkdirSync(PROMPT_DIR, { recursive: true });
  const messageId = String(payload.messageId ?? '');
  const promptPath = join(PROMPT_DIR, (messageId || String(Date.now())) + '.txt');
  writeFileSync(
    promptPath,
    [
      'AgentWitch project inbox wake.',
      'projectId: ' + projectId,
      'messageId: ' + messageId,
      'kind: ' + String(payload.kind ?? 'message'),
      'summary: ' + String(payload.summary ?? ''),
      '',
      'Use this projectId only. list_project_inbox, check list_project_tasks, do the work,',
      'project_messenger_reply / project_dispatch as needed, then ack_project_message { messageId }.',
    ].join('\n'),
  );
  const child = spawn('/bin/bash', ['-lc', wakeCommand], {
    detached: true,
    stdio: 'ignore',
    env: {
      ...process.env,
      AGENTWITCH_WAKE_PROMPT_FILE: promptPath,
      AGENTWITCH_PROJECT_ID: projectId,
      AGENTWITCH_MESSAGE_ID: messageId,
    },
  });
  child.on('error', (err) => log('wake command failed to start: ' + err.message));
  child.unref();
};

const server = createServer((req, res) => {
  const reply = (status, body) => {
    res.writeHead(status, { 'content-type': 'application/json' });
    res.end(JSON.stringify(body));
  };
  if (req.method === 'GET' && req.url === '/health') return reply(200, { ok: true });
  if (req.method !== 'POST' || req.url !== WEBHOOK_PATH) return reply(404, { ok: false });

  const chunks = [];
  const size = { bytes: 0 };
  req.on('data', (c) => {
    size.bytes += c.length;
    if (size.bytes > MAX_BODY_BYTES) {
      reply(413, { ok: false, error: 'too_large' });
      req.destroy();
      return;
    }
    chunks.push(c);
  });
  req.on('end', () => {
    const rawBody = Buffer.concat(chunks).toString('utf8');
    const header = (name) => {
      const v = req.headers[name];
      return Array.isArray(v) ? v[0] : v;
    };
    const messageId = header('x-awc-message-id');
    if (!verifySignature(readSecret(), header('x-awc-timestamp'), messageId, rawBody, header('x-awc-signature'))) {
      log('reject signature messageId=' + (messageId ?? ''));
      return reply(401, { ok: false, error: 'invalid_signature' });
    }
    const payload = parseJson(rawBody);
    if (payload === null) return reply(400, { ok: false, error: 'invalid_json' });
    if (String(payload.projectId ?? '') !== projectId) {
      log('reject project scope got=' + String(payload.projectId ?? ''));
      return reply(403, { ok: false, error: 'wrong_project' });
    }
    if (markSeen(messageId)) {
      log('duplicate messageId=' + messageId);
      return reply(200, { ok: true, duplicate: true });
    }
    log('wake kind=' + String(payload.kind ?? '') + ' messageId=' + messageId);
    wakeAgent(payload);
    return reply(200, { ok: true });
  });
});

`;
