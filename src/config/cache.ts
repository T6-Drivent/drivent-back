import { createClient as RedisClient, RedisClientType } from 'redis';

export const redis: RedisClientType = RedisClient({
  url: process.env.REDIS_URL,
});
export function connectCache(): void {
  redis.connect();
}

export async function disconnectCache() {
  await redis?.quit();
}
