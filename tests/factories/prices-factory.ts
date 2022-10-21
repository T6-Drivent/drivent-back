import { Price as CreatePrice } from '@/types/pricing-types';
import faker from '@faker-js/faker';
import { prisma } from '../../src/config/database';

export function generatePrices() {
  const prices: CreatePrice = {
    inPerson: parseInt(faker.random.numeric(5), 10),
    online: parseInt(faker.random.numeric(5), 10),
    withHotel: parseInt(faker.random.numeric(5), 10),
    withoutHotel: parseInt(faker.random.numeric(5), 10),
  };

  return prices;
}

export async function createPrismaPrices() {
  return prisma.price.create({
    data: { ...generatePrices() },
  });
}
