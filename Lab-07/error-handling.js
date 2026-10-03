const EventEmitter = require('events');
const risky = new EventEmitter();

// Error listener to catch and handle errors gracefully
risky.on('error', (err) => {
  console.log('Handled gracefully:', err.message);
});

// Emitting an error
risky.emit('error', new Error('Something broke'));