const EventEmitter = require('events');

class NotificationCenter extends EventEmitter {}

const notifier = new NotificationCenter();

// Message listener
notifier.on('newMessage', (from, text) => {
  console.log(`${from}: ${text}`);
});

// Custom event: user status
notifier.on('userOnline', (user) => {
  console.log(`Status Alert: ${user} is now online.`);
});

// Safe error handling
notifier.on('error', (err) => {
  console.log('Handled:', err.message);
});

// Emit events
notifier.emit('userOnline', 'Priya');
notifier.emit('newMessage', 'Priya', 'You free?');