import { Router } from 'express';
import { loadTopics } from '../controllers/topic-controller.js';
import { loadTopicMessages, createTopicMessage } from '../controllers/message-controller.js';
import { isAuth } from '../controllers/auth-controller.js';
import { validateRequest } from '../controllers/validation-controller.js';
import { sendMessageValidation } from '../util/validators.js';

const router = Router();

router.get("/", loadTopics);
router.get("/:topicId", loadTopicMessages);
router.post("/:topicId/new", isAuth, sendMessageValidation, validateRequest, createTopicMessage);

export default router;