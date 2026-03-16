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

## Deploy on Render
This repo includes a `render.yaml` blueprint to deploy the API, worker, frontend, and Postgres.

1. Create a new Render Blueprint and select the repository.
2. Render will detect `render.yaml` and provision services.
3. Set `YOUTUBE_API_KEY` in the API service environment.
4. Rotate `JWT_SECRET` if needed.

The backend supports `DATABASE_URL` for managed Postgres environments.
## Environment Variables
See `.env.example` for configuration values.

## API
Full API documentation: `docs/API.md`
