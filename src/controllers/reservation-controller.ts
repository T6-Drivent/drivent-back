import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import { registrationService } from '@/services';
import { reservationService } from '@/services/reservation-service';

async function handleReservationCreation(req: AuthenticatedRequest, res: Response) {
  const { userId, body } = req;
  await registrationService.validate(userId);
  await reservationService.validateUserReservation(userId, '');
  await reservationService.validateRoomCapacity(body.roomId);
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
