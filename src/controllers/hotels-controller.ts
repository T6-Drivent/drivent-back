import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import { hotelService } from '@/services/hotels-service';
import httpStatus from 'http-status';
import { registrationService } from '@/services';
import { reservationService } from '@/services/reservation-service';

async function getHotelsAndTheirInfo(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { preference } = req.query;
  await registrationService.validate(userId);
  const reservation = await reservationService.validateUserReservation(userId, 'changeRoom');
  if (reservation && preference == 'false') {
    const userReservationInfo = await hotelService.gatherUserHotelReservation(reservation.hotelId, reservation.roomId);
    console.log(userReservationInfo)
    return res.status(httpStatus.OK).send(userReservationInfo);
  }
  const hotelList = await hotelService.gatherHotelsAndTheirInfo();

  return res.status(httpStatus.OK).send(hotelList);
}

export const hotelController = {
  getHotelsAndTheirInfo,
};
