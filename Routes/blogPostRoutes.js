import express from 'express';

import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
    
} from '../Controllers/blogPostController.js'
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();
router.post("/posts", upload.single("photo"), createPost);

router.get('/posts',getPosts)
router.get('/posts/:id' ,getPostById)
router.put('/posts/update/:id' ,updatePost)
router.delete('/posts/delete/:id' ,deletePost)

export default router;