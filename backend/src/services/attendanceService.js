import {
  createAttendance,
  getAttendanceStats,
  listAttendanceByClass,
  listAttendanceByStudent,
} from "../models/attendanceModel.js";
import { getStudentByUserId } from "../models/studentModel.js";

async function checkIn(payload) {
  return createAttendance(payload);
}

async function getClassAttendanceHistory(classId) {
  return listAttendanceByClass(classId);
}

async function getStudentAttendanceHistory(studentId) {
  return listAttendanceByStudent(studentId);
}

async function getMyAttendanceHistory(userId) {
  const student = await getStudentByUserId(userId);
  if (!student) {
    const error = new Error("Student not found");
    error.status = 404;
    throw error;
  }

  return listAttendanceByStudent(student.id);
}

async function getAttendanceSummary({ classId, studentId }) {
  return getAttendanceStats({ classId, studentId });
}

export {
  checkIn,
  getClassAttendanceHistory,
  getStudentAttendanceHistory,
  getMyAttendanceHistory,
  getAttendanceSummary,
};
