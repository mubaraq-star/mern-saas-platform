@echo off
REM NestJS SaaS Platform - Development Setup Script for Windows

echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║   🚀 NestJS SaaS Platform - Development Setup               ║
echo ║                                                               ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js ^>= 16.0.0
    exit /b 1
)

echo ✅ Node.js version:
node -v

REM Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed
    exit /b 1
)

echo ✅ npm version:
npm -v

echo.
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% EQU 0 (
    echo ✅ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
    exit /b 1
)

echo.
REM Check if .env exists
if not exist ".env" (
    echo 📝 Creating .env file from .env.example...
    copy .env.example .env
    echo ✅ .env file created
    echo ⚠️  Please update .env with your configuration before starting the server
) else (
    echo ✅ .env file already exists
)

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                    Setup Complete! 🎉                         ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo Next steps:
echo.
echo 1. Update your .env file with proper values:
echo    - MONGODB_URI
echo    - JWT_SECRET and JWT_REFRESH_SECRET
echo    - STRIPE_SECRET_KEY (if using Stripe)
echo    - Email configuration
echo.
echo 2. Start the development server:
echo    npm run start:dev
echo.
echo 3. Access the application:
echo    - API: http://localhost:5000
echo    - Docs: http://localhost:5000/api/docs
echo    - Health: http://localhost:5000/api/health
echo.
echo 4. Read the documentation:
echo    - SETUP.md - Setup instructions
echo    - ARCHITECTURE.md - Architecture details
echo.
pause
