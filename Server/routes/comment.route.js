import { createComment } from "../controllers/comment.control.js";
import { verifyToken } from "../verifyToken.js";
import express from 'express';

const router = express.Router();

router.use('/create_comment',verifyToken, createComment);

export default router;