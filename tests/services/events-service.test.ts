import { generatePrices } from '../factories';
import eventsService from '../../src/services/events-service/index';
import eventRepository from '@/repositories/event-repository';

describe('Get Event Prices Service', () => {
  it('Should be able to get the prices', async () => {
    const price = generatePrices();

    jest.spyOn(eventRepository, 'getPrices').mockResolvedValueOnce({ price });

    await expect(eventsService.getPrices()).resolves.toEqual(price);
    expect(eventRepository.getPrices).toHaveBeenCalledTimes(1);
  });
});
