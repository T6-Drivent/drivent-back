import userService from '@/services/users-service';
import { generatePrismaUser } from '../factories/users-factory';
import enrollmentsService from '../../src/services/enrollments-service/index';
import { generatePrismaEnrollment } from '../factories/enrollments-factory';
import { registrationRepository } from '../../src/repositories/registration-repository/index';
import eventsService from '@/services/events-service';
import { generatePrismaEvent } from '../factories/events-factory';
import { generateRegistrationServiceInput, generatePrismaRegistration } from '../factories/registration-factory';
import { registrationService } from '../../src/services/registration-service/index';
import userRepository from '@/repositories/user-repository';
import { userNotFoundError } from '../../src/services/users-service/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { enrollmentNotFoundError } from '../../src/services/enrollments-service/errors';
import { conflictError } from '../../src/errors/conflict-error';

describe('Create Registration Service', () => {
  it('should be able to create a registration', async () => {
    jest.spyOn(userService, 'validateByIdOrFail').mockResolvedValueOnce(generatePrismaUser());
    jest.spyOn(enrollmentsService, 'validateByUserIdOrFail').mockResolvedValueOnce(generatePrismaEnrollment());
    jest.spyOn(registrationRepository, 'getByUserId').mockResolvedValueOnce(null);
    jest.spyOn(registrationRepository, 'create').mockResolvedValueOnce(null);
    jest.spyOn(eventsService, 'getFirstEvent').mockResolvedValueOnce(generatePrismaEvent());

    const fakeRegistrationData = generateRegistrationServiceInput();

    await expect(registrationService.create(fakeRegistrationData)).resolves.not.toThrow();
  });

  it('should not be able to create a registration if user does not exist', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(null);

    const fakeRegistrationData = generateRegistrationServiceInput();

    await expect(registrationService.create(fakeRegistrationData)).rejects.toEqual(userNotFoundError());
  });

  it('should not be able to create a registration if the user does not have an enrollment', async () => {
    jest.spyOn(userService, 'validateByIdOrFail').mockResolvedValueOnce(generatePrismaUser());
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(null);

    const fakeRegistrationData = generateRegistrationServiceInput();

    await expect(registrationService.create(fakeRegistrationData)).rejects.toEqual(enrollmentNotFoundError());
  });

  it('should not be able to create a registration if the user is already registered', async () => {
    jest.spyOn(userService, 'validateByIdOrFail').mockResolvedValueOnce(generatePrismaUser());
    jest.spyOn(enrollmentsService, 'validateByUserIdOrFail').mockResolvedValueOnce(generatePrismaEnrollment());
    jest.spyOn(registrationRepository, 'getByUserId').mockResolvedValueOnce(generatePrismaRegistration());

    const fakeRegistrationData = generateRegistrationServiceInput();

    await expect(registrationService.create(fakeRegistrationData)).rejects.toEqual(
      conflictError('User is already registered'),
    );
  });
});

describe('Get User Event Registration Service', () => {
  it('should be able to get the user registration', async () => {
    const mockUser = generatePrismaUser();
    const mockRegistration = generatePrismaRegistration({ userId: mockUser.id });

    jest.spyOn(userService, 'validateByIdOrFail').mockResolvedValueOnce(mockUser);
    jest.spyOn(enrollmentsService, 'validateByUserIdOrFail').mockResolvedValueOnce(generatePrismaEnrollment());
    jest.spyOn(registrationRepository, 'getByUserId').mockResolvedValueOnce(mockRegistration);

    await expect(registrationService.getByUserId(mockUser.id)).resolves.toEqual(mockRegistration);
  });

  it('should return an empty object when user does not have a registration yet', async () => {
    const mockUser = generatePrismaUser();

    jest.spyOn(userService, 'validateByIdOrFail').mockResolvedValueOnce(mockUser);
    jest.spyOn(enrollmentsService, 'validateByUserIdOrFail').mockResolvedValueOnce(generatePrismaEnrollment());
    jest.spyOn(registrationRepository, 'getByUserId').mockResolvedValueOnce(null);

    await expect(registrationService.getByUserId(mockUser.id)).resolves.toEqual({});
  });

  it('should not be able to get a registration if user does not exist', async () => {
    const mockUser = generatePrismaUser();

    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce(null);

    await expect(registrationService.getByUserId(mockUser.id)).rejects.toEqual(userNotFoundError());
  });

  it('should not be able to get a registration if the user does not have an enrollment', async () => {
    const mockUser = generatePrismaUser();

    jest.spyOn(userService, 'validateByIdOrFail').mockResolvedValueOnce(mockUser);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(null);

    await expect(registrationService.getByUserId(mockUser.id)).rejects.toEqual(enrollmentNotFoundError());
  });
});
