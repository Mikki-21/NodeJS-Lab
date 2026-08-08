# NodeJS-Lab

## Lab 02 – Basic HTTP Server Using Node.js

**Date:** 08 August 2026

## Objective

In this lab, I learned how to create a basic HTTP server using Node.js and its built-in `http` module. I also learned how to handle different routes, send text and JSON responses, and display a 404 message for unknown pages. Along with this, I learned how to use an environment variable to control the server port.

## Routes

| Route | Method | What it shows |
|---|---|---|
| `/` | GET | A welcome message with my name, scholar number, and course |
| `/about` | GET | A short introduction about me |
| `/college` | GET | My college name and current semester |
| `/profile` | GET | My details in JSON format |
| Unknown route | GET | Shows "Page Not Found" with a 404 status |

## Technologies Used

- Node.js
- JavaScript
- HTTP Module
- Visual Studio Code
- Git
- GitHub

## Project Files

- `server.js` – Contains the Node.js server and all the routes
- `package.json` – Contains the project configuration
- `README.md` – Contains information about this lab
- `architecture-notes.txt` – Contains my notes about Node.js architecture
- `server-running.png` – Screenshot of the running server
- `routes-output.png` – Screenshot showing the different routes

## How to Run

First, open the terminal inside the `Lab-02` folder.

Run:

```bash
node server.js
```

The server will start on port 3000 by default.

Open this address in the browser:

http://localhost:3000

## Problems Faced

### Task 7 – Environment Variable for Port

**Issue:**  
While testing the server, I wanted to check whether the port could be changed using an environment variable.

**What I tried:**  
I used the following PowerShell command:

```powershell
$env:PORT=5000
```

After that, I started the server again and it successfully ran on port 5000. Later, I removed the environment variable so that the server could run again on the default port 3000.

**Result:**  
The server worked successfully on both port 3000 and port 5000.