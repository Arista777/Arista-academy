import { createClass, getClassById, listClasses, updateClass } from "../models/classModel.js";

const dayLabels = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

function formatTime(timeValue) {
  if (!timeValue) return "";
  const [hours, minutes] = String(timeValue).split(":");
  const hourNumber = Number(hours);
  const suffix = hourNumber >= 12 ? "PM" : "AM";
  const hour12 = ((hourNumber + 11) % 12) + 1;
  return `${hour12}:${minutes} ${suffix}`;
}

function formatSchedule(dayOfWeek, startsAt) {
  return `${dayLabels[dayOfWeek]} · ${formatTime(startsAt)}`;
}

function nextSessionDate(dayOfWeek, startsAt) {
  const now = new Date();
  const target = new Date(now);
  const currentDow = now.getDay();
  const diff = (dayOfWeek - currentDow + 7) % 7;
  target.setDate(now.getDate() + diff);

  if (diff === 0) {
    const [h, m] = String(startsAt).split(":");
    const session = new Date(now);
    session.setHours(Number(h), Number(m || 0), 0, 0);
    if (session < now) {
      target.setDate(target.getDate() + 7);
    }
  }

  const [hour, minute] = String(startsAt).split(":");
  target.setHours(Number(hour), Number(minute || 0), 0, 0);
  return target;
}

async function getClasses() {
  return listClasses();
}

async function getClassesSummary() {
  const classes = await listClasses();

  const formattedClasses = classes.map((item) => ({
    id: item.id,
    name: item.name,
    coach: item.coach_name || "Sin coach",
    capacity: item.capacity || "-",
    schedule: formatSchedule(item.day_of_week, item.starts_at),
  }));

  const sessions = classes
    .map((item) => ({
      id: item.id,
      className: item.name,
      when: nextSessionDate(item.day_of_week, item.starts_at),
    }))
    .sort((a, b) => a.when - b.when)
    .slice(0, 3)
    .map((item) => {
      const now = new Date();
      const diffDays = Math.round((item.when - now) / (1000 * 60 * 60 * 24));
      const label = diffDays === 0 ? "Hoy" : diffDays === 1 ? "Manana" : dayLabels[item.when.getDay()];
      return {
        time: `${label} ${formatTime(item.when.toTimeString().slice(0, 5))}`,
        className: item.className,
        roster: "-",
      };
    });

  return { classes: formattedClasses, sessions };
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

export { getClasses, getClassesSummary, addClass, patchClass, getClass };
