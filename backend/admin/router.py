"""
Admin panel router.
Admin login + basic CRUD for university management.
"""
import json
from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from typing import Optional, List
from database import get_db
from security import decode_token, hash_password

router = APIRouter(prefix="/admin", tags=["admin"])

# --- Hardcoded admin credentials for FYP demo ---
ADMIN_EMAIL = "admin@unipath.ai"
ADMIN_PASSWORD = "Admin@UniPath2024"

def get_admin_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ")[1]
    payload = decode_token(token)
    if not payload or payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return payload

# --- Models ---
class AdminLoginRequest(BaseModel):
    email: str
    password: str

# --- Endpoints ---
@router.post("/login")
def admin_login(data: AdminLoginRequest):
    if data.email != ADMIN_EMAIL or data.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid admin credentials")
    from security import create_access_token
    token = create_access_token({"sub": "admin", "email": data.email, "role": "admin"})
    return {"access_token": token, "token_type": "bearer", "role": "admin"}

@router.get("/students")
def get_all_students(current_admin: dict = Depends(get_admin_user)):
    conn = get_db()
    students = conn.execute(
        "SELECT u.id, u.name, u.email, u.created_at, sp.city, sp.fsc_marks, sp.target_major FROM users u LEFT JOIN student_profiles sp ON u.id = sp.user_id WHERE u.role = 'student'"
    ).fetchall()
    conn.close()
    return [dict(s) for s in students]

@router.get("/stats")
def get_stats(current_admin: dict = Depends(get_admin_user)):
    conn = get_db()
    total_students = conn.execute("SELECT COUNT(*) FROM users WHERE role='student'").fetchone()[0]
    total_diagnostics = conn.execute("SELECT COUNT(*) FROM diagnostic_results").fetchone()[0]
    total_shortlists = conn.execute("SELECT COUNT(DISTINCT user_id) FROM shortlists").fetchone()[0]
    conn.close()
    return {
        "total_students": total_students,
        "total_diagnostics_taken": total_diagnostics,
        "students_with_shortlists": total_shortlists,
    }
