@echo off
title UniPath AI - Web Frontend Launcher
echo ========================================================
echo   Starting UniPath AI Web Application (Vite + React)
echo ========================================================
cd /d "%~dp0web"
start "" http://localhost:5173
node node_modules\vite\bin\vite.js --host 127.0.0.1 --port 5173
pause
