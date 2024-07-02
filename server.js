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
import("./src/config/db.js");
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config()
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Serve static files from the "Public" directory
app.use("/", express.static("Public"));

// Serve uploaded CVs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads/cvs', express.static(path.join(__dirname, 'uploads/cvs')));

// Define API routes
app.use('/api/user',usrRoute ); // User management endpoints
app.use('/api/profile', profileRoutes); // User management endpoints
app.use('/api/locations', locationRoutes); // Location endpoints
app.use('/api/jobs', jobRoutes); // Job management endpoints
app.use('/api/companies', companyRoutes);  // Company management endpoints
app.use('/api/save', savedJobRoutes); // Saved job endpoints
app.use('/api/apply', applicationRoutes); // Job application endpoints



// Start the server
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`App listening on http://localhost:${port}!`));