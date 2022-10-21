import { Price as PrismaPrice } from '@/types/pricing-types';
import { notFoundError } from '@/errors';
import eventRepository from '@/repositories/event-repository';
import { exclude } from '@/utils/prisma-utils';
import { Event } from '@prisma/client';
import dayjs from 'dayjs';

export interface EventsService {
  getFirstEvent(): Promise<GetFirstEventResult>;
  isCurrentEventActive(): Promise<boolean>;
  getPrices(): Promise<PrismaPrice>;
}

async function getFirstEvent(): Promise<GetFirstEventResult> {
  const event = await eventRepository.findFirst();
  if (!event) throw notFoundError();

  return exclude(event, 'createdAt', 'updatedAt');
}

export type GetFirstEventResult = Omit<Event, 'createdAt' | 'updatedAt'>;

async function isCurrentEventActive(): Promise<boolean> {
  const event = await eventRepository.findFirst();
  if (!event) return false;

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
}

async function getPrices() {
  const { price } = await eventRepository.getPrices();

  return price;
}

const eventsService: EventsService = {
  getFirstEvent,
  isCurrentEventActive,
  getPrices,
};

export default eventsService;
