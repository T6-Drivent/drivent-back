import Joi from 'joi';
import { CreateRegistrationParams } from '../types/registration-types';

export const createRegistrationSchema = Joi.object<CreateRegistrationParams>({
  charge: Joi.number().integer().greater(0).required(),
  type: Joi.string().valid('online', 'inPerson').required(),
});
