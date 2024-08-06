import { createClient } from 'redis';

class RedisClient {
    constructor() {
        this.client = createClient();
        
        // Handle Redis connection errors
        this.client.on('error', (err) => {
            console.error('Redis client failed to connect:', err);
        });

        // Check the connection status
        this.client.on('ready', () => {
            console.log('Redis client connected successfully');
        });
    }

    isAlive() {
        // Simple check to see if the client is connected
        return this.client.connected;
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, reply) => {
                if (err) {
                    return reject(err);
                }
                resolve(reply);
            });
        });
    }

    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, value, (err, reply) => {
                if (err) {
                    return reject(err);
                }
                resolve(reply);
            });
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, reply) => {
                if (err) {
                    return reject(err);
                }
                resolve(reply);
            });
        });
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = { redisClient };

