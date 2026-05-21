import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TrafficModule } from './traffic/traffic.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [PrismaModule, TrafficModule, CacheModule],
})
export class AppModule {}
