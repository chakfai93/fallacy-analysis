// Unified Logging System

class Logger {
    constructor() {
        this.logs = [];
    }

    log(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp });
        console.log(`[LOG] ${timestamp}: ${message}`);
    }

    error(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp, level: 'error' });
        console.error(`[ERROR] ${timestamp}: ${message}`);
    }

    warn(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp, level: 'warn' });
        console.warn(`[WARN] ${timestamp}: ${message}`);
    }

    info(message) {
        const timestamp = new Date().toISOString();
        this.logs.push({ message, timestamp, level: 'info' });
        console.info(`[INFO] ${timestamp}: ${message}`);
    }

    getLogs() {
        return this.logs;
    }
}

// Exporting the Logger class
module.exports = new Logger();
