import { prisma } from '@/config';

async function findAll() {
  return await prisma.hotel.findMany({
    select: {
      id: true,
      name: true,
      commodations: true,
    },
  });
}

async function sumVacancyRelatedToHotel(id: number) {
  const {
    _sum: { size: maxCapacity },
  } = await prisma.room.aggregate({
    _sum: {
      size: true,
    },
    where: {
      hotelId: id,
    },
  });

  const {
    _sum: { hotelId: filled },
  } = await prisma.roomAvailability.aggregate({
    _sum: {
      hotelId: true,
    },
    where: {
      hotelId: id,
    },
  });
  const occupied = filled || 0;
  const available = maxCapacity - occupied;

  return available;
}

export const hotelRepository = {
  findAll: findAll,
  sumVacancyRelatedToHotel: sumVacancyRelatedToHotel,
};
