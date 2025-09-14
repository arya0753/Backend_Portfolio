import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectionDB } from "./connection.js";
import blogPostRoutes from "./Routes/blogPostRoutes.js";
import ContactForm from "./Routes/ContactForm.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// ✅ Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://your-frontend.onrender.com" // replace with your Render frontend URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman/curl
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "CORS policy: This origin is not allowed.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  })
);

app.use(express.json());

// ✅ DB Connection
connectionDB();

// ✅ Static file serving
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ Routes
app.use("/api", blogPostRoutes);
app.use("/api/postContact", ContactForm);

// ✅ Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT: ${PORT}`);
});
