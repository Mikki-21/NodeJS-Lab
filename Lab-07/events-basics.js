const EventEmitter = require('events');
const emitter = new EventEmitter();

// Listener registered
emitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Emitting event
emitter.emit('greet', 'Class');