import express from "express";
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';

import usrRoute from "./src/routes/user.route.js"
import profileRoutes from "./src/routes/userProfile.route.js"
import locationRoutes from "./src/routes/location.route.js"
import jobRoutes from "./src/routes/job.route.js"
import companyRoutes from "./src/routes/company.route.js"
import savedJobRoutes from "./src/routes/saveJob.route.js"
import applicationRoutes from "./src/routes/applyJob.route.js"

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()
const app = express();
// Middleware
app.use(express.json());
app.use(cookieParser());

app.use("/", express.static("Public"));
// Serve uploaded CVs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads/cvs', express.static(path.join(__dirname, 'uploads/cvs')));

// Routes
app.use('/api/user',usrRoute );
app.use('/api/profile', profileRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/save', savedJobRoutes);
app.use('/api/apply', applicationRoutes);



const port = process.env.PORT || 5000
import("./src/config/db.js");
app.listen(port, () => console.log(`App listening on http://localhost:${port}!`));