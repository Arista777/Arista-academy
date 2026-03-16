import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudentByUserId,
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
  user_id,
}) {
  return createStudent({
    name,
    belt,
    age,
    monthly_fee: toNumber(monthly_fee),
    payment_date: payment_date || null,
    status: status || "pendiente",
    user_id,
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

async function deactivateStudent(id) {
  const result = await updateStudent(id, ["status = $1"], ["inactive"]);
  if (result.rowCount === 0) {
    const error = new Error("Student not found");
    error.status = 404;
    throw error;
  }
  return result.rows[0];
}

async function getStudentProfile(id) {
  const student = await getStudentById(id);
  if (!student) {
    const error = new Error("Student not found");
    error.status = 404;
    throw error;
  }

  return { student };
}

async function getStudentProfileByUserId(userId) {
  const student = await getStudentByUserId(userId);
  if (!student) {
    const error = new Error("Student not found");
    error.status = 404;
    throw error;
  }

  return { student };
}

async function patchStudent(id, payload) {
  const { name, monthly_fee, age, belt, status, payment_date, user_id } = payload;
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

  if (user_id !== undefined) {
    fields.push(`user_id = $${fields.length + 1}`);
    values.push(user_id || null);
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
  deactivateStudent,
  getStudentProfile,
  getStudentProfileByUserId,
};
