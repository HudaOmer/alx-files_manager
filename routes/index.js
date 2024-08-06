import { Router } from 'express';
import AppController from '../controllers/AppController';
// 2. First API one two

const router = Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

module.exports = router
