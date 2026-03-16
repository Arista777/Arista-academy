import { addClassHistory, listClassHistory } from "../models/classHistoryModel.js";

async function recordClassHistory(payload) {
  return addClassHistory(payload);
}

async function getClassHistory(classId) {
  return listClassHistory(classId);
}

export { recordClassHistory, getClassHistory };
