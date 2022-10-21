import app, { init } from '@/app';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createEvent, createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /event', () => {
  it('should respond with status 404 if there is no event', async () => {
    const response = await server.get('/event');

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status 200 and event data if there is an event', async () => {
    const event = await createEvent();

    const response = await server.get('/event');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      id: event.id,
      title: event.title,
      backgroundImageUrl: event.backgroundImageUrl,
      logoImageUrl: event.logoImageUrl,
      startsAt: event.startsAt.toISOString(),
      endsAt: event.endsAt.toISOString(),
      priceId: event.priceId,
    });
  });
});

describe('GET /event/prices', () => {
  it('should respond with status 200 and prices data if there is an event', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createEvent();

    const response = await server.get('/event/prices').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveProperty('id');
  });
});
