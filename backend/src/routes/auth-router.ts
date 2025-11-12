import { Router } from 'express';

import { login, signup } from '../controllers/auth-controller.ts';
import { loginValidation, signupValidation } from '../util/validators.ts';
import { validateRequest } from '../controllers/validation-controller.ts';

const router = Router();

router.post('/signup', signupValidation, validateRequest, signup);

router.post('/login', loginValidation, validateRequest, login);

export default router;