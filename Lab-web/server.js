const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Main NodeJS-Lab folder
const labsFolder = path.join(__dirname, '..');

// Practical names
const practicalNames = {
    "Lab-01": "Node.js Fundamentals",
    "Lab-02": "HTTP Server and Routing",
    "Lab-03": "Student Directory API",
    "Lab-04": "Advanced Search, Filter and Sort API"
};

// Practical descriptions
const descriptions = {
    "Lab-01": "Learned Node.js installation, NPM, variables, data types and basic Node.js programs.",
    "Lab-02": "Created an HTTP server and learned how different routes return different responses.",
    "Lab-03": "Built a dynamic student directory API using URL parameters, find() and filter().",
    "Lab-04": "Implemented search, filtering, sorting, query parameters and input validation."
};


// Find all Lab folders
function getLabs() {

    return fs.readdirSync(labsFolder)
        .filter(folder => /^Lab-\d+$/.test(folder))
        .sort((a, b) => {
            const numA = parseInt(a.split('-')[1]);
            const numB = parseInt(b.split('-')[1]);

            return numA - numB;
        });
}


// Generate hamburger menu
function createMenu(labs) {

    let menu = `
        <a href="/" class="menu-home">🏠 Home</a>
        <div class="menu-title">MY PRACTICALS</div>
    `;

    labs.forEach(lab => {

        const title =
            practicalNames[lab] || `Node.js Practical ${lab.split('-')[1]}`;

        menu += `
            <a href="/lab/${lab}" class="menu-item">
                <span>LAB ${lab.split('-')[1]}</span>
                <small>${title}</small>
            </a>
        `;
    });

    menu += `
        <div class="menu-bottom">
            <a href="https://github.com/Mikki-21/NodeJS-Lab" target="_blank">
                GitHub ↗
            </a>
        </div>
    `;

    return menu;
}


// Generate lab cards
function createCards(labs) {

    let cards = '';

    labs.slice().reverse().forEach(lab => {

        const number = lab.split('-')[1];

        const title =
            practicalNames[lab] || `Node.js Practical ${number}`;

        const description =
            descriptions[lab] ||
            "Node.js practical assignment and implementation.";

        cards += `
            <article class="lab-card">

                <div class="card-top">

                    <span class="lab-label">
                        LAB ${number}
                    </span>

                    <span class="completed">
                        Completed ✓
                    </span>

                </div>

                <h3>${title}</h3>

                <p>${description}</p>

                <a href="/lab/${lab}" class="view-button">
                    View Practical →
                </a>

            </article>
        `;
    });

    return cards;
}


// Create home page
function homePage() {

    const labs = getLabs();

    const menu = createMenu(labs);
    const cards = createCards(labs);

    const html = `

<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>Mikki's Node.js Labs</title>


    <style>

        * {
            box-sizing: border-box;
        }


        body {

            margin: 0;

            font-family:
                Arial,
                Helvetica,
                sans-serif;

            background: #f7f7f5;

            color: #202020;
        }


        /* NAVBAR */

        .navbar {

            height: 70px;

            display: flex;

            align-items: center;

            justify-content: space-between;

            padding: 0 7%;

            background: #ffffff;

            border-bottom:
                1px solid #e5e5e5;

            position: sticky;

            top: 0;

            z-index: 100;
        }


        .brand {

            font-size: 20px;

            font-weight: 700;
        }


        .brand span {

            color: #2563eb;
        }


        .hamburger {

            border: none;

            background: none;

            font-size: 28px;

            cursor: pointer;

            padding: 5px;
        }


        /* SIDE MENU */

        .side-menu {

            position: fixed;

            top: 0;

            right: -360px;

            width: 350px;

            height: 100vh;

            background: #ffffff;

            z-index: 1000;

            box-shadow:
                -5px 0 25px rgba(0,0,0,0.12);

            padding: 30px;

            transition:
                right 0.3s ease;

            overflow-y: auto;
        }


        .side-menu.open {

            right: 0;
        }


        .close-button {

            border: none;

            background: none;

            font-size: 28px;

            cursor: pointer;

            float: right;
        }


        .side-menu h2 {

            margin-top: 50px;

            margin-bottom: 25px;
        }


        .menu-home {

            display: block;

            padding: 12px 0;

            color: #2563eb;

            text-decoration: none;

            font-weight: 600;
        }


        .menu-title {

            margin-top: 25px;

            margin-bottom: 10px;

            font-size: 12px;

            font-weight: bold;

            color: #888;

            letter-spacing: 1px;
        }


        .menu-item {

            display: block;

            padding: 14px 12px;

            margin-bottom: 7px;

            border-radius: 8px;

            text-decoration: none;

            color: #222;

            transition: background 0.2s;
        }


        .menu-item:hover {

            background: #f0f4ff;
        }


        .menu-item span {

            display: block;

            font-size: 12px;

            font-weight: bold;

            color: #2563eb;

            margin-bottom: 4px;
        }


        .menu-item small {

            font-size: 14px;
        }


        .menu-bottom {

            margin-top: 30px;

            padding-top: 20px;

            border-top:
                1px solid #eee;
        }


        .menu-bottom a {

            color: #222;

            text-decoration: none;

            font-weight: 600;
        }


        /* HERO */

        .hero {

            max-width: 1000px;

            margin: auto;

            padding:
                100px 25px 70px;
        }


        .hero-label {

            color: #2563eb;

            font-size: 13px;

            font-weight: bold;

            letter-spacing: 1.5px;

            text-transform: uppercase;
        }


        .hero h1 {

            font-size:
                clamp(42px, 7vw, 72px);

            line-height: 1.05;

            margin:
                15px 0 25px;

            max-width: 850px;

            letter-spacing: -2px;
        }


        .hero h1 span {

            color: #2563eb;
        }


        .hero p {

            max-width: 650px;

            font-size: 18px;

            line-height: 1.7;

            color: #666;
        }


        /* STATS */

        .stats {

            max-width: 1000px;

            margin: 0 auto 70px;

            padding: 0 25px;

            display: grid;

            grid-template-columns:
                repeat(3, 1fr);

            gap: 15px;
        }


        .stat {

            background: white;

            padding: 25px;

            border:
                1px solid #e8e8e8;

            border-radius: 12px;
        }


        .stat strong {

            display: block;

            font-size: 30px;

            margin-bottom: 5px;
        }


        .stat span {

            color: #777;

            font-size: 14px;
        }


        /* LAB SECTION */

        .labs-section {

            max-width: 1000px;

            margin: auto;

            padding:
                0 25px 80px;
        }


        .section-heading {

            margin-bottom: 30px;
        }


        .section-heading h2 {

            font-size: 32px;

            margin-bottom: 8px;
        }


        .section-heading p {

            color: #777;
        }


        .lab-card {

            background: #ffffff;

            border:
                1px solid #e5e5e5;

            border-radius: 14px;

            padding: 30px;

            margin-bottom: 18px;

            transition:
                transform 0.2s,
                box-shadow 0.2s;
        }


        .lab-card:hover {

            transform:
                translateY(-3px);

            box-shadow:
                0 10px 30px rgba(0,0,0,0.07);
        }


        .card-top {

            display: flex;

            justify-content: space-between;

            align-items: center;

            margin-bottom: 15px;
        }


        .lab-label {

            font-size: 12px;

            font-weight: bold;

            color: #2563eb;

            letter-spacing: 1px;
        }


        .completed {

            font-size: 12px;

            color: #39814a;

            background: #edf8ef;

            padding: 6px 10px;

            border-radius: 20px;
        }


        .lab-card h3 {

            font-size: 24px;

            margin:
                8px 0 10px;
        }


        .lab-card p {

            color: #666;

            line-height: 1.6;

            max-width: 700px;
        }


        .view-button {

            display: inline-block;

            margin-top: 12px;

            color: #2563eb;

            text-decoration: none;

            font-weight: 600;
        }


        /* FOOTER */

        footer {

            background: #202020;

            color: white;

            padding: 35px 25px;

            text-align: center;
        }


        footer p {

            margin: 5px;

            color: #bbb;
        }


        /* MOBILE */

        @media (max-width: 700px) {

            .navbar {

                padding: 0 20px;
            }


            .hero {

                padding-top: 70px;
            }


            .hero h1 {

                letter-spacing: -1px;
            }


            .stats {

                grid-template-columns: 1fr;

            }


            .side-menu {

                width: 85%;

            }

        }

    </style>

</head>


<body>


    <!-- NAVBAR -->

    <nav class="navbar">

        <div class="brand">
            Mikki's <span>Node.js Labs</span>
        </div>

        <button
            class="hamburger"
            onclick="openMenu()">

            ☰

        </button>

    </nav>


    <!-- SIDE MENU -->

    <aside
        id="sideMenu"
        class="side-menu">

        <button
            class="close-button"
            onclick="closeMenu()">

            ×

        </button>

        <h2>Practical Labs</h2>

        ${menu}

    </aside>


    <!-- HERO -->

    <main>

        <section class="hero">

            <div class="hero-label">
                BCA • Node.js Practical Work
            </div>

            <h1>
                My Node.js
                <span>Learning Journey.</span>
            </h1>

            <p>
                A collection of my practical assignments,
                experiments and projects while learning
                Node.js and backend development.
            </p>

        </section>


        <!-- STATS -->

        <section class="stats">

            <div class="stat">

                <strong>${labs.length}</strong>

                <span>
                    Labs Completed
                </span>

            </div>


            <div class="stat">

                <strong>Node.js</strong>

                <span>
                    Main Technology
                </span>

            </div>


            <div class="stat">

                <strong>Practical</strong>

                <span>
                    Learning Approach
                </span>

            </div>

        </section>


        <!-- LABS -->

        <section class="labs-section">

            <div class="section-heading">

                <h2>
                    Practical Work
                </h2>

                <p>
                    Select a lab to see what I worked on
                    and the output of the practical.
                </p>

            </div>


            ${cards}

        </section>

    </main>


    <footer>

        <p>
            Node.js Lab Portfolio
        </p>

        <p>
            Built as part of my BCA practical learning.
        </p>

    </footer>


    <script>

        function openMenu() {

            document
                .getElementById('sideMenu')
                .classList
                .add('open');

        }


        function closeMenu() {

            document
                .getElementById('sideMenu')
                .classList
                .remove('open');

        }

    </script>


</body>

</html>
    `;

    return html;
}


// Lab details page
function labPage(labName) {

    const labPath =
        path.join(labsFolder, labName);

    if (!fs.existsSync(labPath)) {

        return `
            <h1>Lab Not Found</h1>
            <a href="/">Go Back</a>
        `;
    }


    const number =
        labName.split('-')[1];

    const title =
        practicalNames[labName] ||
        `Node.js Practical ${number}`;


    const files =
        fs.readdirSync(labPath);


    let fileList = '';

    files.forEach(file => {

        fileList += `
            <li>
                ${file}
            </li>
        `;

    });


    return `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta name="viewport"
      content="width=device-width, initial-scale=1.0">

<title>${title}</title>


<style>

body {

    margin: 0;

    font-family: Arial, sans-serif;

    background: #f7f7f5;

    color: #222;
}


header {

    background: white;

    border-bottom:
        1px solid #ddd;

    padding: 20px 7%;
}


header a {

    color: #2563eb;

    text-decoration: none;

    font-weight: bold;
}


main {

    max-width: 900px;

    margin: auto;

    padding: 70px 25px;
}


.label {

    color: #2563eb;

    font-size: 13px;

    font-weight: bold;

    letter-spacing: 1px;
}


h1 {

    font-size: 46px;

    margin:
        15px 0;
}


.description {

    color: #666;

    font-size: 18px;

    line-height: 1.7;
}


.box {

    background: white;

    border:
        1px solid #e5e5e5;

    border-radius: 12px;

    padding: 25px;

    margin-top: 30px;
}


.box h2 {

    margin-top: 0;
}


li {

    padding: 8px 0;

    color: #555;
}


footer {

    text-align: center;

    padding: 30px;

    color: #777;
}

</style>

</head>


<body>


<header>

<a href="/">
← Back to all labs
</a>

</header>


<main>

<div class="label">
LAB ${number}
</div>

<h1>
${title}
</h1>

<p class="description">

${
    descriptions[labName] ||
    "Node.js practical assignment and implementation."
}

</p>


<div class="box">

<h2>
Files in this practical
</h2>

<ul>

${fileList}

</ul>

</div>


<div class="box">

<h2>
What I worked on
</h2>

<p>

This practical helped me understand
Node.js concepts through hands-on
implementation and testing.

</p>

</div>


</main>


<footer>

Node.js Lab Portfolio

</footer>


</body>

</html>

    `;
}


// Server
const server = http.createServer((req, res) => {

    if (req.url === '/') {

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end(homePage());

        return;
    }


    if (req.url.startsWith('/lab/')) {

        const labName =
            decodeURIComponent(
                req.url.split('/')[2]
            );


        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end(
            labPage(labName)
        );

        return;
    }


    res.writeHead(404, {
        'Content-Type': 'text/html'
    });

    res.end(`
        <h1>404</h1>
        <p>Page not found.</p>
        <a href="/">Go Home</a>
    `);

});


server.listen(PORT, () => {

    console.log(
        `Website running at http://localhost:${PORT}`
    );

});