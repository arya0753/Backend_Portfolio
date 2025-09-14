import express, { application } from 'express'
import { connectionDB } from './connection.js'
import blogPostRoutes from './Routes/blogPostRoutes.js'
import cors from "cors";
import ContactForm from './Routes/ContactForm.js'
import dotenv from 'dotenv'

import { fileURLToPath } from "url";
import path from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(cors());
app.use(express.json());
dotenv.config()


const PORT = process.env.PORT;

connectionDB();

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use('/api',blogPostRoutes);

app.use('/api/postContact',ContactForm);


app.listen(PORT,()=>{
    console.log(`Port is started on PORT:${PORT}`);
    
})