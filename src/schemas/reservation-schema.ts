import Joi from 'joi';
import { CreateReservation } from '@/types/reservation-types';

export const createReservationSchema = Joi.object<CreateReservation>({
  hotelId: Joi.number().integer().greater(0).required(),
  roomId: Joi.number().integer().greater(0).required(),
});
