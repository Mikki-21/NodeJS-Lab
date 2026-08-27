# Lab 05 – Simulating a Food Delivery Tracker

**Lab Number:** 05
**Semester:** BCA VII
**Date:** 26 August 2026

## Objective

This lab demonstrates asynchronous JavaScript using callbacks, Promises, Promise chaining, async/await, and `Promise.all()`. It also connects asynchronous behavior with the Node.js Event Loop.

## Files and Their Purpose

1. **callback-version.js** – Demonstrates nested callbacks for placing, tracking, and confirming a food delivery order.
2. **promise-version.js** – Demonstrates Promise states using `.then()` for success and `.catch()` for failure.
3. **chaining-version.js** – Demonstrates sequential asynchronous operations using Promise chaining with a single `.catch()`.
4. **async-await-version.js** – Demonstrates the same order lifecycle using `async/await` with `try/catch`.
5. **concurrent-orders.js** – Demonstrates running multiple orders concurrently using `Promise.all()`.

## Reflection

The lab also explains how `setTimeout()` works with the Node.js Event Loop and why `Promise.all()` can complete multiple asynchronous operations faster than sequential `await` calls.

## Technologies Used

* Node.js
* JavaScript
* Callbacks
* Promises
* Async/Await
* Promise.all()
* Event Loop

## Lab Output

The callback version demonstrates nested callbacks, while the Promise version demonstrates both fulfilled and rejected states. The chaining and async/await versions demonstrate the complete food delivery lifecycle. The concurrent orders version demonstrates parallel execution of multiple asynchronous operations.
