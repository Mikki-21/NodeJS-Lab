const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const LOG_DIR = path.join(__dirname, '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'server.log');

fs.mkdirSync(LOG_DIR, { recursive: true });

class Logger extends EventEmitter {}

const logger = new Logger();

logger.on('request', (method, url) => {
    const line = `${new Date().toISOString()} ${method} ${url}\n`;
    console.log(line.trim());

    fs.appendFile(LOG_FILE, line, (err) => {
        if (err) {
            logger.emit('error', err);
        }
    });
});

logger.on('error', (err) => {
    console.error(`[Logger Error] ${err.message}`);
});

module.exports = { logger, LOG_FILE };
