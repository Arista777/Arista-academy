import {
  checkIn,
  getAttendanceSummary,
  getClassAttendanceHistory,
  getMyAttendanceHistory,
  getStudentAttendanceHistory,
} from "../services/attendanceService.js";

async function checkInController(req, res) {
  try {
    const record = await checkIn(req.body || {});
    res.status(201).json(record);
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
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
}

async function studentAttendanceHistory(req, res) {
  const { studentId } = req.params;

  try {
    const history = await getStudentAttendanceHistory(studentId);
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch attendance" });
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
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
}

async function attendanceStats(req, res) {
  try {
    const stats = await getAttendanceSummary({
      classId: req.query.class_id,
      studentId: req.query.student_id,
    });
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch attendance stats" });
  }
}

export {
  checkInController,
  classAttendanceHistory,
  studentAttendanceHistory,
  myAttendanceHistory,
  attendanceStats,
};
