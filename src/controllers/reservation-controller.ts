import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import { registrationService } from '@/services';
import { reservationService } from '@/services/reservation-service';

async function handleReservationCreation(req: AuthenticatedRequest, res: Response) {
  const { userId, body } = req;
  const { method } = req.query;

  await registrationService.validate(userId);
  const response = await reservationService.validateUserReservation(userId, method);
  if (response) await reservationService.deleteUserReservation(userId);
  await reservationService.validateRoomCapacity(body.roomId);
  await reservationService.validateIfRoomBelongsToHotel(body.hotelId, body.roomId);
  const reservation = await reservationService.createReservation(userId, body.hotelId, body.roomId);
  return res.status(200).send(reservation);
}

async function handleReservationSearch(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  await registrationService.validate(userId);
  return res.status(200).send(userId);
}

export const reservationController = {
  handleReservationCreation,
  handleReservationSearch,
};
