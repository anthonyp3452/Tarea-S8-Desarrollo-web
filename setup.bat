@echo off
echo Setting up the Products Management Application...

REM Create .env file for backend
(
echo DB_HOST=postgres
echo DB_PORT=5432
echo DB_NAME=productos_db
echo DB_USER=postgres
echo DB_PASSWORD=postgres
echo PORT=3000
) > backend\.env

echo Created backend\.env file
echo.
echo Setup complete! You can now:
echo 1. Run 'docker-compose up -d' to start the application
echo 2. Open frontend\index.html in your browser with Live Server
echo.





