import { Router } from 'express';
import { loadTopics } from '../controllers/topic-controller.ts';
import { loadTopicMessages, createTopicMessage } from '../controllers/message-controller.ts';
import { isAuth } from '../controllers/auth-controller.ts';

const router = Router();

router.get("/", loadTopics);
router.get("/:topicId", loadTopicMessages);
router.post("/:topicId/new", isAuth, createTopicMessage);

export default router;