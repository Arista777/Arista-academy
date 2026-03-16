# API Documentation (v1)

Base URL: `/api/v1`

## Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

## Students
- `GET /students`
- `POST /students`
- `GET /students/:id`
- `PATCH /students/:id`
- `POST /students/:id/deactivate`
- `DELETE /students/:id`
- `GET /students/me`

## Expenses
- `POST /expenses`
- `GET /expenses/:month`

## Dashboard
- `GET /dashboard/:month`
- `POST /close-month/:month`
- `POST /stats/generate`

## Payments
- `POST /payments`
- `GET /payments`
- `GET /payments/history/:studentId`
- `GET /payments/history/me`
- `GET /payments/pending?month=YYYY-MM`

## Attendance
- `POST /attendance/check-in`
- `GET /attendance/classes/:classId`
- `GET /attendance/students/:studentId`
- `GET /attendance/me`
- `GET /attendance/stats?class_id=&student_id=`

## Classes
- `GET /classes`
- `POST /classes`
- `GET /classes/:id`
- `PATCH /classes/:id`
- `GET /classes/:id/attendance`

## Membership Plans
- `GET /membership-plans`

## Techniques
- `GET /techniques`
- `POST /techniques`
- `GET /techniques/:id/links`
- `POST /techniques/:id/links`
- `GET /techniques/:id/resources`
- `POST /techniques/:id/resources`

## Martial Arts Progress
- `POST /belt-progress`
- `GET /belt-progress/students/:studentId`
- `POST /class-history`
- `GET /class-history/classes/:classId`
- `POST /student-progress`
- `GET /student-progress/students/:studentId`

## Roles
- `admin`: full access
- `coach`: classes, attendance, techniques, martial arts progress
- `student`: self profile, self attendance, self payments
