import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import { CreateRegistrationParams } from '../types/registration-types';
import { registrationService } from '../services/registration-service/index';
import httpStatus from 'http-status';

export async function createRegistration(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const reqData = req.body as CreateRegistrationParams;

  await registrationService.create({ ...reqData, userId });

  res.status(httpStatus.CREATED).send();
}
