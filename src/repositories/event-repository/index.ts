import { EventPrices } from '@/types/pricing-types';
import { prisma, redis } from '@/config';
import { Event } from '@prisma/client';

export interface EventRepository {
  findFirst(): Promise<Event>;
  getPrices(): Promise<EventPrices>;
}

async function findFirst() {
  const cachedEvent = await redis.get('event');
  if (cachedEvent) {
    return JSON.parse(cachedEvent);
  }
  const event = await prisma.event.findFirst();
  await redis.set('event', JSON.stringify(event));
  return event;
}

async function getPrices() {
  const cachedPrices = await redis.get('prices');
  if (cachedPrices) {
    return JSON.parse(cachedPrices);
  }
  const prices = await prisma.event.findFirst({
    select: {
      price: true,
    },
  });
  await redis.set('prices', JSON.stringify(prices));
  return prices;
}

const eventRepository: EventRepository = {
  findFirst,
  getPrices,
};

export default eventRepository;
