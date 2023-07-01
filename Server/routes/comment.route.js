import { createComment ,getComment,deleteComment} from "../controllers/comment.control.js";
import { verifyToken } from "../verifyToken.js";
import express from 'express';

const router = express.Router();

router.post("/", verifyToken, createComment)
router.delete("/:id", verifyToken, deleteComment)
router.get("/:videoId", getComment)

export default router;