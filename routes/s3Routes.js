import express from 'express';
import uploadMiddleWare from '../middleware/fileUpload.js';
import s3Controller from '../controller/s3Controller.js';


const router = express.Router();

// Use middleware directly in the route
// uploadMiddleWare.array('file', 5)
router.post('/upload', uploadMiddleWare.single('file'), s3Controller.fileUpload);
// router.post('/create-post', uploadMiddleWare.array('file', 5), s3Controller.createPost);
router.post('/create-post', uploadMiddleWare.fields([
    { name: 'file', maxCount: 5 }, // Media files (images/videos)
    { name: 'thumbnail', maxCount: 1 } // Thumbnail for videos
]), s3Controller.createPost);

export default router;
