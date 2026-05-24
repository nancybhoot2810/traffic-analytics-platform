import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.traffic.deleteMany();

  await prisma.traffic.createMany({
    data: [
      { country: 'Canada', vehicleType: 'Car', count: 120 },
      { country: 'Canada', vehicleType: 'Truck', count: 0 },
      { country: 'Canada', vehicleType: 'Bus', count: 90 },
      { country: 'USA', vehicleType: 'Car', count: 60 },
      { country: 'USA', vehicleType: 'Bike', count: 12 },
      { country: 'USA', vehicleType: 'Bus', count: 180 },
      { country: 'India', vehicleType: 'Car', count: 300 },
      { country: 'India', vehicleType: 'Truck', count: 500 },
      { country: 'India', vehicleType: 'Bus', count: 250 },
      { country: 'Canada', vehicleType: 'Bike', count: 100 },
    ],
  });

  console.log('Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
