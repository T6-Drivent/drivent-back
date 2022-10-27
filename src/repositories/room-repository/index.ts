import { prisma } from '@/config';

async function getRoomsByHotel(id: number) {
  return await prisma.room.findMany({
    select: {
      id: true,
      number: true,
      size: true,
      RoomAvailability: {
        select: {
          id: true,
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

async function checkIfUserHasReservation(user: number) {
  return await prisma.roomAvailability.findFirst({
    where: {
      userId: user,
    },
  });
}

async function deleteRoomReservation(room: number) {
  return await prisma.roomAvailability.delete({
    where: {
      id: room,
    },
  });
}
async function createRoomReservation(user: number, hotel: number, room: number) {
  return await prisma.roomAvailability.create({
    data: {
      userId: user,
      roomId: room,
      hotelId: hotel,
    },
  });
}

export const roomRepository = {
  getRoomsByHotel,
  checkIfUserHasReservation,
  deleteRoomReservation,
  createRoomReservation,
};
