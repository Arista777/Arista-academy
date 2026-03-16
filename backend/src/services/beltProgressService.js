import { addBeltProgress, listBeltProgress } from "../models/beltProgressModel.js";
import { getStudentByUserId } from "../models/studentModel.js";

async function recordBeltProgress(payload) {
  return addBeltProgress(payload);
}

async function getBeltProgress(studentId) {
  return listBeltProgress(studentId);
}

async function getBeltProgressByUserId(userId) {
  const student = await getStudentByUserId(userId);
  if (!student) {
    const error = new Error("Student not found");
    error.status = 404;
    throw error;
  }

  return listBeltProgress(student.id);
}

export { recordBeltProgress, getBeltProgress, getBeltProgressByUserId };
