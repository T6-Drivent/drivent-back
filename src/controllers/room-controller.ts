import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import { roomService } from '@/services/rooms-service';
import { registrationService } from '@/services';

async function handleRoomSearchByHotel(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.query;

  await registrationService.validate(userId);
  const roomsList = await roomService.getRooms(Number(hotelId), userId);
  return res.status(200).send(roomsList);
}

export const roomController = {
  handleRoomSearchByHotel,
};
