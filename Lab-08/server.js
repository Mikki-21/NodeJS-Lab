const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { execFile } = require('child_process');
const { promisify } = require('util');
const slugify = require('slugify');

const labs = require('./labs');
const { logger, LOG_FILE } = require('./modules/logger');

const execFileAsync = promisify(execFile);
const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, '..');
const SCREENSHOT_DIR = path.join(__dirname, 'public', 'screenshots');

function send(res, status, data) {
    const isBuffer = Buffer.isBuffer(data);
    if (isBuffer) {
        res.writeHead(status, { 'Content-Type': 'application/octet-stream' });
        return res.end(data);
    }

    const body = typeof data === 'string' ? data : JSON.stringify(data);
    const contentType = typeof data === 'string'
        ? 'text/html; charset=utf-8'
        : 'application/json; charset=utf-8';

    res.writeHead(status, { 'Content-Type': contentType });
    res.end(body);
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function environment() {
    return process.env.RENDER ? 'live (Render)' : 'local';
}

function findLab(id) {
    return labs.find(lab => lab.id === id);
}

function labAbsoluteFile(lab) {
    return path.resolve(lab8Path(), lab.file);
}

function lab8Path() {
    return __dirname;
}

function htmlPage(title, body) {
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>
body{font-family:'Inter',Arial,sans-serif;max-width:1100px;margin:0 auto;padding:24px;line-height:1.5;background:#f8fafc;color:#0f172a}
nav{margin-bottom:20px;padding:12px 18px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px} a{color:#16a34a;text-decoration:none;font-weight:600} a:hover{text-decoration:underline}
.card{background:white;border:1px solid #e2e8f0;border-radius:14px;padding:20px;margin:16px 0;transition:all 0.2s} .card:hover{border-color:#bbf7d0;box-shadow:0 8px 24px rgba(22,163,74,0.08)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}
pre{background:#0b1320;color:#86efac;padding:16px;border-radius:10px;overflow:auto}
img{max-width:100%;border:1px solid #ddd;border-radius:8px;margin:8px 0}
.badge{display:inline-block;padding:4px 10px;border-radius:999px;background:#dcfce7;color:#15803d;font-size:12px;font-weight:700}
table{border-collapse:collapse;width:100%;background:white;border-radius:10px;overflow:hidden} th,td{padding:10px;border:1px solid #dfe5ef;text-align:left}
</style>
</head>
<body>
<nav><a href="/">Portal</a> · <a href="/labs">Labs JSON</a> · <a href="/health">Health</a> · <a href="/about">About</a> · <a href="/api/dashboard">Dashboard</a></nav>
${body}
</body>
</html>`;
}

async function screenshotsForLab(id) {
    let names = [];
    try {
        names = await fs.promises.readdir(SCREENSHOT_DIR);
    } catch {
        return [];
    }
    const prefix = `lab${id}-`;
    return names.filter(name => {
        const lower = name.toLowerCase();
        return lower.startsWith(prefix) &&
            (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg'));
    });
}

async function handleLabPage(res, lab) {
    const file = labAbsoluteFile(lab);
    const source = await fs.promises.readFile(file, 'utf8');
    const screenshots = await screenshotsForLab(lab.id);

    const images = screenshots.length
        ? screenshots.map(name =>
            `<figure><img src="/screenshots/${encodeURIComponent(name)}" alt="${escapeHtml(name)}"><figcaption>${escapeHtml(name)}</figcaption></figure>`
          ).join('')
        : '<p>No Lab-08 local/live screenshots have been added yet.</p>';

    const action = lab.type === 'server'
        ? `<a href="/labs/${lab.id}/app${lab.try || '/'}">Open integrated lab</a>`
        : `<a href="/labs/${lab.id}/run">Run script</a>`;

    send(res, 200, htmlPage(`Lab ${lab.id} - ${lab.title}`, `
        <h1>Lab ${escapeHtml(lab.id)}: ${escapeHtml(lab.title)}</h1>
        <p><strong>Topic:</strong> ${escapeHtml(lab.topic)}</p>
        <p><span class="badge">${escapeHtml(lab.type)}</span></p>
        <p>${action}</p>
        <div class="card"><h2>Source Code</h2><pre><code>${escapeHtml(source)}</code></pre></div>
        <div class="card"><h2>Screenshots</h2><div class="grid">${images}</div></div>
    `));
}

async function handle(req, res) {
    const parsed = url.parse(req.url, true);
    const pathname = parsed.pathname;

    logger.emit('request', req.method, req.url);

    try {
        if (req.method !== 'GET') {
            return send(res, 405, { error: 'Method not allowed' });
        }

        if (pathname === '/') {
            const labLinks = labs.map(lab =>
                `<li><a href="/labs/${lab.id}">Lab ${lab.id}: ${escapeHtml(lab.title)}</a> — ${escapeHtml(lab.type)}</li>`
            ).join('');

            return send(res, 200, htmlPage('Lab 08 Integrated Portal', `
                <h1>NodeJS Lab 08 — Integrated Lab Portal</h1>
                <div class="card">
                    <p><strong>Environment:</strong> ${environment()}</p>
                    <p>This portal integrates Labs 01–07 without rewriting their original learning exercises.</p>
                </div>
                <h2>Labs</h2>
                <ul>${labLinks}</ul>
            `));
        }

        if (pathname === '/about') {
            return send(res, 200, {
                project: 'NodeJS Lab 08 Integrated Server',
                student: process.env.STUDENT_NAME || 'Mikki Jaiswal',
                labs: labs.length
            });
        }

        if (pathname === '/health') {
            return send(res, 200, {
                status: 'ok',
                environment: process.env.RENDER ? 'live (Render)' : 'local',
                uptimeSeconds: Math.floor(process.uptime())
            });
        }

        if (pathname === '/labs') {
            return send(res, 200, labs.map(lab => ({
                ...lab,
                slug: slugify(lab.title, { lower: true, strict: true })
            })));
        }

        const labMatch = pathname.match(/^\/labs\/([^/]+)$/);
        if (labMatch) {
            const lab = findLab(labMatch[1]);
            if (!lab) return send(res, 404, { error: 'Unknown lab id', id: labMatch[1] });
            return handleLabPage(res, lab);
        }

        const runMatch = pathname.match(/^\/labs\/([^/]+)\/run$/);
        if (runMatch) {
            const lab = findLab(runMatch[1]);
            if (!lab) return send(res, 404, { error: 'Unknown lab id', id: runMatch[1] });
            if (lab.type !== 'script') {
                return send(res, 400, { error: 'This lab is a server lab; use /app/... instead.' });
            }

            const file = labAbsoluteFile(lab);
            try {
                const result = await execFileAsync(process.execPath, [file], {
                    timeout: 5000,
                    cwd: path.dirname(file),
                    maxBuffer: 1024 * 1024
                });
                return send(res, 200, { ok: true, output: result.stdout, error: result.stderr || '' });
            } catch (err) {
                return send(res, 200, {
                    ok: false,
                    output: err.stdout || '',
                    error: err.stderr || err.message
                });
            }
        }

        const appMatch = pathname.match(/^\/labs\/([^/]+)\/app(?:\/(.*))?$/);
        if (appMatch) {
            const lab = findLab(appMatch[1]);
            if (!lab) return send(res, 404, { error: 'Unknown lab id', id: appMatch[1] });
            if (lab.type !== 'server') {
                return send(res, 400, { error: 'This lab is a script lab; use /run instead.' });
            }

            const rest = appMatch[2] ? `/${appMatch[2]}` : '/';
            req.url = rest + (parsed.search || '');
            const handler = require(labAbsoluteFile(lab));
            if (typeof handler !== 'function') {
                return send(res, 500, { error: 'Configured server lab does not export a handler function.' });
            }
            return handler(req, res);
        }

        const screenshotMatch = pathname.match(/^\/screenshots\/(.+)$/);
        if (screenshotMatch) {
            const name = path.basename(decodeURIComponent(screenshotMatch[1]));
            const ext = path.extname(name).toLowerCase();
            if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
                return send(res, 400, { error: 'Only .png, .jpg and .jpeg screenshots are allowed' });
            }

            const file = path.join(SCREENSHOT_DIR, name);
            const stream = fs.createReadStream(file);
            stream.on('error', () => send(res, 404, { error: 'Screenshot not found' }));
            const type = ext === '.png' ? 'image/png' : 'image/jpeg';
            res.writeHead(200, { 'Content-Type': type });
            stream.pipe(res);
            return;
        }

        if (pathname === '/api/dashboard') {
            const [logText, screenshotNames] = await Promise.all([
                fs.promises.readFile(LOG_FILE, 'utf8').catch(() => ''),
                fs.promises.readdir(SCREENSHOT_DIR).catch(() => [])
            ]);

            return send(res, 200, {
                labs: labs.length,
                screenshots: screenshotNames.filter(name =>
                    ['.png', '.jpg', '.jpeg'].includes(path.extname(name).toLowerCase())
                ),
                requestsLogged: logText ? logText.split(/\r?\n/).filter(Boolean).length : 0
            });
        }

        return send(res, 404, { error: 'Route not found', path: pathname });
    } catch (err) {
        console.error(err);
        if (!res.headersSent) return send(res, 500, { error: 'Internal Server Error' });
        res.end();
    }
}

const server = http.createServer(handle);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
