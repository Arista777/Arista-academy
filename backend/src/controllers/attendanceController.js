import {
  checkIn,
  getAttendanceSummary,
  getClassAttendanceHistory,
  getMyAttendanceHistory,
  getRecentAttendance,
  getStudentAttendanceHistory,
} from "../services/attendanceService.js";

async function checkInController(req, res) {
  try {
    const attendance = await checkIn(req.body || {});
    res.status(201).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to check in" });
  }
}

async function classAttendanceHistory(req, res) {
  const { classId } = req.params;

  try {
    const history = await getClassAttendanceHistory(classId);
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch class attendance" });
  }
}

async function studentAttendanceHistory(req, res) {
  const { studentId } = req.params;

  try {
    const history = await getStudentAttendanceHistory(studentId);
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch student attendance" });
  }
}

async function myAttendanceHistory(req, res) {
  try {
    const history = await getMyAttendanceHistory(req.user.id);
    res.json(history);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Failed to fetch attendance history" });
  }
}

async function attendanceStats(req, res) {
  try {
    const summary = await getAttendanceSummary({
      classId: req.query.class_id,
      studentId: req.query.student_id,
    });
    res.json(summary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch attendance stats" });
  }
}

async function recentAttendance(req, res) {
  const limit = Number(req.query.limit || 6);

  try {
    const sessions = await getRecentAttendance(limit);
    res.json({ sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recent attendance" });
  }
}

export {
  checkInController,
  classAttendanceHistory,
  studentAttendanceHistory,
  myAttendanceHistory,
  attendanceStats,
  recentAttendance,
};
