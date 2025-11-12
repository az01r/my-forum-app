import { Router } from 'express';
import { loadTopics } from '../controllers/topic-controller.ts';

const router = Router();

router.get("/", loadTopics);

export default router;