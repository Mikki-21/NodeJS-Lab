const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { execFile } = require('child_process');
const { promisify } = require('util');

const execFileAsync = promisify(execFile);
const PORT = process.env.PORT || 3001;
const ROOT = path.join(__dirname, '..');

const labs = [
    {
        id: '01',
        folder: 'Lab-01',
        title: 'Node.js Fundamentals',
        description: 'Console output, variables, data types, and fundamental Node.js script execution.',
        type: 'script',
        file: 'app.js',
        modules: ['console', 'variables', 'datatypes', 'child_process']
    },
    {
        id: '02',
        folder: 'Lab-02',
        title: 'HTTP Server & Route Handler',
        description: 'Creating HTTP server using Node.js http module, plain text, and JSON route responses.',
        type: 'server',
        file: 'server.js',
        tryPath: '/profile',
        modules: ['http', 'routing', 'res.writeHead', 'JSON']
    },
    {
        id: '03',
        folder: 'Lab-03',
        title: 'Student Directory REST API',
        description: 'Dynamic HTTP routes, array filtering, search methods, and JSON REST API responses.',
        type: 'server',
        file: 'students-server.js',
        tryPath: '/students',
        modules: ['http', 'rest-api', 'find()', 'filter()']
    },
    {
        id: '04',
        folder: 'Lab-04',
        title: 'Advanced Search & Sort API',
        description: 'Parsing URL query parameters, multi-field filtering, sorting, and validation logic.',
        type: 'server',
        file: 'advanced-server.js',
        tryPath: '/students?course=BCA&minMarks=60&sort=marks&order=desc',
        modules: ['url.parse', 'URLSearchParams', 'sorting', 'validation']
    },
    {
        id: '05',
        folder: 'Lab-05',
        title: 'Async JS & Food Delivery Simulation',
        description: 'Asynchronous JavaScript with Callbacks, Promises, async/await, and concurrent order handling.',
        type: 'script',
        file: 'async-await-version.js',
        modules: ['callbacks', 'promises', 'async-await', 'Promise.all']
    },
    {
        id: '06',
        folder: 'Lab-06',
        title: 'File System (fs) Module Operations',
        description: 'Asynchronous file reading, writing, appending, and non-blocking I/O using fs/promises.',
        type: 'script',
        file: 'read-async.js',
        modules: ['fs', 'fs.promises', 'readFile', 'non-blocking-io']
    },
    {
        id: '07',
        folder: 'Lab-07',
        title: 'EventEmitter Order Tracker',
        description: 'Event-driven architecture, custom event emitters, once() listeners, and error events.',
        type: 'script',
        file: 'order-tracker.js',
        modules: ['events', 'EventEmitter', 'emit()', 'once()']
    }
];

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function labById(id) {
    return labs.find(lab => lab.id === id);
}

function labFile(lab) {
    return path.join(ROOT, lab.folder, lab.file);
}

function getScreenshots(lab) {
    const folder = path.join(ROOT, lab.folder);
    if (!fs.existsSync(folder)) return [];
    return fs.readdirSync(folder).filter(name => /\.(png|jpg|jpeg)$/i.test(name));
}

function loadServerHandler(lab) {
    const filePath = labFile(lab);
    const origListen = http.Server.prototype.listen;
    const origCreateServer = http.createServer;
    let createdServer = null;

    http.Server.prototype.listen = function() { return this; };
    http.createServer = function(...args) {
        const s = origCreateServer.apply(this, args);
        createdServer = s;
        return s;
    };

    try {
        delete require.cache[require.resolve(filePath)];
        const exp = require(filePath);
        if (typeof exp === 'function') return exp;
        if (exp && exp.default && typeof exp.default === 'function') return exp.default;
        if (createdServer && typeof createdServer.listeners === 'function' && createdServer.listeners('request')[0]) {
            return createdServer.listeners('request')[0];
        }
        return exp;
    } finally {
        http.Server.prototype.listen = origListen;
        http.createServer = origCreateServer;
    }
}

function layout(title, content, activeTab = 'home') {
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)} | Node.js Practical Lab Portfolio</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
:root {
    --primary: #16a34a;
    --primary-hover: #15803d;
    --primary-dark: #14532d;
    --primary-light: #f0fdf4;
    --primary-border: #bbf7d0;
    --primary-glow: rgba(22, 163, 74, 0.2);
    --dark: #0f172a;
    --muted: #64748b;
    --bg: #f8fafc;
    --card: #ffffff;
    --line: #e2e8f0;
    --code-bg: #0b1320;
}
* { box-sizing: border-box; }
body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg);
    color: var(--dark);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }

.nav {
    height: 72px;
    background: #ffffff;
    border-bottom: 1px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 max(24px, 6%);
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
}
.brand {
    font-size: 20px;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--dark);
    letter-spacing: -0.5px;
}
.brand-icon {
    width: 34px;
    height: 34px;
    background: linear-gradient(135deg, #22c55e, #15803d);
    color: #ffffff;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    font-size: 17px;
    box-shadow: 0 4px 12px var(--primary-glow);
}
.brand span { color: var(--primary); }

.nav-right { display: flex; align-items: center; gap: 18px; }
.navlinks { display: flex; gap: 14px; color: var(--muted); font-size: 14px; font-weight: 600; }
.navlinks a { padding: 7px 14px; border-radius: 8px; transition: all 0.2s; }
.navlinks a:hover, .navlinks a.active { color: var(--primary); background: var(--primary-light); }

.student-pill {
    background: var(--primary-light);
    border: 1px solid var(--primary-border);
    color: var(--primary-dark);
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
}
.student-dot {
    width: 8px;
    height: 8px;
    background: var(--primary);
    border-radius: 50%;
    box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.25);
}

.wrap { max-width: 1140px; margin: auto; padding: 40px 24px 80px; }

.hero { padding: 15px 0 35px; }
.eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--primary);
    background: var(--primary-light);
    border: 1px solid var(--primary-border);
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 18px;
}
.hero h1 {
    font-size: clamp(36px, 5.5vw, 60px);
    line-height: 1.05;
    letter-spacing: -1.8px;
    margin: 0 0 18px;
    color: var(--dark);
    font-weight: 900;
}
.green-text {
    color: var(--primary);
    background: linear-gradient(135deg, #16a34a, #15803d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.hero p {
    max-width: 740px;
    color: var(--muted);
    font-size: 18px;
    line-height: 1.7;
    margin: 0 0 28px;
}
.hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid var(--line);
    background: #ffffff;
    color: var(--dark);
    border-radius: 10px;
    padding: 11px 18px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}
.btn:hover { border-color: var(--primary); color: var(--primary); transform: translateY(-1px); }
.btn.primary {
    background: var(--primary);
    border-color: var(--primary);
    color: #ffffff;
    box-shadow: 0 4px 14px var(--primary-glow);
}
.btn.primary:hover {
    background: var(--primary-hover);
    border-color: var(--primary-hover);
    color: #ffffff;
    box-shadow: 0 6px 20px var(--primary-glow);
}

.student-card {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #ffffff;
    border-radius: 18px;
    padding: 24px 28px;
    margin-bottom: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.15);
    border: 1px solid rgba(255,255,255,0.08);
    position: relative;
    overflow: hidden;
}
.student-card::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.22) 0%, rgba(0,0,0,0) 70%);
    pointer-events: none;
}
.student-info-left h3 { margin: 0 0 4px; font-size: 20px; color: #ffffff; font-weight: 800; }
.student-info-left p { margin: 0; color: #94a3b8; font-size: 14px; }
.student-meta-grid { display: flex; gap: 24px; }
.student-meta-item { text-align: right; }
.student-meta-item span { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #a7f3d0; font-weight: 700; }
.student-meta-item strong { font-size: 16px; color: #ffffff; }

.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin: 0 0 40px; }
.stat {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 22px;
    transition: all 0.2s ease;
}
.stat:hover { border-color: var(--primary-border); box-shadow: 0 8px 24px rgba(22, 163, 74, 0.08); transform: translateY(-2px); }
.stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--primary-light);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    margin-bottom: 12px;
}
.stat strong { font-size: 30px; display: block; font-weight: 800; color: var(--dark); line-height: 1; }
.stat span { color: var(--muted); font-size: 13px; font-weight: 600; margin-top: 6px; display: block; }

.controls-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}
.search-box { position: relative; flex: 1; min-width: 280px; }
.search-box input {
    width: 100%;
    padding: 12px 16px 12px 42px;
    border-radius: 12px;
    border: 1px solid var(--line);
    background: #ffffff;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;
    font-family: inherit;
}
.search-box input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-glow); }
.search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 16px; }

.filter-group { display: flex; gap: 6px; background: #ffffff; padding: 4px; border: 1px solid var(--line); border-radius: 12px; }
.filter-btn {
    border: none;
    background: transparent;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s;
}
.filter-btn.active, .filter-btn:hover { background: var(--primary-light); color: var(--primary-dark); }

.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }
.card {
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 24px;
    transition: all 0.25s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}
.card:hover { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(15, 23, 42, 0.08); border-color: var(--primary-border); }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.labno { color: var(--primary); font-size: 12px; font-weight: 800; letter-spacing: 1px; background: var(--primary-light); padding: 4px 10px; border-radius: 6px; }
.type-badge { font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.5px; }
.type-badge.server { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
.type-badge.script { background: #e0f2fe; color: #0369a1; border: 1px solid #bae6fd; }

.card h2 { font-size: 20px; font-weight: 800; margin: 0 0 10px; color: var(--dark); line-height: 1.3; }
.card p { color: var(--muted); line-height: 1.6; font-size: 14px; margin: 0 0 16px; flex-grow: 1; }

.card-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 18px; }
.tag { background: #f1f5f9; color: #475569; font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 5px; font-family: 'JetBrains Mono', monospace; }

.card-actions { display: flex; gap: 8px; margin-top: auto; }
.card-actions .btn { flex: 1; padding: 9px 10px; font-size: 12px; }

.features-section {
    margin-top: 55px;
    background: #ffffff;
    border: 1px solid var(--line);
    border-radius: 20px;
    padding: 32px 28px;
}
.features-header { margin-bottom: 24px; }
.features-header h3 { margin: 0 0 6px; font-size: 22px; font-weight: 800; }
.features-header p { margin: 0; color: var(--muted); font-size: 14px; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 20px; }
.feature-box { background: var(--bg); border: 1px solid var(--line); border-radius: 14px; padding: 20px; }
.feature-box h4 { margin: 0 0 8px; font-size: 15px; color: var(--dark); display: flex; align-items: center; gap: 8px; font-weight: 700; }
.feature-box p { margin: 0; font-size: 13px; color: var(--muted); line-height: 1.6; }

.tester-box { margin-top: 36px; background: var(--code-bg); border-radius: 18px; padding: 24px; color: #e2e8f0; }
.tester-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.tester-header h3 { margin: 0; font-size: 16px; color: #86efac; display: flex; align-items: center; gap: 8px; font-family: 'JetBrains Mono', monospace; }
.tester-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.chip {
    background: rgba(255,255,255,0.08);
    color: #cbd5e1;
    border: 1px solid rgba(255,255,255,0.12);
    padding: 7px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-family: 'JetBrains Mono', monospace;
    cursor: pointer;
    transition: all 0.2s;
}
.chip:hover { background: var(--primary); color: #ffffff; border-color: var(--primary); }
.tester-output {
    background: rgba(0,0,0,0.4);
    border-radius: 12px;
    padding: 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    color: #86efac;
    max-height: 220px;
    overflow: auto;
    white-space: pre-wrap;
}

.panel {
    background: #ffffff;
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 28px;
    margin-top: 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}
.panel h2 { margin-top: 0; margin-bottom: 16px; font-size: 22px; font-weight: 800; }

.output-window { border-radius: 14px; overflow: hidden; border: 1px solid #1e293b; margin-top: 12px; }
.output-header {
    background: #1e293b;
    color: #94a3b8;
    padding: 10px 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.dot-red { background: #ef4444; }
.dot-yellow { background: #f59e0b; }
.dot-green { background: #10b981; }

.output {
    background: var(--code-bg);
    color: #86efac;
    padding: 20px;
    white-space: pre-wrap;
    overflow: auto;
    min-height: 140px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13.5px;
    line-height: 1.6;
    margin: 0;
}
.code {
    background: var(--code-bg);
    color: #f1f5f9;
    border-radius: 14px;
    padding: 20px;
    overflow: auto;
    white-space: pre;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13.5px;
    line-height: 1.6;
}

.screens { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
.screens figure { margin: 0; }
.screens img { width: 100%; border: 1px solid var(--line); border-radius: 12px; display: block; }
.screens figcaption { font-size: 12px; color: var(--muted); padding-top: 8px; text-align: center; font-weight: 600; }

.crumb { color: var(--muted); font-size: 14px; margin-bottom: 20px; font-weight: 500; }
.crumb a { color: var(--primary); font-weight: 600; }
.labhead { display: flex; justify-content: space-between; gap: 24px; align-items: flex-start; }
.labhead h1 { font-size: 38px; margin: 8px 0; font-weight: 900; }

footer {
    text-align: center;
    padding: 40px 24px;
    color: var(--muted);
    font-size: 13.5px;
    border-top: 1px solid var(--line);
    background: #ffffff;
    margin-top: 60px;
}
footer span { color: var(--primary); font-weight: 700; }

@media (max-width: 768px) {
    .navlinks { display: none; }
    .student-card { flex-direction: column; text-align: center; }
    .student-meta-grid { justify-content: center; width: 100%; }
    .student-meta-item { text-align: center; }
    .stats { grid-template-columns: 1fr 1fr; }
    .controls-bar { flex-direction: column; align-items: stretch; }
    .labhead { display: block; }
    .labhead h1 { font-size: 30px; }
}
</style>
</head>
<body>
<nav class="nav">
    <a class="brand" href="/">
        <div class="brand-icon">⬢</div>
        My <span>Node.js Labs</span>
    </a>
    <div class="nav-right">
        <div class="navlinks">
            <a href="/" class="${activeTab === 'home' ? 'active' : ''}">Home</a>
            <a href="/about" class="${activeTab === 'about' ? 'active' : ''}">About Portal</a>
            <a href="/health" class="${activeTab === 'health' ? 'active' : ''}">System Health</a>
        </div>
        <div class="student-pill">
            <span class="student-dot"></span>
            Node.js v22 · BCA
        </div>
    </div>
</nav>
${content}
<footer>
    Node.js Practical Assignment Portal · <span>Mikki Jaiswal</span> (Scholar: 23145027) · BCA 6th Semester
</footer>
</body></html>`;
}

function homePage() {
    return layout('Lab Portfolio', `<main class="wrap">
<section class="hero">
    <div class="eyebrow">⚡ BCA · Node.js Practical Assignment Suite</div>
    <h1>Node.js Practical<br><span class="green-text">Lab Assignment Portfolio.</span></h1>
    <p>A comprehensive showcase of Node.js backend practical assignments covering core runtime modules, HTTP routing, dynamic JSON REST APIs, asynchronous non-blocking I/O, file system stream handlers, and event-driven architecture.</p>
    <div class="hero-btns">
        <a class="btn primary" href="#assignments">🚀 Explore Lab Assignments</a>
        <a class="btn" href="/health">⚡ Check Server Health</a>
        <a class="btn" href="/about">📜 About Portal Specs</a>
    </div>
</section>

<div class="student-card">
    <div class="student-info-left">
        <h3>Mikki Jaiswal</h3>
        <p>BCA (Bachelor of Computer Applications) · 6th Semester</p>
    </div>
    <div class="student-meta-grid">
        <div class="student-meta-item">
            <span>Scholar ID</span>
            <strong>23145027</strong>
        </div>
        <div class="student-meta-item">
            <span>Subject</span>
            <strong>Node.js Lab</strong>
        </div>
        <div class="student-meta-item">
            <span>Status</span>
            <strong>100% Completed ✓</strong>
        </div>
    </div>
</div>

<section class="stats">
    <div class="stat">
        <div class="stat-icon">📚</div>
        <strong>07</strong>
        <span>Practical Assignments</span>
    </div>
    <div class="stat">
        <div class="stat-icon">⚡</div>
        <strong>Node.js</strong>
        <span>Core Runtime Engine</span>
    </div>
    <div class="stat">
        <div class="stat-icon">🌐</div>
        <strong>03 APIs</strong>
        <span>HTTP Servers & Routing</span>
    </div>
    <div class="stat">
        <div class="stat-icon">⚙️</div>
        <strong>Interactive</strong><span>Run · Code · Evidence</span>
    </div>
</section>

<div class="controls-bar" id="assignments">
    <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" id="labSearch" placeholder="Search labs by title, topic, or Node.js module (e.g. fs, http, async, events)...">
    </div>
    <div class="filter-group">
        <button class="filter-btn active" data-filter="all">All Labs (7)</button>
        <button class="filter-btn" data-filter="server">Server APIs</button>
        <button class="filter-btn" data-filter="script">CLI Scripts</button>
    </div>
</div>

<h2 style="margin:0 0 20px; font-size: 24px; font-weight:800;">Lab Assignments</h2>

<div class="grid" id="labsGrid">
${labs.map(lab => `<article class="card" data-type="${lab.type}" data-search="${escapeHtml((lab.id + ' ' + lab.title + ' ' + lab.description + ' ' + (lab.modules || []).join(' ')).toLowerCase())}">
    <div>
        <div class="card-header">
            <span class="labno">LAB ${lab.id}</span>
            <span class="type-badge ${lab.type}">${lab.type === 'server' ? '🌐 Server API' : '⚡ CLI Script'}</span>
        </div>
        <h2>${escapeHtml(lab.title)}</h2>
        <p>${escapeHtml(lab.description)}</p>
        <div class="card-tags">
            ${(lab.modules || []).map(m => `<span class="tag">${escapeHtml(m)}</span>`).join('')}
        </div>
    </div>
    <div class="card-actions">
        <a class="btn primary" href="/lab/${lab.id}?view=run">▶ Run</a>
        <a class="btn" href="/lab/${lab.id}?view=code">&lt;/&gt; Code</a>
        <a class="btn" href="/lab/${lab.id}?view=screenshots">▣ Screenshots</a>
    </div>
</article>`).join('')}
</div>

<section class="tester-box">
    <div class="tester-header">
        <h3>⚡ Interactive Endpoint Quick Console</h3>
        <span style="font-size:12px; color:#94a3b8;">Click any endpoint to preview response</span>
    </div>
    <div class="tester-chips">
        <span class="chip" onclick="testRoute('/health')">GET /health</span>
        <span class="chip" onclick="testRoute('/about')">GET /about</span>
        <span class="chip" onclick="testRoute('/lab/02/app/profile')">GET Lab-02 /profile</span>
        <span class="chip" onclick="testRoute('/lab/03/app/students')">GET Lab-03 /students</span>
        <span class="chip" onclick="testRoute('/lab/04/app/students?course=BCA&minMarks=60&sort=marks&order=desc')">GET Lab-04 Filtered Students</span>
    </div>
    <pre class="tester-output" id="testerOutput">// Click an endpoint chip above to run live HTTP test query...</pre>
</section>

<section class="features-section">
    <div class="features-header">
        <h3>Node.js Core Architecture Concepts Demonstrated</h3>
        <p>Key computer science topics implemented across these 7 practical lab modules.</p>
    </div>
    <div class="features-grid">
        <div class="feature-box">
            <h4>🌐 HTTP & Routing</h4>
            <p>Creating HTTP servers, status codes, custom headers, and path-based routing without external frameworks.</p>
        </div>
        <div class="feature-box">
            <h4>🔍 Query Params & APIs</h4>
            <p>Parsing URL search parameters, performing array filtering, searching, sorting, and validation logic.</p>
        </div>
        <div class="feature-box">
            <h4>⏱️ Asynchronous Control</h4>
            <p>Non-blocking Event Loop execution using Callbacks, Promises, async/await, and concurrent Promise.all().</p>
        </div>
        <div class="feature-box">
            <h4>📂 File System (fs)</h4>
            <p>Reading, writing, and appending files asynchronously using Node.js <code>fs/promises</code> module.</p>
        </div>
        <div class="feature-box">
            <h4>📢 EventEmitter</h4>
            <p>Decoupled event-driven programming, subscriber listeners, <code>once()</code> emitters, and error handling.</p>
        </div>
        <div class="feature-box">
            <h4>⚙️ Process Execution</h4>
            <p>Running isolated Node.js script assignments safely using <code>child_process.execFile</code>.</p>
        </div>
    </div>
</section>

</main>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('labSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('#labsGrid .card');

    let currentFilter = 'all';

    function filterCards() {
        const query = searchInput.value.toLowerCase().trim();
        cards.forEach(card => {
            const matchesSearch = !query || card.getAttribute('data-search').includes(query);
            const matchesType = currentFilter === 'all' || card.getAttribute('data-type') === currentFilter;
            card.style.display = matchesSearch && matchesType ? 'flex' : 'none';
        });
    }

    if (searchInput) searchInput.addEventListener('input', filterCards);

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            filterCards();
        });
    });
});

async function testRoute(path) {
    const out = document.getElementById('testerOutput');
    out.textContent = 'Fetching ' + path + '...';
    try {
        const res = await fetch(path);
        const text = await res.text();
        out.textContent = 'HTTP ' + res.status + ' OK\n' + text;
    } catch (err) {
        out.textContent = 'Error requesting route: ' + err.message;
    }
}
</script>`, 'home');
}

async function labPage(lab, view = 'home') {
    const source = await fs.promises.readFile(labFile(lab), 'utf8');
    const screenshots = getScreenshots(lab);
    let panel = `<div class="panel">
        <h2>Assignment Overview</h2>
        <p style="color:var(--muted); font-size:16px; line-height:1.6;">${escapeHtml(lab.description)}</p>
        <p><strong>Target Source File:</strong> <code>${escapeHtml(lab.folder + '/' + lab.file)}</code></p>
        <div style="margin-top:20px;">
            <a class="btn primary" href="/lab/${lab.id}?view=run">▶ Run Assignment</a>
            <a class="btn" href="/lab/${lab.id}?view=code">&lt;/&gt; View Code</a>
            <a class="btn" href="/lab/${lab.id}?view=screenshots">▣ Evidence Screenshots (${screenshots.length})</a>
        </div>
    </div>`;

    if (view === 'code') {
        panel += `<div class="panel">
            <h2>Source Code: <code>${escapeHtml(lab.file)}</code></h2>
            <div class="code">${escapeHtml(source)}</div>
        </div>`;
    } else if (view === 'screenshots') {
        panel += `<div class="panel">
            <h2>Practical Evidence Screenshots</h2>
            ${screenshots.length ? `<div class="screens">${screenshots.map(file => `<figure><img src="/asset/${encodeURIComponent(lab.folder)}/${encodeURIComponent(file)}" alt="${escapeHtml(file)}"><figcaption>${escapeHtml(file)}</figcaption></figure>`).join('')}</div>` : '<p style="color:var(--muted)">No screenshot files found in this lab directory.</p>'}
        </div>`;
    } else if (view === 'run') {
        let output = '';
        if (lab.type === 'script') {
            try {
                const result = await execFileAsync(process.execPath, [labFile(lab)], { cwd: path.dirname(labFile(lab)), timeout: 8000, maxBuffer: 1024 * 1024 });
                output = result.stdout + (result.stderr ? `\n${result.stderr}` : '');
            } catch (err) {
                output = (err.stdout || '') + (err.stderr || err.message || 'Execution failed');
            }
        } else {
            try {
                const handler = loadServerHandler(lab);
                output = await runHttpHandler(handler, lab.tryPath || '/');
            } catch (err) {
                output = `Server execution failed: ${err.message || err}`;
            }
        }
        panel += `<div class="panel">
            <h2>Live Execution Output</h2>
            <div class="output-window">
                <div class="output-header">
                    <span class="dot dot-red"></span>
                    <span class="dot dot-yellow"></span>
                    <span class="dot dot-green"></span>
                    <span>Node.js Terminal Terminal Output — ${escapeHtml(lab.file)}</span>
                </div>
                <pre class="output">${escapeHtml(output)}</pre>
            </div>
            ${lab.type === 'server' ? `<p style="margin-top:16px; color:var(--muted); font-size:14px">Test route endpoint: <code>${escapeHtml(lab.tryPath || '/')}</code> · <a href="/lab/${lab.id}/app${lab.tryPath || '/'}" style="color:var(--primary); font-weight:700" target="_blank">Open live endpoint in browser →</a></p>` : ''}
        </div>`;
    }

    return layout(`Lab ${lab.id}: ${lab.title}`, `<main class="wrap">
        <div class="crumb"><a href="/">← All Assignments</a> / Lab ${lab.id}</div>
        <section class="labhead">
            <div>
                <div class="eyebrow">LAB ${lab.id}</div>
                <h1>${escapeHtml(lab.title)}</h1>
                <p style="color:var(--muted); font-size:17px; line-height:1.6; margin:0">${escapeHtml(lab.description)}</p>
            </div>
            <span class="type-badge ${lab.type}" style="font-size:13px; padding:8px 16px;">${lab.type === 'server' ? '🌐 Server API' : '⚡ CLI Script'}</span>
        </section>
        ${panel}
    </main>`, 'home');
}

async function runHttpHandler(handler, urlPath) {
    return await new Promise((resolve, reject) => {
        const chunks = [];
        const response = {
            statusCode: 200,
            headers: {},
            writeHead(status, headers = {}) {
                this.statusCode = status;
                this.headers = { ...this.headers, ...headers };
            },
            setHeader(name, value) {
                this.headers[name] = value;
            },
            write(chunk) {
                chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
            },
            end(chunk) {
                if (chunk !== undefined) this.write(chunk);
                const body = Buffer.concat(chunks).toString('utf8');
                const contentType = this.headers['Content-Type'] || this.headers['content-type'] || 'text/plain';
                resolve(`HTTP ${this.statusCode}\nContent-Type: ${contentType}\n\n${body}`);
            }
        };

        try {
            const fn = typeof handler === 'function'
                ? handler
                : (handler && typeof handler.listeners === 'function' && handler.listeners('request')[0]);

            if (typeof fn === 'function') {
                const req = { url: urlPath, method: 'GET', headers: { host: 'localhost' } };
                const result = fn(req, response);
                if (result && typeof result.then === 'function') {
                    result.catch(reject);
                }
            } else {
                resolve(`HTTP 200\nContent-Type: application/json\n\n${JSON.stringify({ status: 'Server handler ready', note: 'Use live endpoint link to test.' }, null, 2)}`);
            }
        } catch (error) {
            reject(error);
        }
    });
}

function send(res, status, body, type = 'text/html; charset=utf-8') {
    res.writeHead(status, {'Content-Type': type});
    res.end(body);
}

const server = http.createServer(async (req, res) => {
    try {
        const parsed = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
        const pathname = parsed.pathname;

        if (pathname === '/') return send(res, 200, homePage());

        if (pathname === '/about') {
            const aboutHtml = layout('About Portal', `<main class="wrap">
                <div class="crumb"><a href="/">← Home</a> / About Portal</div>
                <section class="hero">
                    <div class="eyebrow">📜 Project Specifications</div>
                    <h1>Node.js Practical<br><span class="green-text">Assignment Portal Specs</span></h1>
                    <p>Built for the BCA 6th Semester Practical Examination. Demonstrates dynamic integration of standalone scripts and HTTP servers using standard Node.js modules.</p>
                </section>
                <div class="panel">
                    <h2>Academic & Technical Details</h2>
                    <table style="width:100%; border-collapse:collapse; margin-top:10px;">
                        <tr style="border-bottom:1px solid var(--line);"><td style="padding:12px; font-weight:700; width:220px;">Student Name</td><td style="padding:12px;">Mikki Jaiswal</td></tr>
                        <tr style="border-bottom:1px solid var(--line);"><td style="padding:12px; font-weight:700;">Scholar ID</td><td style="padding:12px;">23145027</td></tr>
                        <tr style="border-bottom:1px solid var(--line);"><td style="padding:12px; font-weight:700;">Course</td><td style="padding:12px;">BCA (Bachelor of Computer Applications) - 6th Semester</td></tr>
                        <tr style="border-bottom:1px solid var(--line);"><td style="padding:12px; font-weight:700;">Subject</td><td style="padding:12px;">Node.js Practical Lab Assignment</td></tr>
                        <tr style="border-bottom:1px solid var(--line);"><td style="padding:12px; font-weight:700;">Core Modules Used</td><td style="padding:12px;">http, fs, path, url, events, child_process, util</td></tr>
                        <tr><td style="padding:12px; font-weight:700;">Lab Count</td><td style="padding:12px;">07 Active Practical Modules</td></tr>
                    </table>
                </div>
            </main>`, 'about');
            return send(res, 200, aboutHtml);
        }

        if (pathname === '/health') {
            const healthData = {
                status: 'ok',
                environment: 'Node.js Runtime',
                uptimeSeconds: Math.floor(process.uptime()),
                timestamp: new Date().toISOString(),
                totalLabs: labs.length,
                student: 'Mikki Jaiswal (Scholar: 23145027)'
            };
            return send(res, 200, JSON.stringify(healthData, null, 2), 'application/json; charset=utf-8');
        }

        const appMatch = pathname.match(/^\/lab\/(\d{2})\/app(\/.*)?$/);
        if (appMatch) {
            const lab = labById(appMatch[1]);
            if (!lab || lab.type !== 'server') return send(res, 404, 'Server lab not found');
            const handler = loadServerHandler(lab);
            const fn = typeof handler === 'function'
                ? handler
                : (handler && typeof handler.listeners === 'function' && handler.listeners('request')[0]);
            req.url = (appMatch[2] || '/') + (parsed.search || '');
            if (typeof fn === 'function') {
                return fn(req, res);
            }
            return send(res, 500, 'Could not resolve server request handler');
        }

        const assetMatch = pathname.match(/^\/asset\/([^/]+)\/(.+)$/);
        if (assetMatch) {
            const folder = path.basename(decodeURIComponent(assetMatch[1]));
            const file = path.basename(decodeURIComponent(assetMatch[2]));
            if (!/^Lab-\d+$/.test(folder) || !/\.(png|jpg|jpeg)$/i.test(file)) return send(res, 400, 'Invalid asset path');
            const filePath = path.join(ROOT, folder, file);
            const stream = fs.createReadStream(filePath);
            stream.on('error', () => send(res, 404, 'Image asset not found'));
            res.writeHead(200, {'Content-Type': file.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg'});
            return stream.pipe(res);
        }

        const match = pathname.match(/^\/lab\/(\d{2})$/);
        if (match) {
            const lab = labById(match[1]);
            if (!lab) return send(res, 404, layout('Not Found', '<main class="wrap"><h1>Lab not found</h1><a href="/">Go Home</a></main>'));
            return send(res, 200, await labPage(lab, parsed.searchParams.get('view') || 'home'));
        }

        return send(res, 404, layout('404 Not Found', '<main class="wrap"><h1>404 Page Not Found</h1><p>The requested route does not exist.</p><a class="btn primary" href="/">Go Home</a></main>'));
    } catch (error) {
        console.error('Server error:', error);
        if (!res.headersSent) send(res, 500, 'Internal Server Error');
    }
});

server.listen(PORT, '0.0.0.0', () => console.log(`⚡ Node.js Lab Assignment Portal running at http://localhost:${PORT}`));
