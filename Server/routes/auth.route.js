import express from 'express';
import { signup,signIn,googleAuth } from '../controllers/auth.control.js';

const router = express.Router();


router.post("/signup", signup);

router.post("/signin", signIn);

router.post('/google', googleAuth)

export default router;