import { hotelRepository } from '@/repositories/hotel-repository';

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
export const hotelService = {
  gatherHotelsAndTheirInfo,
};
