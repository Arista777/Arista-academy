import { createPayment, listPayments, listPaymentsByStudent, listPendingPaymentsByMonth } from "../models/paymentModel.js";
import { getStudentByUserId } from "../models/studentModel.js";
import { toNumber } from "../utils/numbers.js";

async function recordPayment(payload) {
  const { student_id, membership_plan_id, amount, currency, status, billed_month, paid_at } = payload;
  return createPayment({
    student_id,
    membership_plan_id,
    amount: toNumber(amount),
    currency,
    status,
    billed_month,
    paid_at,
  });
}

async function getPaymentHistory(studentId) {
  return listPaymentsByStudent(studentId);
}

async function getPaymentHistoryByUserId(userId) {
  const student = await getStudentByUserId(userId);
  if (!student) {
    const error = new Error("Student not found");
    error.status = 404;
    throw error;
  }

  return listPaymentsByStudent(student.id);
}

async function getPayments(filter) {
  return listPayments(filter);
}

async function getPendingPayments(month) {
  return listPendingPaymentsByMonth(month);
}

export { recordPayment, getPaymentHistory, getPaymentHistoryByUserId, getPayments, getPendingPayments };
