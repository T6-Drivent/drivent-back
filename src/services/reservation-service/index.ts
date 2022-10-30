import { conflictError } from '@/errors';
import { reservationRepository } from '@/repositories/reservation-repository';
import { roomRepository } from '@/repositories/room-repository';

async function checkIfUserHasReservation(user: number, method: string) {
  const response = await reservationRepository.validateUser(user);
  if (method === 'hotel-render' && response) return response;
  if (response) throw conflictError(`You already have a reservation`);
}
async function createReservation(user: number, hotel: number, room: number) {
  const reservation = await reservationRepository.create(user, hotel, room);
  return reservation;
}
async function validateRoomCapacity(room: number) {
  const response = await roomRepository.checkCapacity(room);
  if (response.size - response.Reservation.length === 0) throw conflictError('This room is full');
}
async function validateIfRoomBelongsToHotel(hotel: number, room: number) {
  const response = await roomRepository.checkIfRoomBelongsToHotel(hotel, room);
  if (!response) throw conflictError(`This room doesn't belong to this hotel `);
}
export const reservationService = {
  validateUserReservation: checkIfUserHasReservation,
  createReservation,
  validateRoomCapacity,
  validateIfRoomBelongsToHotel,
};
