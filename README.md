Employee Attendance API

Description

This is a simple Employee/Faculty Attendance API built using Node.js and Express.

Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- JWT (Authentication)
- bcryptjs (Password hashing)
- dotenv

Features

- Faculty Registration
- Faculty Login (JWT Token)
- Protected Routes using Middleware
- Mark Attendance
- Get Today Attendance
- Get Attendance by Date

How to Run

1. Install dependencies:

npm install

2. Create a ".env" file:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret

3. Run server:

node server.js

API Endpoints

- POST "/register" → Register Faculty
- POST "/login" → Login & Get Token
- POST "/attendance" → Mark Attendance
- GET "/attendance/today" → Today Attendance
- GET "/attendance/:date" → Date-wise Attendance

Note

.env file is not included for security reasons.

👤 Author

Dinesh