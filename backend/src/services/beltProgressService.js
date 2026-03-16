import { addBeltProgress, listBeltProgress } from "../models/beltProgressModel.js";

async function recordBeltProgress(payload) {
  return addBeltProgress(payload);
}

async function getBeltProgress(studentId) {
  return listBeltProgress(studentId);
}

export { recordBeltProgress, getBeltProgress };
