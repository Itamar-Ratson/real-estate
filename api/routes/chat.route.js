import express from 'express';
import { geChats, getChat, addChat, readChat } from '../controllers/chat.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, geChats);
router.get('/:id', verifyToken, getChat);
router.post('/', verifyToken, addChat);
router.put('/read/:id', verifyToken, readChat);

export default router;
