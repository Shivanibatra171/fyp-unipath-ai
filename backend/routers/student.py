"""
Student profile, shortlist, diagnostic results, interest profile routes.
"""
import json
from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from typing import Optional, List
from database import get_db
from security import decode_token

router = APIRouter(prefix="/student", tags=["student"])

def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.split(" ")[1]
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload

# --- Models ---
class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None
    matric_marks: Optional[int] = None
    matric_total: Optional[int] = None
    fsc_marks: Optional[int] = None
    fsc_total: Optional[int] = None
    expected_test_score: Optional[int] = None
    target_major: Optional[str] = None
    budget: Optional[int] = None
    preferred_cities: Optional[List[str]] = None
    interests: Optional[List[str]] = None

class ShortlistItem(BaseModel):
    university_id: str

class DiagnosticResult(BaseModel):
    score: int
    total: int
    weak_areas: List[str]

class InterestProfile(BaseModel):
    top_areas: List[str]
    activities: List[str]

# --- Profile ---
@router.get("/profile")
def get_profile(current_user: dict = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    conn = get_db()
    user = conn.execute("SELECT id, name, email, role FROM users WHERE id = ?", (user_id,)).fetchone()
    profile = conn.execute("SELECT * FROM student_profiles WHERE user_id = ?", (user_id,)).fetchone()
    conn.close()
    
    result = dict(user) if user else {}
    if profile:
        p = dict(profile)
        p["preferred_cities"] = json.loads(p.get("preferred_cities") or "[]")
        p["interests"] = json.loads(p.get("interests") or "[]")
        result.update(p)
    return result

@router.put("/profile")
def update_profile(data: ProfileUpdate, current_user: dict = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    conn = get_db()
    
    if data.name:
        conn.execute("UPDATE users SET name = ? WHERE id = ?", (data.name, user_id))
    
    updates = {}
    if data.phone is not None: updates["phone"] = data.phone
    if data.city is not None: updates["city"] = data.city
    if data.province is not None: updates["province"] = data.province
    if data.matric_marks is not None: updates["matric_marks"] = data.matric_marks
    if data.matric_total is not None: updates["matric_total"] = data.matric_total
    if data.fsc_marks is not None: updates["fsc_marks"] = data.fsc_marks
    if data.fsc_total is not None: updates["fsc_total"] = data.fsc_total
    if data.expected_test_score is not None: updates["expected_test_score"] = data.expected_test_score
    if data.target_major is not None: updates["target_major"] = data.target_major
    if data.budget is not None: updates["budget"] = data.budget
    if data.preferred_cities is not None: updates["preferred_cities"] = json.dumps(data.preferred_cities)
    if data.interests is not None: updates["interests"] = json.dumps(data.interests)
    
    if updates:
        set_clause = ", ".join(f"{k} = ?" for k in updates)
        values = list(updates.values()) + [user_id]
        conn.execute(f"UPDATE student_profiles SET {set_clause}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?", values)
    
    conn.commit()
    conn.close()
    return {"message": "Profile updated successfully"}

# --- Shortlist ---
@router.get("/shortlist")
def get_shortlist(current_user: dict = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    conn = get_db()
    items = conn.execute("SELECT university_id, added_at FROM shortlists WHERE user_id = ?", (user_id,)).fetchall()
    conn.close()
    return [dict(i) for i in items]

@router.post("/shortlist")
def add_to_shortlist(data: ShortlistItem, current_user: dict = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    conn = get_db()
    try:
        conn.execute("INSERT INTO shortlists (user_id, university_id) VALUES (?, ?)", (user_id, data.university_id))
        conn.commit()
    except Exception:
        conn.close()
        raise HTTPException(status_code=400, detail="Already in shortlist")
    conn.close()
    return {"message": "Added to shortlist"}

@router.delete("/shortlist/{university_id}")
def remove_from_shortlist(university_id: str, current_user: dict = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    conn = get_db()
    conn.execute("DELETE FROM shortlists WHERE user_id = ? AND university_id = ?", (user_id, university_id))
    conn.commit()
    conn.close()
    return {"message": "Removed from shortlist"}

# --- Diagnostic Results ---
@router.post("/diagnostic-results")
def save_diagnostic(data: DiagnosticResult, current_user: dict = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    conn = get_db()
    conn.execute(
        "INSERT INTO diagnostic_results (user_id, score, total, weak_areas) VALUES (?, ?, ?, ?)",
        (user_id, data.score, data.total, json.dumps(data.weak_areas))
    )
    conn.commit()
    conn.close()
    return {"message": "Results saved"}

@router.get("/diagnostic-results")
def get_diagnostic(current_user: dict = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    conn = get_db()
    results = conn.execute(
        "SELECT * FROM diagnostic_results WHERE user_id = ? ORDER BY taken_at DESC LIMIT 5",
        (user_id,)
    ).fetchall()
    conn.close()
    out = []
    for r in results:
        d = dict(r)
        d["weak_areas"] = json.loads(d.get("weak_areas") or "[]")
        out.append(d)
    return out

# --- Interest Profile ---
@router.post("/interest-profile")
def save_interest(data: InterestProfile, current_user: dict = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    conn = get_db()
    conn.execute("""
        INSERT INTO interest_profiles (user_id, top_areas, activities)
        VALUES (?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET
            top_areas = excluded.top_areas,
            activities = excluded.activities,
            updated_at = CURRENT_TIMESTAMP
    """, (user_id, json.dumps(data.top_areas), json.dumps(data.activities)))
    conn.commit()
    conn.close()
    return {"message": "Interest profile saved"}

@router.get("/interest-profile")
def get_interest(current_user: dict = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    conn = get_db()
    result = conn.execute("SELECT * FROM interest_profiles WHERE user_id = ?", (user_id,)).fetchone()
    conn.close()
    if not result:
        return {"top_areas": [], "activities": []}
    d = dict(result)
    d["top_areas"] = json.loads(d.get("top_areas") or "[]")
    d["activities"] = json.loads(d.get("activities") or "[]")
    return d
