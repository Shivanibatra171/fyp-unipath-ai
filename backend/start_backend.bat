@echo off
echo ==========================================
echo  UniPath AI - Backend Server
echo ==========================================
echo.
cd /d %~dp0
echo Starting FastAPI backend on http://127.0.0.1:8000
echo API Docs: http://127.0.0.1:8000/docs
echo.
echo Press Ctrl+C to stop the server.
echo.
E:\Python314\python.exe -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
pause
