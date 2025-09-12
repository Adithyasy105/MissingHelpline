# MissingHelpline

A Community-Driven Missing Persons Reporting & Help System  
Built with **Node.js**, **Express**, **Sequelize**, **SQL**, and **React**.

---

## 🧭 Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Environment Variables](#environment-variables)  
   - [Database Setup](#database-setup)  
   - [Running the App](#running-the-app)  
5. [Project Structure](#project-structure)  
6. [Usage](#usage)  
7. [Contributing](#contributing)  
8. [License](#license)  
9. [Contact](#contact)

---

## 📝 Overview

MissingHelpline is a platform that allows users to:

- Report missing persons by filling out details (e.g. name, photo, last seen location, etc.)  
- Browse and search missing persons reported by others  
- Community members can help by sharing leads or providing helpful info  
- Admin side (if relevant) to verify reports, moderate, edit or remove entries

This helps bridge the gap between those reporting missing persons and the community and authorities who might assist.

---

## ⚙️ Features

- User registration and authentication  
- Report a missing person form (with image upload)  
- List & search missing persons by various filters  
- Community responses / updates on reports  
- Admin or moderator panel (for verifying / managing reports)  
- Responsive UI built with React

---

## 🛠 Tech Stack

| Component             | Technology             |
|-----------------------|-------------------------|
| Backend               | Node.js, Express        |
| ORM / Database Layer  | Sequelize, SQL (MySQL / PostgreSQL etc.) |
| Frontend              | React.js                |
| File storage / Uploads | (e.g. Multer / Cloud Storage) |
| Other tools           | (e.g. body-parser, CORS, etc.) |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:

- Node.js (v14 or newer)  
- npm or yarn  
- SQL database (MySQL / PostgreSQL / SQLite etc.)  
- Git

### Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/YourUserName/MissingHelpline.git
   cd MissingHelpline
Install backend dependencies:

bash
Copy code
cd backend
npm install
Install frontend dependencies:

bash
Copy code
cd ../frontend
npm install
Environment Variables
Create a .env file in the backend folder (and frontend if needed) with variables like:

env
Copy code
# Backend
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=MissingHelplineDB
DB_PORT=5432        # or appropriate port
JWT_SECRET=your_jwt_secret
UPLOAD_DIR=/path/to/uploads
PORT=5000

# Frontend (if required)
REACT_APP_API_URL=http://localhost:5000
Database Setup
Configure your SQL database credentials in the .env

Run Sequelize migrations (if you have migrations) or sync models:

bash
Copy code
cd backend
npx sequelize db:migrate     # if you're using migrations
# Or if using sync:
node syncModels.js           # or the script you wrote to sync the DB
(Optional) Seed the database with initial data:

bash
Copy code
npx sequelize db:seed:all
Running the App
Open two terminal windows/tabs:

Backend:

bash
Copy code
cd backend
npm start         # or `node app.js`, or whatever entry you have
Frontend:

bash
Copy code
cd frontend
npm start
The frontend will typically run on http://localhost:3000 and backend on something like http://localhost:5000 (based on your config).

📂 Project Structure
Here’s a typical layout (adjust to your actual structure):

bash
## 📂 Project Structure

| Path / File             | Description                          |
|--------------------------|--------------------------------------|
| **backend/**             | Backend server code (Node.js + Express) |
| ├── controllers/         | Request handling logic (controllers) |
| ├── models/              | Sequelize models for database        |
| ├── routes/              | API route definitions               |
| ├── middleware/          | Auth, validation, error handlers     |
| ├── config/              | Database & environment config        |
| ├── migrations/          | Sequelize migrations (DB schema)     |
| ├── seeders/             | Seed data for testing/demo           |
| ├── app.js / server.js   | Entry point for backend server        |
| └── .env                 | Environment variables                |
| **frontend/**            | Frontend React app                   |
| ├── src/                 | Main source code folder              |
| │ ├── components/        | Reusable UI components               |
| │ ├── pages/             | Page-level components (routes)       |
| │ ├── services/          | API service functions                |
| │ ├── assets/            | Images, icons, static files          |
| │ ├── App.js             | Main React app component             |
| │ └── index.js           | React entry point                    |
| ├── public/              | Public static files                  |
| └── package.json         | Frontend dependencies & scripts      |

💡 Usage
Register / login as a user
Fill the “Report Missing Person” form with required information
Browse list of missing persons, use filters/search to narrow down
Community members can submit leads or comments (if this is part of your design)
Admin can moderate / verify / delete reports

🤝 Contributing
Contributions are welcome! Here's how you can help:
Fork this repository
Create your feature branch (git checkout -b feature/YourFeature)
Commit your changes (git commit -m "Add some feature")
Push to the branch (git push origin feature/YourFeature)
Open a Pull Request
Please follow code style, write meaningful commit messages, and ensure your changes are tested.



📞 Contact
If you have any questions or suggestions, feel free to reach out:
Author:Adithya sy
Email: adithyasy68@gmail.com
GitHub: Adithyasy105
