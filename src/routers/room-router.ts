import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { roomController } from '@/controllers/room-controller';

export const roomRouter = Router();

roomRouter.all('*', authenticateToken).get('/', roomController.handleRoomSearchByHotel);
