import Redis from 'ioredis';
import * as dotenv from 'dotenv';

dotenv.config();

export const client = new Redis({
  // tls: {},
  // host: process.env.REDIS_HOST,
  // port: 6379, // Redis port
  // // username: process.env.REDIS_USER,
  // password: process.env.REDIS_PASSWORD,
});

export const clientSubscriber = new Redis({});

client.on('connect', () => {
  console.log('Connected to Redis');
});
client.on('error', (error) => {
  console.log(`error connect with Redis : ${error}`);
});
