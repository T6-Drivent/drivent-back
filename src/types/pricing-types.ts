import { Price as PrismaPrice } from '@prisma/client';

export type Price = Omit<PrismaPrice, 'id' | 'createdAt' | 'updatedAt'>;

export interface EventPrices {
  price: Price;
}
