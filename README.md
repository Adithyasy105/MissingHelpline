MissingHelpline
A Community-Driven Missing Persons Reporting & Help System built with Node.js, Express, Sequelize, SQL, and React.

🧭 Table of Contents
Overview

Features

Tech Stack

Getting Started

Prerequisites

Installation

Environment Variables

Database Setup

Running the App

Usage

Contributing

License

Contact

📝 Overview
MissingHelpline is a full-stack application designed to create a centralized platform for reporting and helping with missing persons cases. It bridges the gap between those reporting a missing person and the community or authorities who can provide assistance.

Key functionalities include:

Reporting: Users can submit detailed reports for missing persons, including photos, names, and last-seen locations.

Searching: Community members can browse and search through reported cases using various filters.

Collaboration: The platform allows community members to share leads, updates, or helpful information on specific cases.

Administration: An admin panel (if enabled) provides tools for verifying, moderating, editing, or removing entries to ensure data integrity.

⚙️ Features
User Management: Secure user registration and authentication.

Report a Missing Person: A user-friendly form for submitting new cases with image upload functionality.

Search & Filter: Advanced search capabilities to find missing persons by name, location, date, and more.

Community Interaction: A system for community members to contribute information or updates to existing reports.

Moderator Panel: Dedicated interface for admins to manage and verify reports.

Responsive UI: A seamless user experience across different devices, built with React.

🛠 Tech Stack
Component	Technology
Backend	Node.js, Express
Database	SQL (e.g., MySQL, PostgreSQL), Sequelize (ORM)
Frontend	React.js
File Storage	Multer for local uploads (can be adapted for cloud storage like AWS S3 or Cloudinary)
Other Tools	body-parser, CORS, jsonwebtoken

Export to Sheets
🚀 Getting Started
Follow these steps to set up and run the MissingHelpline application on your local machine.

Prerequisites
Make sure you have the following installed:

Node.js (v14 or newer)

npm or yarn

SQL database (MySQL, PostgreSQL, etc.)

Git

Installation
Clone the repository:

Bash

git clone https://github.com/Adithyasy105/MissingHelpline.git
cd MissingHelpline
Install backend dependencies:

Bash

cd backend
npm install
Install frontend dependencies:

Bash

cd ../frontend
npm install
Environment Variables
Create a .env file in the backend directory with the following variables.

Code snippet

# Database Credentials
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=MissingHelplineDB
DB_PORT=5432 # or your database's port

# Security
JWT_SECRET=your_secret_key_here

# Server Configuration
UPLOAD_DIR=./uploads
PORT=5000
You may also need a .env file in the frontend directory if your API URL is different.

Code snippet

# Frontend Configuration
REACT_APP_API_URL=http://localhost:5000
Database Setup
Configure your database in the .env file.

Run migrations to create the necessary database tables. If you have a migrations setup with Sequelize, use:

Bash

cd backend
npx sequelize db:migrate
Alternatively, if you are using model synchronization, run your sync script:

Bash

cd backend
node syncModels.js
(Optional) Seed the database with initial data:

Bash

npx sequelize db:seed:all
Running the App
Open two separate terminal windows.

Terminal 1 (Backend):

Bash

cd backend
npm start
Terminal 2 (Frontend):

Bash

cd frontend
npm start
The frontend will run on http://localhost:3000 and the backend on http://localhost:5000 (or the port you configured).

💡 Usage
Register/Login as a user to access the full features.

Report a Missing Person by filling out the form with a photo and details.

Browse and Search through the list of reported cases.

Contribute to a case by providing a lead or update on the specific report page.

If you have admin access, use the Admin Panel to manage and verify reports.

🤝 Contributing
Contributions are what make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

To contribute:

Fork the repository.

Create a new branch for your feature:

Bash

git checkout -b feature/your-new-feature
Commit your changes with a descriptive message:

Bash

git commit -m "feat: Add new feature"
Push to the branch:

Bash

git push origin feature/your-new-feature
Open a Pull Request for review.

📜 License
This project is licensed under the MIT License.

📞 Contact
Author: Adithya Sy

Email: adithyasy68@gmail.com

GitHub: Adithyasy105
