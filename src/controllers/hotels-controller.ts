import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import { hotelService } from '@/services/hotels-service';
import httpStatus from 'http-status';
import { registrationService } from '@/services';

async function getHotelsAndTheirInfo(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  await registrationService.validate(userId);
  const hotelList = await hotelService.gatherHotelsAndTheirInfo();

  return res.status(httpStatus.OK).send(hotelList);
}

export const hotelController = {
  getHotelsAndTheirInfo,
};
