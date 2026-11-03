@echo off
title UniPath AI - Flutter Mobile App Launcher
echo ========================================================
echo   Starting UniPath AI Mobile Application (Flutter)
echo ========================================================
set PATH=D:\flutter\bin;%PATH%
cd /d "%~dp0"

echo.
echo Select target device to run the app:
echo   [1] Chrome Browser (Quickest, no phone/emulator needed)
echo   [2] Microsoft Edge Browser
echo   [3] Windows Desktop Application
echo   [4] Android Device / Emulator
echo   [5] Auto-detect
echo.
set /p choice="Enter choice [1-5] (Press Enter for default Chrome [1]): "

if "%choice%"=="" set choice=1

if "%choice%"=="1" (
    echo.
    echo Launching in Chrome Browser...
    call flutter run -d chrome
) else if "%choice%"=="2" (
    echo.
    echo Launching in Microsoft Edge...
    call flutter run -d edge
) else if "%choice%"=="3" (
    echo.
    echo Launching as Windows Desktop Application...
    call flutter run -d windows
) else if "%choice%"=="4" (
    echo.
    echo Launching on Android...
    call flutter run -d android
) else (
    echo.
    echo Launching with auto-detect...
    call flutter run
)

echo.
pause
