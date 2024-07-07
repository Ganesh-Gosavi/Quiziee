# Quiziee
 
Quiziee is a web application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack, featuring a quiz platform with state management handled by Redux. This repository contains both the frontend and backend code for Quiziee.     
   
Features
Create and Manage Quizzes: Easily create quizzes with multiple questions and manage them through an intuitive interface.
Take Quizzes and Receive Instant Feedback: Users can take quizzes and get instant feedback on their performance.
User Authentication and Authorization: Secure user authentication and authorization using JWT.
Dashboard for Quiz Statistics and User Management: Comprehensive dashboard to view quiz statistics and manage users.
Responsive Design: Optimized for both mobile and desktop devices.
Technologies Used
Frontend
React.js: JavaScript library for building user interfaces.
Redux: State management library for JavaScript apps.
Axios: Promise-based HTTP client for the browser and Node.js.
Tailwind CSS: Utility-first CSS framework for rapid UI development.
Netlify: Hosting service for web applications.
Backend
Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine.
Express.js: Web application framework for Node.js.
MongoDB Atlas: Cloud-hosted MongoDB service.
JWT (JSON Web Token): Standard for creating access tokens.
Render: Cloud platform for hosting web applications.
Getting Started
Prerequisites
Node.js
npm (Node Package Manager)
MongoDB Atlas account
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/quiziee.git
cd quiziee
Install dependencies:

bash
Copy code
# For the backend
cd backend
npm install

# For the frontend
cd ../frontend
npm install
Configuration
Backend:

Create a .env file in the backend directory and add the following environment variables:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
Frontend:

Create a .env file in the frontend directory and add the following environment variables:

env

REACT_APP_API_URL=http://localhost:5000
Running the Application
Start the backend server:

bash

cd backend
npm start
Start the frontend server:

bash

cd frontend
npm start
Open your browser and navigate to http://localhost:3000.

Deployment
Frontend
The frontend is hosted on Netlify. Follow the steps below to deploy:

Push your code to a GitHub repository.
Link your repository to Netlify.
Netlify will automatically build and deploy your frontend.
Backend
The backend is hosted on Render. Follow the steps below to deploy:

Push your code to a GitHub repository.
Link your repository to Render.
Render will automatically build and deploy your backend.
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB Atlas for database
  - JWT for authentication
  - Hosted on Render
