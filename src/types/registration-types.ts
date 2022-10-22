import { Registration } from '@prisma/client';

export type CreateRegistration = Omit<Registration, 'id' | 'createdAt' | 'updatedAt'>;

export type CreateRegistrationParams = Pick<Registration, 'type' | 'charge'>;
