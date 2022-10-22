import { cannotEnrollBeforeStartDateError } from '@/errors';
import userRepository from '@/repositories/user-repository';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import eventsService from '../events-service';
import { duplicatedEmailError, userNotFoundError } from './errors';

export interface UserService {
  createUser({ email, password }: CreateUserParams): Promise<User>;
  validateByIdOrFail(id: number): Promise<User>;
}

export async function createUser({ email, password }: CreateUserParams): Promise<User> {
  await canEnrollOrFail();

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

async function validateUserByIdOrFail(id: number) {
  const user = await userRepository.findById(id);

  if (!user) {
    throw userNotFoundError();
  }

  return user;
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);

  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function canEnrollOrFail() {
  const canEnroll = await eventsService.isCurrentEventActive();
  if (!canEnroll) {
    throw cannotEnrollBeforeStartDateError();
  }
}

export type CreateUserParams = Pick<User, 'email' | 'password'>;

const userService: UserService = {
  createUser,
  validateByIdOrFail: validateUserByIdOrFail,
};

export * from './errors';
export default userService;
