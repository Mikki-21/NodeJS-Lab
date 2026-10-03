# Lab 07: Implementing EventEmitter - Event-Driven Programming

- **Lab Number:** 07
- **Course:** CS403NOD - Node.js
- **Date:** October 3, 2026

## Overview
This lab demonstrates the fundamentals of event-driven architecture in Node.js using the built-in `events` module.

## File Descriptions
- `events-basic.js`: Demonstrates basic event registration with `.on()`, event emission via `.emit()`, and the synchronous ordering requirement of event listeners.
- `order-system.js`: Demonstrates attaching multiple independent listeners (Kitchen, Billing, SMS, and Loyalty) to a single emitted event.
- `once-vs-on.js`: Illustrates the behavioral difference between persistent listeners (`.on()`) and one-time self-deregistering listeners (`.once()`).
- `error-handling.js`: Shows how unhandled `'error'` events crash the Node.js process and how to catch them gracefully with dedicated listeners.
- `notification-center.js`: Demonstrates extending the `EventEmitter` class within an ES6 class hierarchy and dispatching custom domain events.
- `order-tracker.js`: A mini-project combining custom classes, multiple listeners per event, one-time rewards, error safety, and asynchronous execution delays.
- `reflection-notes.txt`: Explanations connecting `EventEmitter` to the Observer Pattern and core Node.js stream internals.

## Problems Faced
*(None encountered during implementation. All listeners fired in registration order, and errors were caught gracefully.)*