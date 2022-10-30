import { notFoundError } from '@/errors';
import { roomRepository } from '@/repositories/room-repository';
import { RoomsWithReservations } from '@/types/room-types';
import { sanitizeRoomListByUserId } from '@/utils/prisma-sanitize';

async function ensureThatRoomExists(room: number) {
  const response = await roomRepository.checkExistance(room);
  if (!response) throw notFoundError();
}

async function retrieveRoomsByHotel(hotel: number, user: number) {
  const roomsList: RoomsWithReservations = await roomRepository.getRooms(hotel);
  const sanitizedList = sanitizeRoomListByUserId(roomsList, user);
  console.log(sanitizedList);
  return sanitizedList;
}

export const roomService = {
  validateRoom: ensureThatRoomExists,
  getRooms: retrieveRoomsByHotel,
};
