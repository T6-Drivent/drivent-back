import { Router } from 'express';
import { getDefaultEvent, getEventPrices } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const eventsRouter = Router();

eventsRouter.get('/', getDefaultEvent);
eventsRouter.get('/prices', authenticateToken, getEventPrices);

export { eventsRouter };
