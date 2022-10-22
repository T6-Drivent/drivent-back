import { prisma } from '@/config';
import { Prisma, User } from '@prisma/client';

export interface UserRepository {
  create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
  findByEmail(email: string, select?: Prisma.UserSelect): Promise<User>;
  findById(id: number): Promise<User | null>;
}

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function findById(id: number): Promise<User | null> {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

const userRepository: UserRepository = {
  findByEmail,
  create,
  findById,
};

export default userRepository;
