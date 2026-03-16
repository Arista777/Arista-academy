import { addClass, getClass, getClasses, patchClass } from "../services/classService.js";
import { getClassAttendanceHistory } from "../services/attendanceService.js";

async function listClasses(req, res) {
  try {
    const classes = await getClasses();
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
}

async function createClass(req, res) {
  try {
    const record = await addClass(req.body || {});
    res.status(201).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create class" });
  }
}

async function updateClass(req, res) {
  const { id } = req.params;

  try {
    const record = await patchClass(id, req.body || {});
    res.json(record);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Failed to update class" });
  }
}

async function getClassController(req, res) {
  const { id } = req.params;

  try {
    const record = await getClass(id);
    res.json(record);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Failed to fetch class" });
  }
}

async function classAttendance(req, res) {
  const { id } = req.params;

  try {
    const history = await getClassAttendanceHistory(id);
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch class attendance" });
  }
}

export { listClasses, createClass, updateClass, getClassController, classAttendance };
