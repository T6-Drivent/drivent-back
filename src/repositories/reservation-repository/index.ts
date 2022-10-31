import { prisma } from '@/config';

async function checkIfUserHasReservation(user: number) {
  return await prisma.reservation.findFirst({
    where: {
      userId: user,
    },
  });
}

async function deleteRoomReservation(user: number) {
  return await prisma.reservation.delete({
    where: {
      userId: user,
    },
  });
}
async function createRoomReservation(user: number, hotel: number, room: number) {
  return await prisma.reservation.create({
    data: {
      userId: user,
      roomId: room,
      hotelId: hotel,
    },
  });
}

export const reservationRepository = {
  validateUser: checkIfUserHasReservation,
  delete: deleteRoomReservation,
  create: createRoomReservation,
};
