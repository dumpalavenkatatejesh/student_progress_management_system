# Student Progress Management System

This is a MERN stack web application to manage student profiles and track their Codeforces competitive programming progress.

---

## Features

- View a list of students with details like name, email, phone, Codeforces handle, current rating, and max rating.
- Add, update, and delete student profiles.
- Fetch and sync Codeforces data automatically.
- Download student data as a CSV file.
- Responsive UI built with React.
- Backend API using Express and MongoDB.

---

## Technologies Used

- **Frontend:** React.js, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Others:** dotenv (for environment variables), CORS, cron (for scheduled tasks)

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally or accessible via connection string
- Git installed

### Installation

**1. Clone the repository:**

**bash**
git clone https://github.com/yourusername/student-progress-management.git
cd student-progress-management

**Backend Setup:**
**bash**
cd backend
npm install

**Create a .env file in the backend folder with the following**

PORT=5000

MONGO_URI=mongodb://localhost:27017/student-progress-management-system

EMAIL_USER=your_email@example.com

EMAIL_PASS=your_email_password

Start MongoDB server if not already running.



**Run the backend server**

npm start
The backend server should now run on http://localhost:5000.

**Frontend Setup**
Open a new terminal and navigate to the frontend folder:

cd ../frontend
npm install

**Start the React development server:**

npm start
The frontend app will open at http://localhost:3000.

**API Endpoints**


GET /api/students — Get all students

GET /api/students/:id — Get a student by ID

POST /api/students — Add new student

PUT /api/students/:id — Update student

DELETE /api/students/:id — Delete student

PUT /api/students/:id/handle — Update Codeforces handle and sync data

**Project Structure**


backend/
  ├── models/          # Mongoose models (Student schema)
  ├── routes/          # Express route handlers
  ├── utils/           # Utility functions (e.g., Codeforces API fetcher)
  ├── cron/            # Scheduled tasks
  ├── server.js        # Backend entry point
  └── .env             # Environment variables

frontend/
  ├── src/
      ├── components/  # React components (e.g., StudentTable)
      ├── App.js       # Main React app
      └── index.js     # React entry point
  └── package.json

**###How it Works**
Frontend React app calls backend API using Axios.

Backend API fetches/stores data in MongoDB using Mongoose.

When a student with a Codeforces handle is added or updated, backend fetches latest rating data from Codeforces API.

Data is displayed in a table with options to view, delete, and download as CSV.

**Troubleshooting**
Make sure MongoDB is running and accessible.

Check .env file for correct MONGO_URI and port.

If API requests fail, verify backend server is running and CORS is enabled.

Use browser DevTools Network tab to debug frontend API calls.
