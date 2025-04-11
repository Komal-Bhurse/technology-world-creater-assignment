Technology World Creater 

Multi-User Registration System with Role-Based Access

Objective:
Design and build a backend system to support the registration and login of two types of users:

User Type 1: Service Center Partner (SCP)

User Type 2: Farmers (registered by SCP through their portal)

Background Example Use Case:
Service Center Partners (User 1) sign up and get access to their dashboard. Within their portal, they can
register Farmers (User 2) on their behalf. Farmers do not self-register.


Task Description:
1. User 1 (SCP) Registration & Login:


Create API endpoints for
SCP Registration (collect: Name, Email, Password, Phone
SCP Login (Email, Password)

On successful login, SCP receives an auth token (JWT or session-based).


2. SCP Portal Functionality:


After login, SCP can
Access a protected route /dashboar
Use an endpoint to register Farmers (User 2) from their account
Farmer details to collect: Name, Phone Number, Village Name, Crop Typ
Retrieve a list of all registered farmers linked to that SCP.


3. User Type 2 (Farmer)
Farmers do not login
Their records are only accessible and manageable through the SCP account that registered them.

Tech Requirements:
Backend Framework: Node.js with Express.j
Database: MongoDB (preferred) or any relational DB like MySQL/PostgreSQ
Authentication: JWT-base
Password Security: Use bcrypt or equivalent for hashing password
API Testing Tool: Postman or Swagger documentation (optional)
