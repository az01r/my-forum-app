import { Router } from 'express';
import { createTopicValidation } from '../util/validators.ts';
import { validateRequest } from '../controllers/validation-controller.ts';
import { loadTopics, saveTopic } from '../controllers/topic-controller.ts';

const router = Router();

router.get("/", loadTopics);

router.put("/new", createTopicValidation, validateRequest, saveTopic);

export default router;