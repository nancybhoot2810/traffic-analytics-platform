import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../cache/redis.service';

@Injectable()
export class TrafficService {
  private readonly COUNTRY_CACHE_KEY = 'traffic:country';
  private readonly VEHICLE_CACHE_KEY = 'traffic:vehicle';

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
    const cached = await this.redis.get(this.COUNTRY_CACHE_KEY);
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

    await this.redis.set(this.COUNTRY_CACHE_KEY, result, 10);

    return result;
  }

  async getVehicleDistribution() {
    const cached = await this.redis.get(this.VEHICLE_CACHE_KEY);
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

    await this.redis.set(this.VEHICLE_CACHE_KEY, result, 10);

    return result;
  }

  async getPaginatedCountries(page = 1, limit = 3) {
    const safePage = Math.max(Number(page) || 1, 1);
    const safeLimit = Math.max(Number(limit) || 3, 1);
    const skip = (safePage - 1) * safeLimit;

    const groupedCountries = await this.prisma.traffic.groupBy({
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

    const totalItems = groupedCountries.length;
    const totalPages = Math.ceil(totalItems / safeLimit);

    return {
      data: groupedCountries.slice(skip, skip + safeLimit),
      meta: {
        page: safePage,
        limit: safeLimit,
        totalItems,
        totalPages,
        hasNextPage: safePage < totalPages,
        hasPreviousPage: safePage > 1,
      },
    };
  }

  private async clearTrafficCache() {
    await this.redis.del(this.COUNTRY_CACHE_KEY);
    await this.redis.del(this.VEHICLE_CACHE_KEY);
  }
}