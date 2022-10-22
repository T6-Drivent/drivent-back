import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { validateBody } from '../middlewares/validation-middleware';
import { createRegistrationSchema } from '../schemas/registration-schemas';
import { createRegistration } from '@/controllers/registration-controller';

const registrationRouter = Router();

registrationRouter.all('/*', authenticateToken);

registrationRouter.post('/', validateBody(createRegistrationSchema), createRegistration);

export { registrationRouter };
