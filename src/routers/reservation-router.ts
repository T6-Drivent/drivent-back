import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { reservationController } from '@/controllers/reservation-controller';
import { createReservationSchema } from '@/schemas/reservation-schema';

export const reservationRouter = Router();

reservationRouter
  .all('*', authenticateToken)
  .post('/', validateBody(createReservationSchema), reservationController.handleReservationCreation)
  .get('/', reservationController.handleReservationSearch);
