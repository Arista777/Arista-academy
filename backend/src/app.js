import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import { healthCheck } from "./controllers/healthController.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", healthCheck);

// Versioned API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/expenses", expenseRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1", dashboardRoutes);

// Legacy routes for backward compatibility
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);
app.use("/expenses", expenseRoutes);
app.use("/", dashboardRoutes);

export default app;
