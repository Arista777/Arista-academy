import { createClass, getClassById, listClasses, updateClass } from "../models/classModel.js";

async function getClasses() {
  return listClasses();
}

async function addClass(payload) {
  return createClass(payload);
}

async function patchClass(id, payload) {
  const fields = [];
  const values = [];

  if (payload.name !== undefined) {
    fields.push(`name = $${fields.length + 1}`);
    values.push(payload.name);
  }

  if (payload.discipline !== undefined) {
    fields.push(`discipline = $${fields.length + 1}`);
    values.push(payload.discipline);
  }

  if (payload.day_of_week !== undefined) {
    fields.push(`day_of_week = $${fields.length + 1}`);
    values.push(payload.day_of_week);
  }

  if (payload.starts_at !== undefined) {
    fields.push(`starts_at = $${fields.length + 1}`);
    values.push(payload.starts_at);
  }

  if (payload.ends_at !== undefined) {
    fields.push(`ends_at = $${fields.length + 1}`);
    values.push(payload.ends_at);
  }

  if (payload.capacity !== undefined) {
    fields.push(`capacity = $${fields.length + 1}`);
    values.push(payload.capacity);
  }

  if (payload.coach_id !== undefined) {
    fields.push(`coach_id = $${fields.length + 1}`);
    values.push(payload.coach_id || null);
  }

  if (fields.length === 0) {
    const error = new Error("No fields to update");
    error.status = 400;
    throw error;
  }

  const result = await updateClass(id, fields, values);

  if (result.rowCount === 0) {
    const error = new Error("Class not found");
    error.status = 404;
    throw error;
  }

  return result.rows[0];
}

async function getClass(id) {
  const record = await getClassById(id);
  if (!record) {
    const error = new Error("Class not found");
    error.status = 404;
    throw error;
  }
  return record;
}

export { getClasses, addClass, patchClass, getClass };
