# Glassdoor clone backend Application

## Description

This project comprises the backend for a Glassdoor clone application, built with Express.js and MongoDB. It provides API endpoints for managing users, jobs, companies, locations, saved jobs, job applications, and user profiles.

## Prerequisites

- Node.js installed
- MongoDB installed locally or connection to a MongoDB instance

## Installation

1. Clone the repository:
   git clone https://github.com/sourabhsjadhav99/m6_backend_project.git
   cd m6_backend

2. Install dependencies:
   npm install

3. Environment Variables
   Create a .env file in the root directory with the following variables:
   PORT=<port-number>
   MONGODB_URL=<mongodb-url>
   JWT_SECRET=<jwt-secret>

4. starting app
   -npm start / npm run dev

## Folder Structure -MVC Folder structure

- Public/
  - cvs/
- src/
  - config/
  - controllers/
  - middlewares/
  - models/
  - routes/
- .gitignore
- package.json
- README.md
- server.js
- .env

## Features:

- **User Management:** Sign up, log in, log out functionalities with bcrypt password hashing and JWT authentication.
- **Job Management:** CRUD operations for jobs, including creation, retrieval, updating, and deletion.
- **Company Management:** CRUD operations for companies, with features for admins to manage company details.
- **Location Management:** API endpoints for managing job locations.
- **Saved Jobs:** Endpoints to save and delete jobs in user profiles.
- **Job Applications:** Functionality to apply for jobs and retrieve applied jobs.
- **Middleware:** Admin and authentication middleware for user role-based access control.

## Tech Stack:

- **Backend Framework:** Express.js
- **Database:** MongoDB
- **ORM/ODM:** Mongoose
- **Authentication:** JWT (JSON Web Tokens) with bcrypt for password hashing
- **Deployment:** Render.com

## Access the API endpoints:

Base URL: http://localhost:8000/api

### API Endpoints:

### User Routes:

- POST: /api/user/signup - create a new user
- POST: /api/user/signin - login the user
- POST: /api/user/signout - log out the user
- DELETE: /api/user/deleteuser/:id - delete the user

### profile Routes:

- POST: /api/profile - create a new profile
- GET: /api/profile - get all profiles
- GET: /api/profile/:id - get single profiles
- PATCH: /api/profile/:id - edit the profile
- DELETE: /api/profile/:id - delete the profile

### Location Routes:

- POST: /api/locations - create a new location
- GET: /api/locations - retrieve all jobs with optional query parameters for search.
- GET: /api/locations/locationsbyadmin - get all locations created by admin
- GET: /api/locations/:id - get single locations
- PATCH: /api/locations/:id - edit the location
- DELETE: /api/locations/:id - delete the location

### Company Routes:

- POST: /api/companies - create a new company
- GET: /api/companies - get all companies
- GET: /api/companies/companiesbyadmin - get all companies created by admin
- GET: /api/companies/:id - get single company
- PATCH: /api/companies/:id - edit the company
- DELETE: /api/companies/:id - delete the company

### Job Routes:

- POST: /api/jobs - create a new job
- GET: /api/jobs - retrieve all jobs with optional query parameters for search.
- GET: /api/jobs/jobsbyadmin - get all jobs created by admin
- GET: /api/jobs/:id - get single jobs
- PATCH: /api/jobs/:id - edit the job
- DELETE: /api/jobs/:id - delete the job

### Routes for saving jobs and delete saved jobs:

- POST: /api/save/:jobId -save a new job or delete saved job
- GET: /api/save - get all saved jobs

### Routes for apply jobs:

- POST: /api/apply/:jobId -apply for new job
- GET: /api/apply - get all applied jobs

## Deployment:

This application deployed on Render.com.
Deployment Link: https://m6-backend-project.onrender.com

## API Documentation:
Postman: Click on link https://documenter.getpostman.com/view/24020194/2sA3e1ApK1 and import the collection, and test

## Testing:

1. **Integration Testing**: Recommend using tools like Postman or Insomnia for API testing.

2. **Unit Testing**: Implemented unit tests using testing frameworks Jest.

- Test Structure
  The tests are organized into different files under the tests/ directory. Each test file corresponds to a specific module or functionality being tested.

- Running Tests:
  -npm test

## Contributors:

Sourabh Jadhav
