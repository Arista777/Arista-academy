import { listStudentProgress, upsertStudentProgress } from "../models/studentProgressModel.js";

async function saveStudentProgress(payload) {
  return upsertStudentProgress(payload);
}

async function getStudentProgress(studentId) {
  return listStudentProgress(studentId);
}

export { saveStudentProgress, getStudentProgress };
