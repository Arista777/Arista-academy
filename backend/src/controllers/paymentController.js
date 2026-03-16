import {
  getPaymentHistory,
  getPaymentHistoryByUserId,
  getPayments,
  getPendingPayments,
  recordPayment,
} from "../services/paymentService.js";

async function createPayment(req, res) {
  try {
    const payment = await recordPayment(req.body || {});
    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to record payment" });
  }
}

async function listPayments(req, res) {
  try {
    const payments = await getPayments({
      student_id: req.query.student_id,
      status: req.query.status,
      billed_month: req.query.billed_month,
    });
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
}

async function listPaymentHistory(req, res) {
  const { studentId } = req.params;

  try {
    const payments = await getPaymentHistory(studentId);
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch payment history" });
  }
}

async function listMyPaymentHistory(req, res) {
  try {
    const payments = await getPaymentHistoryByUserId(req.user.id);
    res.json(payments);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Failed to fetch payment history" });
  }
}

async function listPendingPayments(req, res) {
  const month = req.query.month || new Date().toISOString().slice(0, 7);

  try {
    const pending = await getPendingPayments(month);
    res.json({ month, pending });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch pending payments" });
  }
}

export { createPayment, listPayments, listPaymentHistory, listMyPaymentHistory, listPendingPayments };
