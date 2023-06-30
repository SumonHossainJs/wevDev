import express from 'express';
import { addView, addvideo, deleteVideo, getVideo, Random, updateVdeo, sub, trend } from '../controllers/video.control.js';
import {verifyToken} from '../verifyToken.js';

const router = express.Router();

router.get('/random', Random)
router.get("/sub",verifyToken, sub)
router.get("/trend", trend)

router.post('/addvideo', verifyToken, addvideo);
router.put('/update/:id',verifyToken, updateVdeo);
router.delete("/delete/:id",verifyToken,deleteVideo);
router.get("/:id", getVideo);
router.put('/addview/:id', addView);




export default router;