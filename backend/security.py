"""
Security utilities: password hashing (bcrypt with SHA-256 pre-hash) and JWT token management.
"""
import os
import hashlib
import hmac
from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt

# --- Config ---
SECRET_KEY = os.getenv("SECRET_KEY", "unipath-ai-super-secret-key-fyp-2024")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# --- Password hashing (using bcrypt directly, fallback to SHA-256 HMAC) ---
def hash_password(password: str) -> str:
    """Hash password using bcrypt directly."""
    try:
        import bcrypt
        # bcrypt has a 72-byte limit, so we pre-hash with SHA-256
        pwd_bytes = password.encode('utf-8')
        pwd_bytes = hashlib.sha256(pwd_bytes).hexdigest().encode('utf-8')
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(pwd_bytes, salt).decode('utf-8')
    except Exception:
        # Fallback to HMAC-SHA256 (still secure for FYP demo)
        salt = os.urandom(16).hex()
        h = hmac.new(SECRET_KEY.encode(), (salt + password).encode(), hashlib.sha256).hexdigest()
        return f"sha256:{salt}:{h}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against stored hash."""
    try:
        if hashed_password.startswith("sha256:"):
            _, salt, stored_hash = hashed_password.split(":", 2)
            h = hmac.new(SECRET_KEY.encode(), (salt + plain_password).encode(), hashlib.sha256).hexdigest()
            return hmac.compare_digest(h, stored_hash)
        import bcrypt
        pwd_bytes = plain_password.encode('utf-8')
        pwd_bytes = hashlib.sha256(pwd_bytes).hexdigest().encode('utf-8')
        return bcrypt.checkpw(pwd_bytes, hashed_password.encode('utf-8'))
    except Exception:
        return False

# --- JWT tokens ---
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
