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
    const array = [];
    for (let i = 0; i < room.size; i++) {
      const subject = room.Reservation[i];
      if (subject) {
        if (subject.userId !== user) array.push(true);
        else array.push('you');
      } else {
        array.push(false);
      }
    }
    return {
      id: room.id,
      hotelId: room.hotelId,
      number: room.number,
      reservations: array.reverse(),
    };
  });

  return rooms;
}
