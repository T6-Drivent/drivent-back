import { EventPrices } from '@/types/pricing-types';
import { prisma } from '@/config';
import { Event } from '@prisma/client';

export interface EventRepository {
  findFirst(): Promise<Event>;
  getPrices(): Promise<EventPrices>;
}

async function findFirst() {
  return prisma.event.findFirst();
}

async function getPrices() {
  return prisma.event.findFirst({
    select: {
      price: true,
    },
  });
}

const eventRepository: EventRepository = {
  findFirst,
  getPrices,
};

export default eventRepository;
