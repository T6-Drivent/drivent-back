import app, { init } from '../../src/app';
import { cleanDb, generateValidToken } from '../helpers';
import supertest from 'supertest';
import { createEnrollmentWithAddress, createEvent, createUser } from '../factories';
import { createRegistration, generateRegistrationParams } from '../factories/registration-factory';
import httpStatus from 'http-status';

beforeEach(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('POST /registrations', () => {
  it('should return 201 and be able to create a registration', async () => {
    await createEvent();

    const user = await createUser();
    const token = await generateValidToken(user);
    await createEnrollmentWithAddress(user);

    const registrationParams = generateRegistrationParams();

    const result = await server.post('/registrations').send(registrationParams).set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(httpStatus.CREATED);
    expect(result.body).toEqual({});
  });

  it('should return 409 and not be able to create a registration if it already exists', async () => {
    const event = await createEvent();

    const user = await createUser();
    const token = await generateValidToken(user);
    await createEnrollmentWithAddress(user);
    await createRegistration({ userId: user.id, eventId: event.id });

    const registrationParams = generateRegistrationParams();

    const result = await server.post('/registrations').send(registrationParams).set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(httpStatus.CONFLICT);
    expect(result.body).toEqual({ message: 'User is already registered' });
  });
});
