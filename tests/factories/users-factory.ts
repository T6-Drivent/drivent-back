import bcrypt from 'bcrypt';
import faker from '@faker-js/faker';
import { User } from '@prisma/client';
import { prisma } from '@/config';
import { SignInParams } from '@/services';

export async function createUser(params: Partial<User> = {}): Promise<User> {
  const incomingPassword = params.password || faker.internet.password(6);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}

export function generateUserSignInParams({ ...props }: Partial<SignInParams> = {}): SignInParams {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(20),
    ...props,
  };
}

export function generatePrismaUser({ ...props }: Partial<User> = {}): User {
  return {
    id: parseInt(faker.random.numeric(), 10),
    email: faker.internet.email(),
    password: faker.internet.password(20),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...props,
  };
}
