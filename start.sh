#!/bin/bash

# Start backend
echo "Starting backend..."
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirement.txt
uvicorn main:app --reload --port 8000 &

# Start frontend
echo "Starting frontend..."
cd ../frontend
npm install
npm run dev 