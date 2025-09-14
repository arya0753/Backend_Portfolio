import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectionDB } from "./connection.js";
import blogPostRoutes from "./Routes/blogPostRoutes.js";
import ContactForm from "./Routes/ContactForm.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// ✅ Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-portfolio-ebon.vercel.app" // fixed typo
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (!allowedOrigins.includes(origin)) {
        return callback(new Error("CORS policy: Not allowed."), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Connect DB
connectionDB();

// ✅ Serve static uploads
app.use("/uploads", express.static(uploadDir));

// ✅ Routes
app.use("/api", blogPostRoutes);
app.use("/api/postContact", ContactForm);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
});
