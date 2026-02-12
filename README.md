
# HiringSignal — AI Resume Shortlisting Simulator

A production-ready, full-stack AI-powered resume analysis tool that simulates real ATS + recruiter screening logic. Features user authentication, rate limiting, usage limits, and brutally honest AI feedback powered by Groq's Llama 3.3.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-20-green) ![MongoDB](https://img.shields.io/badge/MongoDB-8-darkgreen) ![Groq-AI](https://img.shields.io/badge/Groq-Llama--3.3-purple)

---

## ✨ Features

### Core Functionality
- **ATS Compatibility Score** (0–100) with animated ring chart
- **Multi-dimensional Analysis**: Skill Relevance, Project Depth, and Role Alignment scoring
- **Realistic rejection reason** simulation (not generic tips)
- **Detailed improvement roadmap** to reach 90+ scores
- **Specific weakness feedback** with context and impact analysis
- **PDF upload** with automatic text extraction
- **Paste resume text** as an alternative
- **14 role templates** including Legal Intern and Legal Associate
- **3 company profiles** (Startup / MNC / Product-based)

### User Management
- 🔐 **JWT-based Authentication** with secure password hashing
- 👤 **User Profiles** with personalized dashboards
- 📊 **Usage Tracking** with remaining analysis count
- 📜 **Personal Analysis History** (only see your own analyses)
- 🎯 **Plan-based Limits** (Free: 3 analyses, expandable for Pro/Enterprise)

### Professional Features
- 🛡️ **Rate Limiting** (100 requests per 15 minutes per IP)
- 🎨 **Beautiful UI** with dark mode and smooth animations
- 📱 **Responsive Design** for all devices
- 💾 **Download report as PDF**
- ⭐ **Social Proof** with testimonials and trust badges
- 🔍 **SEO Optimized** with meta tags and Open Graph support

---

## 🚀 Tech Stack

| Layer        | Technology                                      |
|--------------|-------------------------------------------------|
| Frontend     | React 18, Vite, Tailwind CSS, Framer Motion   |
| Backend      | Node.js, Express, JWT, bcryptjs                |
| Database     | MongoDB (Mongoose)                             |
| AI Engine    | Groq (Llama 3.3 70B Versatile)                |
| Security     | express-rate-limit, JWT tokens                 |
| PDF Parse    | pdf-parse                                      |

---

## 📁 Project Structure

```
hiring Signal/
├── backend/
│   ├── models/
│   │   ├── User.js                # User schema with auth
│   │   └── ResumeAnalysis.js      # Resume analysis schema
│   ├── routes/
│   │   ├── auth.js                # Auth endpoints (signup/login)
│   │   └── resume.js              # Resume API endpoints
│   ├── services/
│   │   └── openaiService.js       # Groq AI integration
│   ├── middleware/
│   │   └── auth.js                # JWT verification
│   ├── .env                       # Environment variables
│   ├── .env.example               # Environment template
│   ├── server.js                  # Express server
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── logo.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── FeedbackCard.jsx
│   │   │   ├── LoadingOverlay.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ResumeUploader.jsx
│   │   │   ├── ScoreRing.jsx
│   │   │   └── VerdictBanner.jsx
│   │   ├── pages/
│   │   │   ├── AnalyzePage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   └── ResultsPage.jsx
│   │   ├── api.js                # Axios API client
│   │   ├── App.jsx               # Root component + routing
│   │   ├── index.css             # Tailwind + custom styles
│   │   └── main.jsx              # React entry point
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** running locally (or a MongoDB Atlas URI)
- **Groq API key** ([get free key here](https://console.groq.com))

### 1. Clone & Setup Backend

```bash
cd "hiring Signal/backend"
npm install
```

Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hiringsignal
GROQ_API_KEY=your_groq_api_key_from_console
JWT_SECRET=your_random_secret_key_change_in_production
```

Start the backend:
```bash
npm run dev
```

### 2. Setup Frontend

```bash
cd "hiring Signal/frontend"
npm install
npm run dev
```






