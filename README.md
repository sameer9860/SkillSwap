# 🔄 SkillSwap

SkillSwap is a production-ready web application built for peer-to-peer knowledge sharing and mentorship. This platform allows users to swap skills, book mentor sessions, and manage their learning journey.

---

## 🚀 Current Project Status

The project is being developed in structured phases. Currently, the **Backend Foundation** and **Database Schema** are fully implemented.

### ✅ Completed Milestones

- **Phase 1: Backend Setup**
  - Initialized Node.js/Express server.
  - Configured MongoDB connection via Mongoose.
  - Set up essential middleware (CORS, JSON parsing).
  - Established project folder structure.
- **Phase 2: Database Models**
  - **User Model**: Detailed user profiles with roles (Student, Mentor, Admin).
  - **Skill Model**: Categorized skill listings with pricing and duration.
  - **Booking Model**: Appointment management system for skill swaps.
  - Verified models with automated loading scripts.

---

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose (ODM)
- **Security**: JWT (JSON Web Tokens), Bcrypt (Password Hashing)
- **Environment**: Dotenv for configuration

---

## 📂 Folder Structure

```bash
skillswap/
├── backend/                # Server-side logic
│   ├── config/             # DB connection configuration
│   ├── models/             # Mongoose schemas (User, Skill, Booking)
│   ├── routes/             # API entry points
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth & Role protection
│   └── utils/              # Helper functions
├── frontend/               # React application (Coming soon)
└── README.md
```

---

## 🏗️ Next Steps

- **Phase 3**: Authentication System (Registration, Login, Protected Routes).
- **Phase 4**: API Development for Skills and Bookings.
- **Phase 5**: React Frontend initialization.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](file:///home/samir/CodeVeda/SkillSwap/LICENSE) file for details.
