import express from "express";

import { contactPost } from "../Controllers/ContactController.js";

const router = express.Router();

router.post("/", contactPost);

export default router;
