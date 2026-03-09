import express from "express";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;

const app = express();
const PORT = 3000;

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   DATABASE
========================= */
const pool = new Pool({
  host: "db",          // nombre del servicio en docker-compose
  user: "postgres",
  password: "postgres",
  database: "postgres",
  port: 5432,
});

/* =========================
   HEALTH CHECK
========================= */
app.get("/", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "API & DB connected" });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
});

/* =========================
   GET STUDENTS
========================= */
app.get("/students", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY id"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

/* =========================
   CREATE STUDENT
========================= */
app.post("/students", async (req, res) => {
  const { name, belt, age, monthly_fee, payment_date } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO students (name, belt, age, monthly_fee, payment_date)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, belt, age, monthly_fee, payment_date || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create student" });
  }
});

/* =========================
   DELETE STUDENT
========================= */
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM students WHERE id = $1", [id]);
    res.json({ message: "Student deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});
/* =========================
   UPDATE STUDENT
========================= */
app.patch("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { age, belt, status, payment_date } = req.body;

  try {
    const fields = [];
    const values = [];
    let index = 1;

    if (age !== undefined) {
      fields.push(`age = $${index++}`);
      values.push(age);
    }

    if (belt !== undefined) {
      fields.push(`belt = $${index++}`);
      values.push(belt);
    }

    if (status !== undefined) {
      fields.push(`status = $${index++}`);
      values.push(status);
    }

    if (payment_date !== undefined) {
      fields.push(`payment_date = $${index++}`);
      values.push(payment_date || null);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    values.push(id);

    const query = `
      UPDATE students
      SET ${fields.join(", ")}
      WHERE id = $${index}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
});
/* =========================
   CREATE EXPENSE
========================= */
app.post("/expenses", async (req, res) => {
  const { description, amount, month } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO expenses (description, amount, month)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [description, amount, month]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create expense" });
  }
});
/* =========================
   GET EXPENSES BY MONTH
========================= */
app.get("/expenses/:month", async (req, res) => {
  const { month } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM expenses WHERE month = $1 ORDER BY created_at DESC",
      [month]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});
/* =========================
   DASHBOARD DATA
========================= */
app.get("/dashboard/:month", async (req, res) => {
  const { month } = req.params;

  try {
    const activeStudents = await pool.query(
      "SELECT COUNT(*) FROM students WHERE status = 'active'"
    );

    const income = await pool.query(
      "SELECT SUM(monthly_fee) FROM students WHERE status = 'active'"
    );

    const expenses = await pool.query(
      "SELECT SUM(amount) FROM expenses WHERE month = $1",
      [month]
    );

    const totalIncome = Number(income.rows[0].sum) || 0;
    const totalExpenses = Number(expenses.rows[0].sum) || 0;

    res.json({
      active_students: Number(activeStudents.rows[0].count) || 0,
      total_income: totalIncome,
      total_expenses: totalExpenses,
      net_profit: totalIncome - totalExpenses,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dashboard error" });
  }
});

/* =========================
   CLOSE MONTH SNAPSHOT
========================= */
app.post("/close-month/:month", async (req, res) => {
  const { month } = req.params;

  try {
    const activeStudents = await pool.query(
      "SELECT COUNT(*) FROM students WHERE status = 'active'"
    );

    const income = await pool.query(
      "SELECT SUM(monthly_fee) FROM students WHERE status = 'active'"
    );

    const expenses = await pool.query(
      "SELECT SUM(amount) FROM expenses WHERE month = $1",
      [month]
    );

    const totalIncome = Number(income.rows[0].sum) || 0;
    const totalExpenses = Number(expenses.rows[0].sum) || 0;

    const result = await pool.query(
      `INSERT INTO monthly_stats
       (month, active_students, total_income, total_expenses, net_profit)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (month) DO NOTHING
       RETURNING *`,
      [
        month,
        Number(activeStudents.rows[0].count) || 0,
        totalIncome,
        totalExpenses,
        totalIncome - totalExpenses,
      ]
    );

    res.json({ message: "Month closed successfully", data: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Close month failed" });
  }
});
app.post('/stats/generate', async (req, res) => {
  try {
    const now = new Date();
    const month = now.toISOString().slice(0, 7); // formato "YYYY-MM"

    // Contar estudiantes activos
    const studentsResult = await pool.query(
      "SELECT COUNT(*) FROM students WHERE active = true"
    );
    const activeStudents = parseInt(studentsResult.rows[0].count);

    // Sumar ingresos (asumimos que cada estudiante tiene un campo monthly_fee)
    const incomeResult = await pool.query(
      "SELECT COALESCE(SUM(monthly_fee),0) FROM students WHERE active = true"
    );
    const totalIncome = parseInt(incomeResult.rows[0].coalesce);

    // Sumar gastos
    const expensesResult = await pool.query(
      "SELECT COALESCE(SUM(amount),0) FROM expenses"
    );
    const totalExpenses = parseInt(expensesResult.rows[0].coalesce);

    const netProfit = totalIncome - totalExpenses;

    // Insertar si no existe
    await pool.query(
      `INSERT INTO monthly_stats (month, active_students, total_income, total_expenses, net_profit)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (month) DO NOTHING`,
      [month, activeStudents, totalIncome, totalExpenses, netProfit]
    );

    res.json({
      message: "Monthly stats generated",
      month,
      activeStudents,
      totalIncome,
      totalExpenses,
      netProfit
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating stats" });
  }
});


/* =========================
   SERVER
========================= */
app.listen(PORT, () => {
  console.log(`🚀 API running on port ${PORT}`);
});
