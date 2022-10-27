import { prisma } from '@/config';

async function getRoomsByHotel(id: number) {
  return await prisma.room.findMany({
    select: {
      id: true,
      number: true,
      hotelId: true,
      size: true,
      Reservation: {
        select: {
          id: true,
          userId: true,
        },
        where: {
          hotelId: id,
        },
      },
    },
    where: {
      hotelId: id,
    },
  });
}

async function checkWithRoomExists(room: number) {
  return await prisma.room.findUnique({
    where: {
      id: room,
    },
  });
}

async function checkRoomCapacity(room: number) {
  return await prisma.room.findUnique({
    select: {
      size: true,
      Reservation: {
        select: {
          id: true,
        },
      },
    },
    where: {
      id: room,
    },
  });
}
export const roomRepository = {
  getRooms: getRoomsByHotel,
  checkExistance: checkWithRoomExists,
  checkCapacity: checkRoomCapacity,
};
