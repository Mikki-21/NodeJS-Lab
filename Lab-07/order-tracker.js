const EventEmitter = require('events');

class OrderTracker extends EventEmitter {}

const tracker = new OrderTracker();

// 1. Safe error listener
tracker.on('error', (err) => {
  console.error(`[Error Handler]: ${err.message}`);
});

// 2. One-time first-order bonus listener
tracker.once('firstOrderBonus', (customerId) => {
  console.log(`[Loyalty]: 20% discount coupon issued to ${customerId} for first order!`);
});

// 3. orderPlaced listeners
tracker.on('orderPlaced', (order) => {
  console.log(`[Customer Notification]: Order #${order.id} for ${order.item} placed successfully.`);
});
tracker.on('orderPlaced', (order) => {
  console.log(`[Internal Log]: Order #${order.id} received at ${new Date().toLocaleTimeString()}.`);
});

// 4. orderPrepared listeners
tracker.on('orderPrepared', (order) => {
  console.log(`[Customer Notification]: Order #${order.id} is prepared and packed.`);
});
tracker.on('orderPrepared', (order) => {
  console.log(`[Internal Log]: Kitchen finished processing Order #${order.id}.`);
});

// 5. orderDelivered listeners
tracker.on('orderDelivered', (order) => {
  console.log(`[Customer Notification]: Order #${order.id} has been delivered. Enjoy!`);
});
tracker.on('orderDelivered', (order) => {
  console.log(`[Internal Log]: Rider confirmed delivery for Order #${order.id}.`);
});

// Simulating the order lifecycle using setTimeout
const currentOrder = { id: 101, item: 'Veg Supreme Pizza', customer: 'User_442' };

console.log('--- Starting Order Lifecycle ---');

// First order trigger
tracker.emit('firstOrderBonus', currentOrder.customer);

// Step 1: Placed
tracker.emit('orderPlaced', currentOrder);

// Step 2: Prepared (1 second delay)
setTimeout(() => {
  tracker.emit('orderPrepared', currentOrder);

  // Step 3: Delivered (1 second delay after preparation)
  setTimeout(() => {
    tracker.emit('orderDelivered', currentOrder);
    console.log('--- Lifecycle Complete ---');
  }, 1000);
}, 1000);