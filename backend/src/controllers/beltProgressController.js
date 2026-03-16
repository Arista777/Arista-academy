import { getBeltProgress, getBeltProgressByUserId, recordBeltProgress } from "../services/beltProgressService.js";

async function createBeltProgress(req, res) {
  try {
    const record = await recordBeltProgress(req.body || {});
    res.status(201).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to record belt progress" });
  }
}

async function listBeltProgress(req, res) {
  const { studentId } = req.params;

  try {
    const progress = await getBeltProgress(studentId);
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch belt progress" });
  }
}

async function listMyBeltProgress(req, res) {
  try {
    const progress = await getBeltProgressByUserId(req.user.id);
    res.json(progress);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Failed to fetch belt progress" });
  }
}

export { createBeltProgress, listBeltProgress, listMyBeltProgress };
