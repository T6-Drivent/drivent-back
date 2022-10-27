import { HotelWithReservation } from '@/types/reservation-types';
import { RoomsWithReservations } from '@/types/room-types';

export function sanitizeHotelWithReservation(data: HotelWithReservation) {
  let text = '';
  const customers = data.reservations.length;
  if (customers === 1) text = 'Somente você';
  else if (customers > 1) text = `Você e mais ${customers - 1} `;
  return {
    name: data.name,
    image: data.image,
    room: data.room,
    customers: text,
  };
}

export function sanitizeRoomListByUserId(data: RoomsWithReservations, user: number) {
  const rooms = data.map((room) => {
    return {
      id: room.id,
      hotelId: room.hotelId,
      number: room.number,
      size: room.size,
      reservations: room.Reservation.map((reservation) => {
        if (reservation.userId === user) return true;
        else return false;
      }),
    };
  });

  return rooms;
}
