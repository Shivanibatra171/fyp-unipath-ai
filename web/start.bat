@echo off
title UniPath AI - Admissions & Test Prep Portal
cls
echo ======================================================================
echo           UniPath AI - Pakistan Admissions & Test Prep Portal
echo ======================================================================
echo.

cd /d "%~dp0"

:: If inside scratch root, navigate to unipath-ai
if exist "unipath-ai\node_modules\" (
    cd /d "%~dp0\unipath-ai"
)

echo [1/2] Checking Node.js environment...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js was not found in your system PATH.
    echo Please verify Node.js is installed.
    echo.
    pause
    exit /b 1
)

echo [2/2] Starting UniPath AI Frontend server...
echo.
echo ----------------------------------------------------------------------
echo  Local App URL: http://localhost:5173
echo  Opening in your default browser now...
echo ----------------------------------------------------------------------
echo.

:: Automatically open browser
start "" "http://localhost:5173"

:: Directly run Vite via Node to avoid Windows execution policy / npm script issues
if exist "node_modules\vite\bin\vite.js" (
    node "node_modules\vite\bin\vite.js" --host 127.0.0.1 --port 5173
) else (
    call npm.cmd run dev -- --host 127.0.0.1 --port 5173
)

echo.
echo Server stopped.
pause
