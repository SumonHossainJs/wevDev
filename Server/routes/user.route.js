import express from 'express';
import { deleteUser, getUser, subscribe, unsubscribe, updateUser } from '../controllers/user.control.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.get("/find/:id", getUser);

router.delete("/delete/:id", verifyToken, deleteUser)

router.put("/update/:id",verifyToken, updateUser);

router.put("/subscribe/:id", verifyToken, subscribe);

router.put('/unsubscribe/:id',verifyToken,unsubscribe);

export default router;