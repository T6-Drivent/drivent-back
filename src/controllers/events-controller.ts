import eventsService from '@/services/events-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getDefaultEvent(_req: Request, res: Response) {
  const event = await eventsService.getFirstEvent();

  return res.status(httpStatus.OK).send(event);
}

export async function getEventPrices(_req: Request, res: Response) {
  const prices = await eventsService.getPrices();

  res.status(httpStatus.OK).send(prices);
}
