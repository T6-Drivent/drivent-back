import { prisma } from '@/config';
import { Registration } from '@prisma/client';
import { CreateRegistration } from '../../types/registration-types';

export interface RegistrationRepository {
  create(data: CreateRegistration): Promise<void>;
  getByUserId(userId: number): Promise<Registration | null>;
}

async function createRegistration(data: CreateRegistration): Promise<void> {
  await prisma.registration.create({
    data,
  });
}

async function getRegistrationByUserId(userId: number): Promise<Registration | null> {
  const registration = await prisma.registration.findUnique({
    where: {
      userId,
    },
  });

  return registration;
}

export const registrationRepository: RegistrationRepository = {
  create: createRegistration,
  getByUserId: getRegistrationByUserId,
};
