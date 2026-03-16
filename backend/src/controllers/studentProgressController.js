import { getStudentProgress, getStudentProgressByUserId, saveStudentProgress } from "../services/studentProgressService.js";

async function upsertStudentProgress(req, res) {
  try {
    const record = await saveStudentProgress(req.body || {});
    res.status(201).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save student progress" });
  }
}

async function listStudentProgress(req, res) {
  const { studentId } = req.params;

  try {
    const progress = await getStudentProgress(studentId);
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch student progress" });
  }
}

async function listMyStudentProgress(req, res) {
  try {
    const progress = await getStudentProgressByUserId(req.user.id);
    res.json(progress);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Failed to fetch student progress" });
  }
}

export { upsertStudentProgress, listStudentProgress, listMyStudentProgress };
