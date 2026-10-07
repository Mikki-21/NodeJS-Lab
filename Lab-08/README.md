# Lab 08 – Integrated Node.js Lab Server

**Student:** Mikki Jaiswal  
**Roll / Scholar Number:** 23145027  
**Class:** BCA, 6th Semester

## Project Description

Lab 08 brings the existing Labs 01–07 into one Node.js portal without rewriting their learning exercises. Server-based labs are imported through `module.exports` and `require()`, while script-based labs are executed with Node.js `child_process`.

The portal displays each lab's source code, available screenshots, live execution output, and integration links. It also includes an EventEmitter-based request logger and a dashboard.

## Labs Included

| Lab | Topic | Type |
|---|---|---|
| 01 | Node.js basics and data types | Script |
| 02 | Basic HTTP server and routing | Server |
| 03 | Dynamic student and movie API | Server |
| 04 | Search, filter and sort API | Server |
| 05 | Async JavaScript food delivery | Script |
| 06 | File System module | Script |
| 07 | EventEmitter order tracker | Script |

## Routes

| Route | Purpose |
|---|---|
| `GET /` | Integrated portal page and lab links |
| `GET /about` | Project name, student name and lab count |
| `GET /health` | Health status, environment and uptime |
| `GET /labs` | Lab registry with slugified titles |
| `GET /labs/:id` | Lab information, complete source code and screenshots |
| `GET /labs/:id/run` | Execute a script lab and return JSON output |
| `GET /labs/:id/app/...` | Forward a request to a server lab handler |
| `GET /screenshots/:name` | Serve a `.png`, `.jpg` or `.jpeg` screenshot |
| `GET /api/dashboard` | Labs, screenshots and request-log count |
| Other | JSON 404 response |

## Technologies Used

- Node.js
- `http`
- `fs` / `fs.promises`
- `events` / EventEmitter
- `child_process`
- `path`
- `url`
- `slugify`

## Run Locally

From the repository root:

```bash
cd Lab-08
npm install
npm start
```

Then open:

```text
http://localhost:3000/
```

Useful tests:

```text
http://localhost:3000/health
http://localhost:3000/labs
http://localhost:3000/labs/01
http://localhost:3000/labs/02/app/profile
http://localhost:3000/labs/03/app/students
http://localhost:3000/labs/04/app/students?course=BCA&minMarks=60&sort=marks&order=desc
http://localhost:3000/labs/05/run
http://localhost:3000/labs/06/run
http://localhost:3000/labs/07/run
http://localhost:3000/api/dashboard
http://localhost:3000/labs/99
```

## Render Deployment

Render should use the whole repository because Lab 08 reads the previous lab folders.

- **Root Directory:** blank
- **Build Command:**
  ```bash
  for d in */; do if [ -f "$d/package.json" ]; then (cd "$d" && npm install); fi; done
  ```
- **Start Command:**
  ```bash
  node Lab-08/server.js
  ```
- **Instance Type:** Free
- **Environment variable:** `STUDENT_NAME=Mikki Jaiswal` (optional)

**Live URL:** Add the Render URL after deployment.

## Screenshots

Place browser screenshots with the address bar visible in:

```text
Lab-08/public/screenshots/
```

Use:

```text
lab01-local.png
lab02-local.png
lab03-local.png
lab04-local.png
lab05-local.png
lab06-local.png
lab07-local.png

lab01-live.png
lab02-live.png
lab03-live.png
lab04-live.png
lab05-live.png
lab06-live.png
lab07-live.png
```

Existing lab evidence images have also been copied into this folder with `labXX-existing-*` names so they can be viewed from the portal.

## What I Learned

I learned how CommonJS modules can integrate previously written Node.js programs without rewriting their core logic. I also practiced using `child_process`, EventEmitter, asynchronous file operations, URL parsing, and safe file handling in one server. Finally, I learned why Render deployments must use `process.env.PORT` and bind to `0.0.0.0`.

## Submission

- GitHub repository: Add your public repository URL here.
- Live Render URL: Add your deployed URL here.
