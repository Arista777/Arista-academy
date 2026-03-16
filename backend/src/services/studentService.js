import {
  createStudent,
  deleteStudent,
  listStudents,
  updateStudent,
} from "../models/studentModel.js";
import { toNumber } from "../utils/numbers.js";

async function getStudents() {
  return listStudents();
}

async function addStudent({
  name,
  belt,
  age,
  monthly_fee,
  payment_date,
  status,
}) {
  return createStudent({
    name,
    belt,
    age,
    monthly_fee: toNumber(monthly_fee),
    payment_date: payment_date || null,
    status: status || "pendiente",
  });
}

async function removeStudent(id) {
  const deleted = await deleteStudent(id);
  if (deleted === 0) {
    const error = new Error("Student not found");
    error.status = 404;
    throw error;
  }
}

async function patchStudent(id, payload) {
  const { name, monthly_fee, age, belt, status, payment_date } = payload;
  const fields = [];
  const values = [];

  if (name !== undefined) {
    fields.push(`name = $${fields.length + 1}`);
    values.push(name);
  }

  if (monthly_fee !== undefined) {
    fields.push(`monthly_fee = $${fields.length + 1}`);
    values.push(toNumber(monthly_fee));
  }

  if (age !== undefined) {
    fields.push(`age = $${fields.length + 1}`);
    values.push(age);
  }

  if (belt !== undefined) {
    fields.push(`belt = $${fields.length + 1}`);
    values.push(belt);
  }

  if (status !== undefined) {
    fields.push(`status = $${fields.length + 1}`);
    values.push(status);
  }

  if (payment_date !== undefined) {
    fields.push(`payment_date = $${fields.length + 1}`);
    values.push(payment_date || null);
  }

  if (fields.length === 0) {
    const error = new Error("No fields to update");
    error.status = 400;
    throw error;
  }

  const result = await updateStudent(id, fields, values);

  if (result.rowCount === 0) {
    const error = new Error("Student not found");
    error.status = 404;
    throw error;
  }

  return result.rows[0];
}

export {
  getStudents,
  addStudent,
  removeStudent,
  patchStudent,
};
