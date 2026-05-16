
# University Laptop Reservation System

## Project Overview
This project is a backend REST API built using Node.js, Express, and MongoDB.

The system helps a university manage:
- Student registration and login
- Laptop management
- Laptop reservations
- Reservation approval/rejection

The project uses:
- Express.js for server creation
- MongoDB with Mongoose for database management
- JWT for authentication
- bcryptjs for password hashing
- Role-based authorization

---

# Project Structure

```text
university-laptop-system/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── laptopController.js
│   └── reservationController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Laptop.js
│   └── Reservation.js
│
├── routes/
│   ├── authRoutes.js
│   ├── laptopRoutes.js
│   └── reservationRoutes.js
│
├── server.js
├── package.json
└── .env
```

---

# Step-by-Step Flow of the System

# Step 1 – Server Starts

File:
```js
server.js
```

What happens:
1. Express server is created
2. Environment variables are loaded using dotenv
3. MongoDB connection is established
4. API routes are registered
5. Server listens on PORT 5000

Main APIs:
- /api/auth
- /api/laptops
- /api/reservations

---

# Step 2 – Database Connection

File:
```js
config/db.js
```

Purpose:
- Connects Node.js application with MongoDB using Mongoose.

Why important:
- Without database connection, no data can be stored.

---

# Step 3 – User Registration

API:
```http
POST /api/auth/register
```

Controller:
```js
authController.js
```

Process:
1. User sends:
   - name
   - email
   - password

2. System checks:
   - Is password provided?
   - Does user already exist?

3. Password is encrypted using bcrypt

4. User is saved in MongoDB

5. Default role assigned:
```text
student
```

Response:
```json
{
  "message": "Student registered successfully"
}
```

---

# Step 4 – User Login

API:
```http
POST /api/auth/login
```

Process:
1. User enters email and password
2. System searches user in database
3. bcrypt compares passwords
4. JWT token is generated
5. Token returned to user

Example response:
```json
{
  "token": "JWT_TOKEN"
}
```

Purpose of JWT:
- Used for authentication
- Protects private routes

---

# Step 5 – Authentication Middleware

File:
```js
middleware/authMiddleware.js
```

Purpose:
- Verifies JWT token
- Checks if user is logged in

Flow:
1. Token read from request header
2. JWT verified
3. User data attached to request object

If invalid:
```text
Access denied
```

---

# Step 6 – Role Middleware

File:
```js
middleware/roleMiddleware.js
```

Purpose:
- Checks user role

Roles:
- admin
- student

Example:
- Only admin can add laptops
- Only students can reserve laptops

---

# Step 7 – Laptop Management

Controller:
```js
laptopController.js
```

Routes:
```http
GET    /api/laptops
POST   /api/laptops
PUT    /api/laptops/:id
DELETE /api/laptops/:id
```

Features:
- Add laptop
- View laptops
- Update laptop
- Delete laptop

Important:
Only admin can:
- add
- update
- delete

Everyone can:
- view laptops

---

# Step 8 – Reservation System

Controller:
```js
reservationController.js
```

## Creating Reservation

API:
```http
POST /api/reservations
```

Flow:
1. Student selects laptop
2. System checks:
   - Does laptop exist?
   - Is laptop available?

3. Reservation created
4. Laptop status becomes:
```text
reserved
```

---

# Step 9 – View Reservations

Student API:
```http
GET /api/reservations/my
```

Admin API:
```http
GET /api/reservations
```

Student:
- sees only own reservations

Admin:
- sees all reservations

---

# Step 10 – Approve or Reject Reservation

Approve:
```http
PUT /api/reservations/:id/approve
```

Reject:
```http
PUT /api/reservations/:id/reject
```

When approved:
```text
Laptop status -> borrowed
Reservation status -> approved
```

When rejected:
```text
Laptop status -> available
Reservation status -> rejected
```

---

# Database Models

## User Model
Stores:
- name
- email
- password
- role

## Laptop Model
Stores:
- asset tag
- brand
- model
- serial number
- status
- location

## Reservation Model
Stores:
- student
- laptop
- borrow date
- return date
- reservation status

---

# Complete System Workflow

```text
Student Registers
        ↓
Student Logs In
        ↓
JWT Token Generated
        ↓
Student Views Laptops
        ↓
Student Reserves Laptop
        ↓
Laptop Status = reserved
        ↓
Admin Reviews Reservation
        ↓
Approved or Rejected
        ↓
Laptop Status Updated
```

---

# Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variables |
| Nodemon | Development server |

---

# Important Security Features

## Password Hashing
Passwords are encrypted using bcrypt.

## JWT Authentication
Only authenticated users can access protected routes.

## Role Authorization
Different access levels:
- Admin
- Student

---

# How to Run the Project

## 1. Install dependencies

```bash
npm install
```

## 2. Create .env file

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

## 3. Start server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

---

# API Summary

## Authentication
- POST /api/auth/register
- POST /api/auth/login

## Laptop APIs
- GET /api/laptops
- POST /api/laptops
- PUT /api/laptops/:id
- DELETE /api/laptops/:id

## Reservation APIs
- POST /api/reservations
- GET /api/reservations/my
- GET /api/reservations
- PUT /api/reservations/:id/approve
- PUT /api/reservations/:id/reject

---

# Conclusion

This project demonstrates:
- REST API development
- Authentication using JWT
- Role-based authorization
- MongoDB integration
- CRUD operations
- Reservation workflow management


