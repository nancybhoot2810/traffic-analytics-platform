import { Module } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { TrafficController } from './traffic.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports:[PrismaModule, CacheModule],
  providers: [TrafficService],
  controllers: [TrafficController]
})
export class TrafficModule {}
