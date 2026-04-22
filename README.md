# Campus Issue Reporting System
(MERN Stack Student Project – Technical Documentation)

# 1. Introduction
# 1.1 Purpose
This document defines the complete technical design and development guidelines for the Campus Issue Reporting System.
The system provides a centralized digital platform where students and staff can report campus-related issues such as:
--Cleanliness problems
--Water supply issues
--Electrical faults
--Internet connectivity problems
--Infrastructure damages
The goal is to replace slow manual complaint systems with a transparent, trackable, and efficient digital solution.

# 1.2 Target Audience
--Students
--Faculty & Staff
--Campus Maintenance Teams
--Developers learning MERN stack

# 1.3 Learning Outcomes
--JWT-based Authentication
--Role-Based Access Control (RBAC)
--REST API Design
--MongoDB Schema Design
--Email Notifications
--Full-stack MERN architecture
--Git & GitHub workflow

# 2. System Overview
# 2.1 User Roles
Role                                                                          Description
Student                                                                 Reports issues and tracks status
Staff                                                                   Reports issues
Admin                                                                   Manages issues & assigns to departments
Maintenance Team                                                        Resolves assigned issues
# 2.2 Core Features
--User Registration & Login (JWT Auth)
--Raise New Issue
--Upload Image Evidence
--Track Issue Status
--Admin Dashboard
--Assign Issues to Departments
--Email Notification on Status Update
--Issue History Tracking

# 3. Technologies Used
Frontend
--React.js
--Material UI
--Axios
--React Router
      Backend
--Node.js
--Express.js
     Database
--MongoDB Atlas
--Mongoose ODM
    Authentication
--JWT-based Authentication
   Notifications
--Email Alerts (Nodemailer)
   Version Control
--Git & GitHub

# 4. High-Level Architecture

[ React Frontend ]
         |
         |---- REST API ----
         |
[ Node.js + Express Backend]
     [ MongoDB Atlas ]

# 5. Database Design
# 5.1 Database
MongoDB Atlas
Mongoose ODM

# 5.2 Collections
# 5.2.1 Users Collection
Copy code
Json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "password": "string (hashed)",
  "role": "student | staff | admin | maintenance",
  "department": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
Indexes:
--email (unique)
# 5.2.2 Issues Collection
Json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "category": "Electrical | Water | Internet | Cleanliness | Infrastructure",
  "location": "string",
  "imageUrl": "string",
  "status": "Pending | In Progress | Resolved | Rejected",
  "reportedBy": "ObjectId (ref: users)",
  "assignedTo": "ObjectId (ref: users)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
Indexes:
--reportedBy
--status
--category

# 6. Backend Design (Node.js + Express)
# 6.1 Folder Structure
backend/
│── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   └── app.js
│── .env
│── package.json

# 6.2 Authentication Flow
--User registers/logs in
--Password is hashed (bcrypt)
--JWT token is generated
--Token is sent to frontend
--Protected routes verify token

# 6.3 API Endpoints
Auth APIs
Method                                            Endpoint                                           Description
POST                                           /api/auth/register                                   Register user
POST                                           /api/auth/login                                       Login user

# Issue APIs
Method                                           Endpoint                                              Description
POST                                            /api/issues                                            Create new issue
GET                                             /api/issues                                            Get all issues (Admin)
GET                                             /api/issues/my                                         Get my reported issues
PUT                                             /api/issues/:id                                        Update issue status
DELETE                                          /api/issues/:id                                        Delete issue

# 7. Role-Based Access Control
--Students → Create & track issues
--Admin → View all issues, assign issues
--Maintenance → Update status
--Middleware checks role before route access

# 8. Frontend – React
# 8.1 Folder Structure
src/
├── components/
├── pages/
├── context/
├── services/
├── utils/
└── App.jsx

# 8.2 Key Pages
--Login Page
--Register Page
--Dashboard
--Raise Issue Page
--My Issues Page
--Admin Dashboard
--Issue Details Page

# 9. Email Notification System
Using Nodemailer:
--When issue status changes
--User receives email notification
--Admin receives notification for new issue

# 10. Security Considerations
--JWT Authentication
--Password Hashing (bcrypt)
--Role-based authorization
--Input validation (Joi / Express-validator)
--Secure environment variables

# 11. Future Enhancements
--SMS Notifications
--Real-time updates using Socket.io
--Analytics Dashboard
--Mobile App version
--Department-based filtering
--Priority-based issue escalation

# 12. Conclusion
The Campus Issue Reporting System is a real-world MERN stack project that demonstrates:
--Full-stack development
--Authentication & Authorization
--Database schema design
--API development
--Cloud database integration
--Email notification system
--It improves campus transparency and efficiency by digitizing the issue reporting process.
