import express from 'express';
import { deleteUser, getUser, subscribe, unsubscribe, updateUser, like, dislike } from '../controllers/user.control.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.get("/find/:id", getUser);

router.delete("/delete/:id", verifyToken, deleteUser)

router.put("/update/:id",verifyToken, updateUser);

router.put("/subscribe/:id", verifyToken, subscribe);

router.put('/unsubscribe/:id',verifyToken,unsubscribe);

router.put("/like/:videoId", verifyToken, like);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;