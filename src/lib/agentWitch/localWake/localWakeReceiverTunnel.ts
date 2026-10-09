/** Part 3/3 of the local wake receiver (see localWakeReceiverSource.ts); split to stay under the file line cap. */
export const LOCAL_WAKE_RECEIVER_PART_3 = String.raw`const invoke = async (name, args) => {
  const response = await fetch(appOrigin + '/api/agent-access/invoke', {
    method: 'POST',
    headers: { authorization: 'Bearer ' + readToken(), 'content-type': 'application/json' },
    body: JSON.stringify({ name, arguments: args }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.ok !== true) {
    throw new Error(name + ' failed: ' + JSON.stringify({ status: response.status, error: body.error, code: body.code }));
  }
  return body;
};

const register = async (publicUrl) => {
  const webhookUrl = publicUrl.replace(/\/$/, '') + WEBHOOK_PATH;
  const body = await invoke('register_project_webhook', { projectId, webhookUrl });
  writeFileSync(SECRET_PATH, String(body.secret) + '\n');
  chmodSync(SECRET_PATH, 0o600);
  await invoke('set_my_project_delivery_mode', { projectId, deliveryMode: 'webhook' });
  log('registered ' + webhookUrl);
};

const registerWithRetry = async (publicUrl) => {
  for (;;) {
    try {
      await register(publicUrl);
      return;
    } catch (err) {
      log(String(err.message));
      await new Promise((r) => setTimeout(r, 30000));
    }
  }
};

const scheduleHealthChecks = (publicUrl) => {
  setInterval(async () => {
    try {
      const res = await fetch(publicUrl.replace(/\/$/, '') + '/health');
      if (!res.ok) throw new Error('status ' + res.status);
    } catch (err) {
      log('tunnel health check failed (' + err.message + '); exiting so the supervisor restarts and re-registers');
      process.exit(1);
    }
  }, HEALTH_INTERVAL_MS);
};

const startTunnel = () => {
  const hasCloudflared = spawnSync('cloudflared', ['--version'], { stdio: 'ignore' }).status === 0;
  const tunnel = hasCloudflared
    ? spawn('cloudflared', ['tunnel', '--no-autoupdate', '--url', 'http://127.0.0.1:' + port])
    : spawn('docker', [
        'run', '--rm', '--name', DOCKER_NAME, '--add-host=host.docker.internal:host-gateway',
        'cloudflare/cloudflared:latest', 'tunnel', '--no-autoupdate',
        '--url', 'http://host.docker.internal:' + port,
      ]);
  const found = { url: '' };
  const onData = (chunk) => {
    if (found.url) return;
    const match = String(chunk).match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/);
    if (match) {
      found.url = match[0];
      registerWithRetry(found.url).then(() => scheduleHealthChecks(found.url));
    }
  };
  tunnel.stdout.on('data', onData);
  tunnel.stderr.on('data', onData);
  tunnel.on('error', (err) => {
    log('tunnel failed to start: ' + err.message);
    process.exit(1);
  });
  tunnel.on('exit', (code) => {
    log('tunnel exited code=' + code + '; exiting so the supervisor restarts');
    process.exit(1);
  });
  process.on('exit', () => tunnel.kill());
};

server.listen(port, '127.0.0.1', () => {
  log('listening http://127.0.0.1:' + port + WEBHOOK_PATH + ' project=' + projectId);
  startTunnel();
});
`;
