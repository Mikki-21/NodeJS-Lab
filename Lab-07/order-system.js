const EventEmitter = require('events');
const orders = new EventEmitter();

// 1. Kitchen listener
orders.on('placed', (item) => {
  console.log(`Kitchen: prepare ${item}`);
});

// 2. Billing listener
orders.on('placed', (item) => {
  console.log(`Billing: charge for ${item}`);
});

// 3. SMS listener
orders.on('placed', (item) => {
  console.log('SMS: order confirmed');
});

// 4. Loyalty Points listener (added per instructions)
orders.on('placed', (item) => {
  console.log(`Loyalty Points: 10 points added for purchasing ${item}`);
});

// Trigger all four listeners
orders.emit('placed', 'Pizza');