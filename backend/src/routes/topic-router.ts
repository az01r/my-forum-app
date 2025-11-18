import { Router } from 'express';
import { loadTopics } from '../controllers/topic-controller.ts';
import { loadTopicMessages, createTopicMessage } from '../controllers/message-controller.ts';
import { isAuth } from '../controllers/auth-controller.ts';
import { validateRequest } from '../controllers/validation-controller.ts';
import { sendMessageValidation } from '../util/validators.ts';

const router = Router();

router.get("/", loadTopics);
router.get("/:topicId", loadTopicMessages);
router.post("/:topicId/new", isAuth, sendMessageValidation, validateRequest, createTopicMessage);

export default router;