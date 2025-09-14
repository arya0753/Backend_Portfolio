import express from "express";
import multer from "multer";
import {
    createPost,
    deletePost,
    getPostById,
    getPosts,
    updatePost
} from "../Controllers/blogPostController.js";

const router = express.Router();

// ✅ Multer storage with timestamped filenames
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ CRUD routes
router.post("/posts", upload.single("photo"), createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/update/:id", updatePost);
router.delete("/posts/delete/:id", deletePost);

export default router;
