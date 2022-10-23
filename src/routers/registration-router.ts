import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createRegistrationSchema } from '../schemas/registration-schemas';
import { createRegistration, getRegistration } from '@/controllers/registration-controller';

const registrationRouter = Router();

registrationRouter.all('/*', authenticateToken);

registrationRouter.post('/', validateBody(createRegistrationSchema), createRegistration);
registrationRouter.get('/', getRegistration);

export { registrationRouter };
