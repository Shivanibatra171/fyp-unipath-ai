"""
Auth router: Register, Login, Get current user.
"""
from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel, EmailStr
from typing import Optional
from database import get_db
from security import hash_password, verify_password, create_access_token, decode_token

router = APIRouter(prefix="/auth", tags=["auth"])

# --- Pydantic models ---
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    phone: Optional[str] = None
    city: Optional[str] = None
    matric_marks: Optional[int] = None
    fsc_marks: Optional[int] = None
    expected_test_score: Optional[int] = None
    target_major: Optional[str] = None
    budget: Optional[int] = None

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    name: str
    email: str
    role: str

# --- Helper: get current user from Authorization header ---
def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload

# --- Endpoints ---
@router.post("/register", response_model=TokenResponse)
def register(data: RegisterRequest):
    conn = get_db()
    cursor = conn.cursor()
    
    # Check if email already exists
    existing = cursor.execute("SELECT id FROM users WHERE email = ?", (data.email,)).fetchone()
    if existing:
        conn.close()
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    password_hash = hash_password(data.password)
    cursor.execute(
        "INSERT INTO users (email, name, password_hash, role) VALUES (?, ?, ?, 'student')",
        (data.email, data.name, password_hash)
    )
    user_id = cursor.lastrowid
    
    # Create profile
    cursor.execute("""
        INSERT INTO student_profiles 
        (user_id, phone, city, matric_marks, fsc_marks, expected_test_score, target_major, budget)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (user_id, data.phone, data.city, data.matric_marks, data.fsc_marks, 
          data.expected_test_score, data.target_major, data.budget))
    
    conn.commit()
    conn.close()
    
    token = create_access_token({"sub": str(user_id), "email": data.email, "role": "student"})
    return TokenResponse(access_token=token, user_id=user_id, name=data.name, email=data.email, role="student")

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest):
    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE email = ?", (data.email,)).fetchone()
    conn.close()
    
    if not user or not verify_password(data.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_access_token({"sub": str(user["id"]), "email": user["email"], "role": user["role"]})
    return TokenResponse(
        access_token=token,
        user_id=user["id"],
        name=user["name"],
        email=user["email"],
        role=user["role"]
    )

@router.get("/me")
def get_me(current_user: dict = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    conn = get_db()
    user = conn.execute("SELECT id, name, email, role FROM users WHERE id = ?", (user_id,)).fetchone()
    conn.close()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return dict(user)
