import { Test, TestingModule } from '@nestjs/testing';

import { TrafficService } from './traffic.service';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../cache/redis.service';

describe('TrafficService', () => {
  let service: TrafficService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrafficService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: RedisService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TrafficService>(TrafficService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});