import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`;
  await prisma.$queryRaw`TRUNCATE TABLE events RESTART IDENTITY CASCADE;`;
  await prisma.$queryRaw`TRUNCATE TABLE enrollments RESTART IDENTITY CASCADE;`;
  await prisma.$queryRaw`TRUNCATE TABLE sessions RESTART IDENTITY CASCADE;`;
  await prisma.$queryRaw`TRUNCATE TABLE addresses RESTART IDENTITY CASCADE;`;
  await prisma.$queryRaw`TRUNCATE TABLE registrations RESTART IDENTITY CASCADE;`;
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}
