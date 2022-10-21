import dayjs from 'dayjs';
import faker from '@faker-js/faker';
import { Event } from '@prisma/client';
import { prisma } from '@/config';
import { createPrismaPrices } from './prices-factory';

export async function createEvent(params: Partial<Event> = {}): Promise<Event> {
  const { id } = await createPrismaPrices();

  return prisma.event.create({
    data: {
      title: params.title || faker.lorem.sentence(),
      backgroundImageUrl: params.backgroundImageUrl || faker.image.imageUrl(),
      logoImageUrl: params.logoImageUrl || faker.image.imageUrl(),
      startsAt: params.startsAt || dayjs().subtract(1, 'day').toDate(),
      endsAt: params.endsAt || dayjs().add(5, 'days').toDate(),
      priceId: id,
    },
  });
}
