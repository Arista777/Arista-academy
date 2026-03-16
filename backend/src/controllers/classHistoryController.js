import { getClassHistory, recordClassHistory } from "../services/classHistoryService.js";

async function createClassHistory(req, res) {
  try {
    const record = await recordClassHistory(req.body || {});
    res.status(201).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to record class history" });
  }
}

async function listClassHistory(req, res) {
  const { classId } = req.params;

  try {
    const history = await getClassHistory(classId);
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch class history" });
  }
}

export { createClassHistory, listClassHistory };
