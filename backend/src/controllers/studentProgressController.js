import { getStudentProgress, saveStudentProgress } from "../services/studentProgressService.js";

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

export { upsertStudentProgress, listStudentProgress };
