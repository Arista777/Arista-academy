import {
  addStudent,
  getStudents,
  patchStudent,
  removeStudent,
} from "../services/studentService.js";

async function listStudents(req, res) {
  try {
    const students = await getStudents();
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch students" });
  }
}

async function createStudent(req, res) {
  const { name, belt, age, monthly_fee, payment_date, status } = req.body;

  try {
    const student = await addStudent({
      name,
      belt,
      age,
      monthly_fee,
      payment_date,
      status,
    });

    res.status(201).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create student" });
  }
}

async function deleteStudent(req, res) {
  const { id } = req.params;

  try {
    await removeStudent(id);
    res.json({ message: "Student deleted" });
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Delete failed" });
  }
}

async function updateStudent(req, res) {
  const { id } = req.params;

  try {
    const student = await patchStudent(id, req.body || {});
    res.json(student);
  } catch (error) {
    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Update failed" });
  }
}

export {
  listStudents,
  createStudent,
  deleteStudent,
  updateStudent,
};
