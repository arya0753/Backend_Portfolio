import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";
import {
    createPost,
    deletePost,
    getPostById,
    getPosts,
    updatePost
} from "../Controllers/blogPostController.js";

const router = express.Router();

// ✅ Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ✅ Multer storage & filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// ✅ Multer file filter (only images)
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images are allowed"), false);
    }
    cb(null, true);
  },
});

// ✅ CRUD routes
router.post("/posts", upload.single("photo"), createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/update/:id", upload.single("photo"), updatePost);
router.delete("/posts/delete/:id", deletePost);

export default router;
