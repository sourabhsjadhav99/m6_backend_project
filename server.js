import express from "express";
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import("./src/config/db.js");
import usrRoute from "./src/routes/user.route.js"
import profileRoutes from "./src/routes/userProfile.route.js"
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()
const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user',usrRoute );
app.use('/api/profile', profileRoutes);


// Serve uploaded CVs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads/cvs', express.static(path.join(__dirname, 'uploads/cvs')));

const port = process.env.PORT || 5000


app.listen(port, () => console.log(`App listening on http://localhost:${port}!`));