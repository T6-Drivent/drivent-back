import { CreateRegistrationService } from '../../types/registration-types';
import userService from '../users-service/index';
import enrollmentsService from '../enrollments-service/index';
import eventsService from '@/services/events-service';
import { registrationRepository } from '@/repositories/registration-repository';
import { conflictError } from '../../errors/conflict-error';
import { Registration } from '../../entities/Registration';
import { Registration as PrismaRegistration } from '@prisma/client';

export interface RegistrationService {
  create(data: CreateRegistrationService): Promise<void>;
  getByUserId(userId: number): Promise<PrismaRegistration | object>;
}

async function ensureUserIsNotRegistered(userId: number): Promise<void> {
  const registration = await registrationRepository.getByUserId(userId);

  if (registration) {
    throw conflictError('User is already registered');
  }
}

async function createRegistrationService(data: CreateRegistrationService): Promise<void> {
  await userService.validateByIdOrFail(data.userId);

  await enrollmentsService.validateByUserIdOrFail(data.userId);

  await ensureUserIsNotRegistered(data.userId);

  const { id: eventId } = await eventsService.getFirstEvent();

  const registration = new Registration({ ...data, eventId });

  await registrationRepository.create(registration.props);
}

async function getRegistration(userId: number): Promise<PrismaRegistration | object> {
  await userService.validateByIdOrFail(userId);

  await enrollmentsService.validateByUserIdOrFail(userId);

  const registration = await registrationRepository.getByUserId(userId);

  return registration || {};
}

export const registrationService: RegistrationService = {
  create: createRegistrationService,
  getByUserId: getRegistration,
};
