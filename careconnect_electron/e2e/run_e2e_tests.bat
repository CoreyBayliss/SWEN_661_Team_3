@echo off
REM CareConnect E2E Test Runner for Windows
REM Runs Playwright E2E tests for Electron application

echo ====================================
echo CareConnect E2E Test Runner
echo ====================================
echo.

REM Check if build exists
if not exist "dist\main.js" (
    echo [ERROR] Application not built. Running build first...
    call npm run build
    if errorlevel 1 (
        echo [ERROR] Build failed. Cannot run tests.
        exit /b 1
    )
)

echo [INFO] Running E2E tests...
echo.

REM Run Playwright tests
call npx playwright test %*

if errorlevel 1 (
    echo.
    echo [ERROR] Tests failed. Opening report...
    call npx playwright show-report
    exit /b 1
)

echo.
echo [SUCCESS] All tests passed!
echo.
echo To view detailed report, run: npx playwright show-report
echo.

exit /b 0
