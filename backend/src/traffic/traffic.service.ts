import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../cache/redis.service';

@Injectable()
export class TrafficService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async getAllTraffic() {
    return this.prisma.traffic.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createTraffic(data: {
    country: string;
    vehicleType: string;
    count: number;
  }) {
    const result = await this.prisma.traffic.create({
      data,
    });

    await this.clearTrafficCache();

    return result;
  }

  async updateTraffic(
    id: number,
    data: {
      country?: string;
      vehicleType?: string;
      count?: number;
    },
  ) {
    const result = await this.prisma.traffic.update({
      where: { id },
      data,
    });

    await this.clearTrafficCache();

    return result;
  }

  async deleteTraffic(id: number) {
    const result = await this.prisma.traffic.delete({
      where: { id },
    });

    await this.clearTrafficCache();

    return result;
  }

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

  private async clearTrafficCache() {
    await this.redis.del('country-wise-traffic');
    await this.redis.del('vehicle-wise-traffic');
  }
}
