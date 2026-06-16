/**
 * Dev-only helper: full-page screenshot via the Chrome DevTools Protocol.
 * Emulates prefers-reduced-motion so scroll-reveal content is captured fully.
 *
 * Usage: node scripts/cdp-shot.cjs <port> <url> <outfile>
 * Requires a headless Chrome already running with --remote-debugging-port=<port>.
 */
const fs = require('fs');
const [PORT, URL, OUT] = process.argv.slice(2);

function send(ws, id, method, params = {}) {
  return new Promise((resolve, reject) => {
    const onMsg = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id === id) {
        ws.removeEventListener('message', onMsg);
        msg.error ? reject(new Error(method + ': ' + msg.error.message)) : resolve(msg.result);
      }
    };
    ws.addEventListener('message', onMsg);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

function waitFor(ws, method) {
  return new Promise((resolve) => {
    const onMsg = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.method === method) {
        ws.removeEventListener('message', onMsg);
        resolve(msg.params);
      }
    };
    ws.addEventListener('message', onMsg);
  });
}

(async () => {
  const targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
  const target = targets.find((t) => t.type === 'page');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));

  let id = 0;
  await send(ws, ++id, 'Page.enable');
  await send(ws, ++id, 'Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  await send(ws, ++id, 'Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 1200,
    deviceScaleFactor: 1,
    mobile: false,
  });

  const loaded = waitFor(ws, 'Page.loadEventFired');
  await send(ws, ++id, 'Page.navigate', { url: URL });
  await loaded;
  await new Promise((r) => setTimeout(r, 2000)); // let fonts + logo images settle

  const { cssContentSize } = await send(ws, ++id, 'Page.getLayoutMetrics');
  const width = Math.ceil(cssContentSize.width);
  const height = Math.ceil(cssContentSize.height);

  const shot = await send(ws, ++id, 'Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width, height, scale: 1 },
  });
  fs.writeFileSync(OUT, Buffer.from(shot.data, 'base64'));
  console.log('wrote', OUT, width + 'x' + height);
  ws.close();
  process.exit(0);
})().catch((e) => {
  console.error('ERR', e.message);
  process.exit(1);
});
