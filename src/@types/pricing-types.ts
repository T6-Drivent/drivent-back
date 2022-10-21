import { Price } from '@prisma/client';

export type CreatePrice = Omit<Price, 'id' | 'createdAt' | 'updatedAt'>;
