import {
  addClass,
  getClass,
  getClasses,
  getClassesSummary,
  patchClass,
} from "../services/classService.js";
import { getAttendanceStats } from "../services/attendanceService.js";

async function listClasses(req, res) {
  try {
    const classes = await getClasses();
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
}

async function classSummary(req, res) {
  try {
    const summary = await getClassesSummary();
    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch class summary" });
  }
}

async function createClass(req, res) {
  try {
    const created = await addClass(req.body || {});
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create class" });
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

async function updateClass(req, res) {
  const { id } = req.params;

  try {
    const updated = await patchClass(id, req.body || {});
    res.json(updated);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Failed to update class" });
  }
}

async function classAttendance(req, res) {
  const { id } = req.params;

  try {
    const summary = await getAttendanceStats({ classId: id });
    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch class attendance" });
  }
}

export {
  listClasses,
  classSummary,
  createClass,
  getClassController,
  updateClass,
  classAttendance,
};
