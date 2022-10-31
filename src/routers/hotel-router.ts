import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { hotelController } from '@/controllers/hotels-controller';

const hotelRouter = Router();

hotelRouter.all('/*', authenticateToken);

hotelRouter.get('/', hotelController.getHotelsAndTheirInfo);

export { hotelRouter };
