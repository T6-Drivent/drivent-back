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
  } = await prisma.reservation.aggregate({
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

async function findById(hotel: number, room: number) {
  const response = await prisma.hotel.findUnique({
    select: {
      name: true,
      image: true,
      Room: {
        select: {
          number: true,
          type: true,
          Reservation: {
            select: {
              userId: true,
            },
            where: {
              roomId: room,
            },
          },
        },
        where: {
          id: room,
        },
      },
    },
    where: {
      id: hotel,
    },
  });

  return {
    name: response.name,
    image: response.image,
    room: `${response.Room[0].number} (${response.Room[0].type})`,
    reservations: response.Room[0].Reservation,
  };
}

export const hotelRepository = {
  findAll: findAll,
  sumVacancyRelatedToHotel: sumVacancyRelatedToHotel,
  findById,
};
