import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../cache/redis.service';

@Injectable()
export class TrafficService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async getCountryWiseTraffic() {
    const key = 'traffic:country';

    const cached = await this.redis.get(key);
    if (cached) return cached;

    const result = await this.prisma.traffic.groupBy({
      by: ['country'],
      _sum: {
        count: true,
      },
      orderBy: {
        _sum: {
          count: 'desc',
        },
      },
    });

    await this.redis.set(key, result, 60);

    return result;
  }

  async getVehicleDistribution() {
    const key = 'traffic:vehicle';

    const cached = await this.redis.get(key);
    if (cached) return cached;

    const result = await this.prisma.traffic.groupBy({
      by: ['vehicleType'],
      _sum: {
        count: true,
      },
      orderBy: {
        _sum: {
          count: 'desc',
        },
      },
    });

    await this.redis.set(key, result, 60);
    return result;
  }
}
