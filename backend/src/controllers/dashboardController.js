import { closeMonth, generateMonthlyStats, getMonthSummary } from "../services/dashboardService.js";

async function getDashboard(req, res) {
  const { month } = req.params;

  try {
    const data = await getMonthSummary(month);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Dashboard error" });
  }
}

async function closeMonthController(req, res) {
  const { month } = req.params;

  try {
    const result = await closeMonth(month);
    res.json({ message: "Month closed successfully", data: result.record });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Close month failed" });
  }
}

async function generateStats(req, res) {
  try {
    const month = req.body?.month || new Date().toISOString().slice(0, 7);
    const data = await generateMonthlyStats(month);

    res.json({
      message: "Monthly stats generated",
      ...data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating stats" });
  }
}

export { getDashboard, closeMonthController, generateStats };
