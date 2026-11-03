"""
UniPath AI — FastAPI Backend
Main application entry point.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from routers import auth, student, universities, rag
from admin import router as admin_router

# Initialize the app
app = FastAPI(
    title="UniPath AI API",
    description="Backend API for UniPath AI — Pakistani University Admissions Guidance System",
    version="1.0.0"
)

# --- CORS — Allow React frontend ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Startup: Initialize database ---
@app.on_event("startup")
def startup():
    init_db()
    print("[UniPath AI] Backend started successfully!")
    print("[UniPath AI] API docs available at: http://127.0.0.1:8000/docs")

# --- Include routers ---
app.include_router(auth.router)
app.include_router(student.router)
app.include_router(universities.router)
app.include_router(rag.router)
app.include_router(admin_router.router)

# --- Health check ---
@app.get("/")
def root():
    return {
        "app": "UniPath AI",
        "version": "1.0.0",
        "status": "running",
        "docs": "http://127.0.0.1:8000/docs"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}
