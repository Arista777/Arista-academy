# Arista Academy CRM

A modular, scalable SaaS CRM for martial arts academies (BJJ, Muay Thai). It supports student management, payments, attendance, class scheduling, and martial arts progression.

## Features
- Student management and profiles
- Payments and pending payments tracking
- Attendance tracking and class history
- Class scheduling and instructor assignment
- Belt progression
- Technique knowledge base
- Technique resources with YouTube metadata
- Background jobs (reminders, inactivity alerts, attendance summaries)

## Tech Stack
- Backend: Node.js + Express
- Database: PostgreSQL
- Frontend: Static HTML/CSS/JS
- Infrastructure: Docker + Docker Compose

## Local Development
### Backend
```bash
cd backend
npm install
npm run migrate
npm run start
```

### Environment
Copy `.env.example` to `.env` and adjust secrets before running Docker.

### Background Jobs
```bash
cd backend
npm run worker
```

### Frontend
The frontend is static. Open `frontend/index.html` directly or serve it with any static server.

## Docker
```bash
docker compose up --build
```

Services:
- `db` PostgreSQL
- `api` backend API
- `worker` background jobs
- `frontend` static dashboard on port 8080

## Environment Variables
See `.env.example` for configuration values.

## API
Full API documentation: `docs/API.md`
