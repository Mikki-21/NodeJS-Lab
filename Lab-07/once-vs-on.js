const EventEmitter = require('events');
const app = new EventEmitter();

// .once() fires only on the first trigger and automatically removes itself
app.once('firstLogin', (user) => {
  console.log(`Welcome bonus applied for ${user}!`);
});

// .on() fires every time the event is emitted
app.on('login', (user) => {
  console.log(`${user} logged in.`);
});

app.emit('firstLogin', 'Aman'); // Fires
app.emit('login', 'Aman');      // Fires
app.emit('firstLogin', 'Aman'); // Will NOT fire
app.emit('login', 'Aman');      // Fires