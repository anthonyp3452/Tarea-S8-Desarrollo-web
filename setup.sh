#!/bin/bash

echo "Setting up the Products Management Application..."

# Create .env file for backend
cat > backend/.env << EOF
DB_HOST=postgres
DB_PORT=5432
DB_NAME=productos_db
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3000
EOF

echo "✓ Created backend/.env file"
echo ""
echo "Setup complete! You can now:"
echo "1. Run 'docker-compose up -d' to start the application"
echo "2. Open frontend/index.html in your browser with Live Server"
echo ""





