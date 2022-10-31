import authenticationService, { invalidCredentialsError } from '@/services/authentication-service';
import { generateUserSignInParams, generatePrismaUser } from '../factories/users-factory';
import userRepository from '@/repositories/user-repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import sessionRepository from '@/repositories/session-repository';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('signIn', () => {
  it('should throw InvalidCredentialError if there is no user for given email', async () => {
    const params = generateUserSignInParams();

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(null);
    jest.spyOn(sessionRepository, 'create').mockResolvedValueOnce(null);

    await expect(authenticationService.signIn(params)).rejects.toEqual(invalidCredentialsError());
    expect(userRepository.findByEmail).toHaveBeenCalledWith(params.email, { email: true, id: true, password: true });
    expect(sessionRepository.create).not.toHaveBeenCalled();
  });

  it('should throw InvalidCredentialError if given password is invalid', async () => {
    const params = generateUserSignInParams();
    const user = generatePrismaUser({ email: params.email });

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(user);
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);
    jest.spyOn(sessionRepository, 'create').mockResolvedValueOnce(null);

    await expect(authenticationService.signIn(params)).rejects.toEqual(invalidCredentialsError());
    expect(userRepository.findByEmail).toHaveBeenCalledWith(params.email, { email: true, id: true, password: true });
    expect(sessionRepository.create).not.toHaveBeenCalled();
  });

  it('should sign in user when credentials are valid', async () => {
    const params = generateUserSignInParams();
    const user = generatePrismaUser({ email: params.email });

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(user);
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => true);
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => 'token');
    jest.spyOn(sessionRepository, 'create').mockResolvedValueOnce(null);

    await expect(authenticationService.signIn(params)).resolves.not.toThrow();
    expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email, { email: true, id: true, password: true });
    expect(sessionRepository.create).toHaveBeenCalledWith({ token: 'token', userId: user.id });
  });
});
