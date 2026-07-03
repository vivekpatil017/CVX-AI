# ResumeAI — AI Resume & Cover Letter Builder

ResumeAI is a premium, modern, full-stack web application that helps job seekers build stunning, ATS-optimized resumes and cover letters in seconds. Featuring an immersive 3D onboarding experience, profiles management, AI generation powered by Google Gemini, and seamless PDF exporting, it streamlines the job application process.

---

## 🚀 Key Features

*   **3D Onboarding Landing Page**: A gorgeous entrance with interactive 3D step-cards that respond to mouse movement, floating 3D geometric shapes, and parallax scroll effects.
*   **Centralized Profiles**: Set up your professional background, skills, projects, education, and experiences once, and reuse them across multiple resumes.
*   **AI-Powered Resume Tailoring**: Paste any target job description and watch the AI optimize your resume contextually to match requirements and beat applicant tracking systems (ATS).
*   **AI Cover Letter Generator**: Write compelling, customized cover letters targeted precisely at specific roles and companies.
*   **Version History & Tracking**: Access and manage all your past creations, generated resumes, and cover letters at any time.
*   **PDF Export**: Download polished PDFs of your resumes and cover letters directly from the dashboard.

---

## 📁 File Structure

```text
resume-app/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Route controllers (profile, resume, coverLetter, history)
│   │   ├── db/               # Database connection setup (Mongoose/MongoDB)
│   │   ├── models/           # Mongoose schemas (Profile, Resume, CoverLetter)
│   │   ├── routes/           # Express router endpoints
│   │   ├── services/         # Business logic & AI generation services (Gemini API)
│   │   └── app.js            # Express application configurations
│   ├── .example.env          # Environment template file
│   ├── package.json          # Node dependencies & npm scripts
│   └── server.js             # API entrypoint script
│
├── frontend/
│   ├── public/               # Public assets (icons, static images)
│   ├── src/
│   │   ├── assets/           # Application-specific visual assets
│   │   ├── components/       # Reusable React components (UI, layouts, animations)
│   │   │   ├── animations/   # FadeIn, StaggerChildren, etc.
│   │   │   ├── cards/        # Dashboard Stats and Action cards
│   │   │   ├── forms/        # Input forms for profile building
│   │   │   └── layout/       # Sidebar, Navbar, PageWrapper
│   │   ├── constants/        # Route constants and navigation settings
│   │   ├── hooks/            # Custom hooks (theme, profiles, resumes)
│   │   ├── layouts/          # Main application layout wrapper
│   │   ├── pages/            # Application view pages
│   │   │   ├── dashboard/    # User dashboard overview
│   │   │   ├── onboarding/   # Landing page with 3D animation welcome
│   │   │   └── ...           # Resume, Cover Letter, Profile, Settings pages
│   │   ├── routes/           # React Router route paths configurations
│   │   ├── services/         # Axios client and API integration requests
│   │   ├── index.css         # Tailwind & custom css animations configuration
│   │   └── main.jsx          # React app entry point
│   ├── index.html            # Core index template HTML page
│   ├── package.json          # Vite + React app dependencies & commands
│   └── vite.config.js        # Vite compiler configurations
│
└── README.md                 # Project guide & reference
```

---

## ⚙️ Environment Variables (`.env`)

### Backend `.env`

Rename the template file `backend/.example.env` to `backend/.env` and update it with your settings:

```env
# Google Gemini API key for AI generation (https://aistudio.google.com/)
GEMINI_APIKEY="your-gemini-api-key"

# MongoDB Database Connection String
MONGODB_URI="mongodb://localhost:27017/resume-app"

# Backend server PORT number (defaults to 3000)
PORT=3000
```

### Frontend `.env`

Create a `.env` file in the **`frontend`** directory to configure your client-side environment variables:

```env
# URL pointing to the Backend API Server
VITE_API_URL=http://localhost:3000/api/v1
```

---

## 🛠️ Getting Started & Commands

To set up the project locally on your machine, follow these steps:

### Prerequisites

*   Make sure you have **Node.js** (v18+ recommended) installed.
*   Make sure you have a running **MongoDB** instance (local or MongoDB Atlas).

---

### Step 1: Set Up & Run the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the server dependencies:
   ```bash
   npm install
   ```
3. Configure your environmental values:
   Create a `.env` file from the example:
   *   *Windows Powershell*: `cp .example.env .env`
   *   *Bash/macOS/Linux*: `cp .example.env .env`
   *   Open the `.env` file and input your `GEMINI_APIKEY` and `MONGODB_URI`.
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend server will run by default at `http://localhost:3000`.

---

### Step 2: Set Up & Run the Frontend

1. Open a new terminal window/tab and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the React app dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The user interface will be launched at `http://localhost:5173`.

---

## 🔌 API Endpoints Summary

All routes are prefixed with `/api/v1` of your backend server:

*   **Profiles API**: `/api/v1/profile`
    *   `GET /` - Fetch all saved user profiles
    *   `POST /` - Create a new user profile
    *   `PUT /:id` - Update profile data
    *   `DELETE /:id` - Delete profile
*   **Resumes API**: `/api/v1/resume`
    *   `GET /` - Fetch all resumes
    *   `POST /generate` - Request Gemini AI to generate a resume draft
    *   `POST /` - Save a resume version
    *   `DELETE /:id` - Delete a resume version
    *   `GET /:id/pdf` - Download PDF version of the resume
*   **Cover Letters API**: `/api/v1/coverLetter`
    *   `GET /` - Fetch all cover letters
    *   `POST /generate` - Request Gemini AI to draft a cover letter
    *   `POST /` - Save a cover letter
    *   `DELETE /:id` - Delete a cover letter
    *   `GET /:id/pdf` - Download PDF version of the cover letter
*   **History API**: `/api/v1/history`
    *   `GET /:profileId` - Fetch change tracking log history for a profile
