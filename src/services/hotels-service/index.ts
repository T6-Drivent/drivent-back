import { hotelRepository } from '@/repositories/hotel-repository';
import { HotelWithReservation } from '@/types/reservation-types';
import { sanitizeHotelWithReservation } from '@/utils/prisma-sanitize';

async function getHotels() {
  return await hotelRepository.findAll();
}

async function getInfosByHotelId(id: number) {
  return await hotelRepository.sumVacancyRelatedToHotel(id);
}

async function gatherHotelsAndTheirInfo() {
  const hotels = await getHotels();
  const infos = Promise.all(
    hotels.map(async (e) => {
      const info = await getInfosByHotelId(e.id);
      return { ...e, vacancy: info };
    }),
  );
  return infos;
}

async function gatherUserHotelReservation(hotel: number, room: number) {
  const userReservationInfo: HotelWithReservation = await hotelRepository.findById(hotel, room);
  const sanitizedData = sanitizeHotelWithReservation(userReservationInfo);
  return sanitizedData;
}

export const hotelService = {
  gatherHotelsAndTheirInfo,
  gatherUserHotelReservation,
};
