import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client!: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    });

    this.client.on('error', (err) => {
      console.error('Redis Error:', err);
    });

    await this.client.connect();

    console.log('✅ Redis Connected');
  }

  async get(key: string) {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: any, ttl = 60) {
    await this.client.set(key, JSON.stringify(value), {
      EX: ttl,
    });
  }

  async del(key: string) {
    await this.client.del(key);
  }
}