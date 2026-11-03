@echo off
echo ==========================================
echo  UniPath AI - Frontend (React + Vite)
echo ==========================================
echo.
cd /d %~dp0
echo Starting Vite dev server on http://127.0.0.1:5173
echo.
echo Press Ctrl+C to stop.
echo.
node node_modules\vite\bin\vite.js --host 127.0.0.1 --port 5173
pause
