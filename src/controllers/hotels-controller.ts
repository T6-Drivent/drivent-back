import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import { hotelService } from '@/services/hotels-service';
import httpStatus from 'http-status';
import { registrationService } from '@/services';
import { reservationService } from '@/services/reservation-service';

async function getHotelsAndTheirInfo(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  await registrationService.validate(userId);
  const reservation = await reservationService.validateUserReservation(userId, 'hotel-render');
  if (reservation) {
    const userReservationInfo = await hotelService.gatherUserHotelReservation(reservation.hotelId, reservation.roomId);
    return res.status(httpStatus.OK).send(userReservationInfo);
  }
  const hotelList = await hotelService.gatherHotelsAndTheirInfo();

  return res.status(httpStatus.OK).send(hotelList);
}

export const hotelController = {
  getHotelsAndTheirInfo,
};