import userService, { duplicatedEmailError } from '@/services/users-service';
import { generatePrismaUser } from '../factories';
import userRepository from '@/repositories/user-repository';
import eventsService from '@/services/events-service';

describe('createUser', () => {
  it('should throw duplicatedUserError if there is a user with given email', async () => {
    const user = generatePrismaUser();

    jest.spyOn(eventsService, 'isCurrentEventActive').mockResolvedValueOnce(true);
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(user);

    await expect(userService.createUser({ email: user.email, password: user.password })).rejects.toEqual(
      duplicatedEmailError(),
    );
    expect(eventsService.isCurrentEventActive).toHaveBeenCalled();
    expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email);
  });

  it('should create user when given email is unique', async () => {
    const user = generatePrismaUser();

    jest.spyOn(eventsService, 'isCurrentEventActive').mockResolvedValueOnce(true);
    jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(null);
    jest.spyOn(userRepository, 'create').mockResolvedValueOnce(user);

    await expect(userService.createUser({ email: user.email, password: user.password })).resolves.toEqual(user);
    expect(eventsService.isCurrentEventActive).toHaveBeenCalled();
    expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email);
    expect(userRepository.create).toHaveBeenCalled();
  });
});
