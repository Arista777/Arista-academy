import { listStudentProgress, upsertStudentProgress } from "../models/studentProgressModel.js";
import { getStudentByUserId } from "../models/studentModel.js";

async function saveStudentProgress(payload) {
  return upsertStudentProgress(payload);
}

async function getStudentProgress(studentId) {
  return listStudentProgress(studentId);
}

async function getStudentProgressByUserId(userId) {
  const student = await getStudentByUserId(userId);
  if (!student) {
    const error = new Error("Student not found");
    error.status = 404;
    throw error;
  }

  return listStudentProgress(student.id);
}

export { saveStudentProgress, getStudentProgress, getStudentProgressByUserId };
