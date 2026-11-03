# 🎓 UniPath AI — From Career Goals to University Doors

> **FYP-23F-38 | Sukkur IBA University**  
> Final Year Project — 30% Implementation Milestone

## 👩‍💻 Team

| Name | Roll No |
|---|---|
| Shivani | 023-23-0221 |
| Aamna Brohi | 023-23-0232 |
| Tayaba Abbasi | 023-23-0228 |

**Supervisors:** Dr. Jawaid Siddiqui, Prof. Dr. Ghulam Mujtaba Shaikh

---

## 📌 About

**UniPath AI** is an intelligent Pakistani undergraduate admissions guidance system. It helps students:
- Discover suitable universities based on their marks, budget, and interests
- Get AI-powered answers about admissions, fees, and scholarships
- Compare universities and manage their shortlist
- Prepare for entry tests with personalized study plans

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS |
| Backend | Python + FastAPI |
| Database | SQLite (via built-in `sqlite3`) |
| AI / RAG | Gemini API + keyword retrieval |
| Auth | JWT (python-jose) + bcrypt |

---

## 🚀 How to Run

### 1. Clone the repo
```bash
git clone https://github.com/Shivanibatra171/fyp-unipath-ai.git
cd fyp-unipath-ai
```

### 2. Start the Backend
```bash
cd backend

# Install dependencies
E:\Python314\python.exe -m pip install fastapi uvicorn[standard] python-jose[cryptography] passlib[bcrypt] python-multipart aiofiles pydantic python-dotenv bcrypt

# Create .env file
copy .env.example .env
# (Optional) Add your Gemini API key in .env

# Start server
E:\Python314\python.exe -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
Backend runs at: **http://127.0.0.1:8000**  
API Docs: **http://127.0.0.1:8000/docs**

### 3. Start the Frontend
```bash
cd web
node node_modules\vite\bin\vite.js --host 127.0.0.1 --port 5173
```
Frontend runs at: **http://127.0.0.1:5173**

> **Easy way:** Double-click `backend/start_backend.bat` and `web/start_frontend.bat`

---

## ✅ Implemented Features (30% Milestone)

### 🔐 Authentication
- Student registration with academic details (Matric marks, FSc marks, budget)
- Secure login with JWT tokens
- Password hashing with bcrypt

### 🏛️ University Database
- 10 Pakistani universities: NUST, LUMS, FAST-NUCES, IBA Karachi, GIKI, QAU, UET Lahore, Punjab University, Sukkur IBA, COMSATS
- Programs, fees, scholarships, eligibility, aggregate weights

### 🎯 Recommendation Engine
- Real aggregate formula: `Entry Test % × weight + FSc % × weight + Matric % × weight`
- Budget matching
- Location preference
- Program/major matching
- Eligibility status with gap analysis

### 🤖 RAG-Based AI Chatbot
- 35+ university knowledge chunks
- Keyword-based retrieval from official university information
- Gemini API integration (add key in `.env` for AI-generated answers)
- Source citations with official links

### 👨‍💼 Admin Panel
- Admin login (role-based)
- View all students
- Platform statistics

### 📊 Student Dashboard
- Profile management
- University comparison & shortlist
- Diagnostic test with scoring
- Application guidance
- Test preparation module

---

## 📁 Project Structure

```
fyp-unipath-ai/
├── backend/                  # FastAPI backend
│   ├── main.py               # App entry point
│   ├── database.py           # SQLite setup
│   ├── security.py           # JWT + password hashing
│   ├── routers/
│   │   ├── auth.py           # Register / Login
│   │   ├── student.py        # Profile / Shortlist
│   │   ├── universities.py   # University data + Recommendations
│   │   └── rag.py            # RAG Chatbot
│   ├── admin/
│   │   └── router.py         # Admin panel API
│   ├── .env.example          # Environment variables template
│   └── start_backend.bat     # One-click start
│
└── web/                      # React + Vite frontend
    ├── src/
    │   ├── pages/            # All page components
    │   ├── components/       # Reusable components
    │   ├── context/          # Auth, Progress, Shortlist contexts
    │   └── data/             # University & RAG data
    └── start_frontend.bat    # One-click start
```

---

## 🔑 Admin Access

| Field | Value |
|---|---|
| Email | `admin@unipath.ai` |
| Password | `Admin@UniPath2024` |
| Endpoint | `POST /admin/login` |

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Health check |
| POST | `/auth/register` | Student registration |
| POST | `/auth/login` | Student login |
| GET | `/auth/me` | Current user info |
| GET | `/student/profile` | Get student profile |
| PUT | `/student/profile` | Update profile |
| GET | `/student/shortlist` | Get shortlist |
| POST | `/student/shortlist` | Add to shortlist |
| GET | `/universities/` | All universities |
| POST | `/universities/recommend` | Get recommendations |
| POST | `/rag/chat` | AI chatbot |
| POST | `/admin/login` | Admin login |
| GET | `/admin/students` | All students (admin only) |

---

## 📝 Environment Variables

Create `backend/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
SECRET_KEY=unipath-ai-super-secret-key-fyp-2024
```

Get free Gemini API key: https://aistudio.google.com/app/apikey
