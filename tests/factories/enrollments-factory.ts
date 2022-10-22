import faker from '@faker-js/faker';
import { generateCPF, getStates } from '@brazilian-utils/brazilian-utils';
import { User, Enrollment } from '@prisma/client';

import { createUser } from './users-factory';
import { prisma } from '@/config';

export async function createEnrollmentWithAddress(user?: User) {
  const incomingUser = user || (await createUser());

  return prisma.enrollment.create({
    data: {
      name: faker.name.findName(),
      cpf: generateCPF(),
      birthday: faker.date.past(),
      phone: faker.phone.phoneNumber('(##) 9####-####'),
      userId: incomingUser.id,
      Address: {
        create: {
          street: faker.address.streetName(),
          cep: faker.address.zipCode(),
          city: faker.address.city(),
          neighborhood: faker.address.city(),
          number: faker.datatype.number().toString(),
          state: faker.helpers.arrayElement(getStates()).name,
        },
      },
    },
    include: {
      Address: true,
    },
  });
}

export function generatePrismaEnrollment({ ...props }: Partial<Enrollment> = {}): Enrollment {
  return {
    id: parseInt(faker.random.numeric(), 10),
    birthday: new Date(),
    cpf: faker.random.word(),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: faker.name.firstName(),
    phone: faker.phone.phoneNumber(),
    userId: parseInt(faker.random.numeric(), 10),
    ...props,
  };
}
