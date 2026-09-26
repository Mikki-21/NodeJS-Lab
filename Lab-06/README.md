# Node.js Lab 06 — File System Module

**Lab Number:** 06
**Date:** September 25, 2026

## Overview

This lab demonstrates Node.js file system operations using the built-in `fs` module. It covers asynchronous and synchronous file reading, writing, appending, deleting, async/await, and a command-line Notes App.

## File Descriptions

| File                     | Description                                                                |
| ------------------------ | -------------------------------------------------------------------------- |
| `sample.txt`             | Sample text used for file reading and copying.                             |
| `read-async.js`          | Demonstrates asynchronous file reading using `fs.readFile()`.              |
| `read-sync.js`           | Demonstrates synchronous file reading using `fs.readFileSync()`.           |
| `write-file.js`          | Demonstrates writing and overwriting file content.                         |
| `append-file.js`         | Demonstrates appending content to an existing file.                        |
| `delete-file.js`         | Demonstrates deleting a file using `fs.unlink()`.                          |
| `async-await-version.js` | Demonstrates reading and copying a file using async/await.                 |
| `add-note.js`            | Adds a timestamped note to `notes.txt` using a command-line argument.      |
| `read-notes.js`          | Reads and displays saved notes from `notes.txt`.                           |
| `reflection-notes.txt`   | Contains reflections on asynchronous execution and concurrent file access. |

## Screenshots

* `read-comparison.png` — Comparison of asynchronous and synchronous file reading.
* `notes-app-output.png` — Output showing the Notes App saving and displaying notes.

## Concepts Learned

* Asynchronous and synchronous file operations.
* Writing, overwriting, appending, and deleting files.
* Error-first callbacks and error handling.
* Using promises and async/await.
* Building a simple command-line application with file storage.
