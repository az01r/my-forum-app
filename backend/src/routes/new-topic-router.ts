import { Router } from 'express';
import { createTopicValidation } from '../util/validators.ts';
import { validateRequest } from '../controllers/validation-controller.ts';
import { saveTopic } from '../controllers/topic-controller.ts';

const router = Router();

router.put("/", createTopicValidation, validateRequest, saveTopic);

export default router;