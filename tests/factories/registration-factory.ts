import { CreateRegistrationParams, CreateRegistrationService } from '../../src/types/registration-types';
import faker from '@faker-js/faker';
import { Registration } from '@prisma/client';
import { prisma } from '@/config';

type GenerateRegistrationParams = Partial<CreateRegistrationParams>;

type GenerateRegistrationServiceInput = Partial<CreateRegistrationService>;

export function generateRegistrationParams(params: GenerateRegistrationParams = {}) {
  const registrationParams: CreateRegistrationParams = {
    type: 'online',
    charge: 10000,
    ...params,
  };

  return registrationParams;
}

export function generateRegistrationServiceInput(params: GenerateRegistrationServiceInput = {}) {
  const registrationInput: CreateRegistrationService = {
    userId: parseInt(faker.random.numeric(), 10),
    charge: parseInt(faker.random.numeric(3), 10),
    type: 'online',
    ...params,
  };

  return registrationInput;
}

export function generatePrismaRegistration(params: Partial<Registration> = {}) {
  const registration: Registration = {
    id: parseInt(faker.random.numeric(), 10),
    userId: parseInt(faker.random.numeric(), 10),
    eventId: parseInt(faker.random.numeric(), 10),
    charge: parseInt(faker.random.numeric(3), 10),
    type: 'online',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...params,
  };

  return registration;
}

export async function createRegistration(params: Partial<Registration> = {}) {
  return prisma.registration.create({
    data: { ...generatePrismaRegistration(params) },
  });
}
