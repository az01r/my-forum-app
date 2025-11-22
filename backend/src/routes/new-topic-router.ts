import { Router } from 'express';
import { createTopicValidation } from '../util/validators.js';
import { validateRequest } from '../controllers/validation-controller.js';
import { saveTopic } from '../controllers/topic-controller.js';

const router = Router();

router.put("/", createTopicValidation, validateRequest, saveTopic);

export default router;