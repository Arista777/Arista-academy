export const demoDashboard = {
  stats: [
    { label: "Estudiantes activos", value: 214, change: "+8%" },
    { label: "Membresias activas", value: 186, change: "+5%" },
    { label: "Pagos pendientes", value: 9, change: "-12%" },
    { label: "Asistencias semana", value: 642, change: "+14%" },
  ],
  revenue: [
    { month: "Oct", value: 38 },
    { month: "Nov", value: 42 },
    { month: "Dic", value: 46 },
    { month: "Ene", value: 51 },
    { month: "Feb", value: 58 },
    { month: "Mar", value: 62 },
  ],
  alerts: [
    "3 estudiantes con pago vencido",
    "2 clases con lista de espera",
    "1 alumno con inactividad de 30 dias",
  ],
  schedule: [
    { time: "6:00 AM", name: "BJJ Fundamentals", coach: "Coach Vega" },
    { time: "12:30 PM", name: "Muay Thai Pads", coach: "Coach Rojas" },
    { time: "7:00 PM", name: "BJJ Sparring", coach: "Coach Lima" },
  ],
  attendance: [
    { label: "BJJ", value: 82 },
    { label: "Muay Thai", value: 64 },
    { label: "Open Mat", value: 41 },
  ],
};

export const demoStudents = [
  {
    id: 1,
    name: "Ana Perez",
    belt: "Blue",
    status: "Al dia",
    plan: "Unlimited",
    progress: "2 stripes",
    lastClass: "2 dias",
  },
  {
    id: 2,
    name: "Luis Mora",
    belt: "White",
    status: "Pendiente",
    plan: "BJJ 3x",
    progress: "Onboarding",
    lastClass: "5 dias",
  },
  {
    id: 3,
    name: "Carla Soto",
    belt: "Purple",
    status: "Atrasado",
    plan: "Full Access",
    progress: "Ready for brown",
    lastClass: "1 dia",
  },
  {
    id: 4,
    name: "Mario Diaz",
    belt: "Brown",
    status: "Al dia",
    plan: "Pro Team",
    progress: "Competition prep",
    lastClass: "3 dias",
  },
];

export const demoPayments = [
  { id: 1, name: "Ana Perez", amount: "CRC 35.000", status: "Pagado", method: "Tarjeta" },
  { id: 2, name: "Luis Mora", amount: "CRC 30.000", status: "Pendiente", method: "Transferencia" },
  { id: 3, name: "Carla Soto", amount: "CRC 45.000", status: "Vencido", method: "Efectivo" },
];

export const demoPlans = [
  { plan: "Unlimited", active: 94 },
  { plan: "BJJ 3x", active: 48 },
  { plan: "Muay Thai", active: 32 },
];

export const demoAttendance = [
  { id: 1, className: "BJJ Fundamentals", date: "2026-03-15", attendees: 18, occupancy: "75%" },
  { id: 2, className: "Muay Thai", date: "2026-03-14", attendees: 12, occupancy: "60%" },
  { id: 3, className: "Open Mat", date: "2026-03-14", attendees: 26, occupancy: "92%" },
];

export const demoStreaks = [
  { id: 1, name: "Ana Perez", days: 12 },
  { id: 2, name: "Carla Soto", days: 9 },
  { id: 3, name: "Mario Diaz", days: 8 },
];

export const demoClasses = [
  {
    id: 1,
    name: "BJJ Fundamentals",
    coach: "Coach Vega",
    schedule: "Lun / Mie / Vie · 6:00 AM",
    capacity: "24",
  },
  {
    id: 2,
    name: "Muay Thai Power",
    coach: "Coach Rojas",
    schedule: "Mar / Jue · 7:30 PM",
    capacity: "20",
  },
  {
    id: 3,
    name: "Competition Team",
    coach: "Coach Lima",
    schedule: "Sab · 9:00 AM",
    capacity: "16",
  },
];

export const demoSessions = [
  { id: 1, time: "Hoy 6:00 AM", className: "BJJ Fundamentals", roster: "18/24" },
  { id: 2, time: "Hoy 7:30 PM", className: "Muay Thai Power", roster: "14/20" },
  { id: 3, time: "Manana 6:00 AM", className: "BJJ Fundamentals", roster: "12/24" },
];

export const demoTechniques = [
  {
    id: 1,
    name: "Triangle choke",
    category: "Guard attacks",
    related: ["Armbar", "Omoplata"],
    resources: "Video + Drills",
  },
  {
    id: 2,
    name: "Knee slice pass",
    category: "Passing",
    related: ["Underhook", "Crossface"],
    resources: "Notes + Sparring cues",
  },
  {
    id: 3,
    name: "Teep",
    category: "Muay Thai basics",
    related: ["Jab", "Rear kick"],
    resources: "Video + Pad combos",
  },
];

export const demoBelts = [
  { belt: "White", count: 48 },
  { belt: "Blue", count: 36 },
  { belt: "Purple", count: 22 },
  { belt: "Brown", count: 12 },
  { belt: "Black", count: 6 },
];

export const demoPromotions = [
  { id: 1, name: "Ana Perez", belt: "Blue", date: "Mar 10" },
  { id: 2, name: "Mario Diaz", belt: "Brown", date: "Mar 08" },
  { id: 3, name: "Carla Soto", belt: "Purple", date: "Mar 01" },
];

export const demoProgress = [
  {
    id: 1,
    name: "Ana Perez",
    focus: "Guard attacks",
    goals: "Triangle + Armbar",
    checkins: "8 sesiones",
  },
  {
    id: 2,
    name: "Luis Mora",
    focus: "Fundamentals",
    goals: "Shrimp + Frames",
    checkins: "5 sesiones",
  },
  {
    id: 3,
    name: "Carla Soto",
    focus: "Passing",
    goals: "Knee slice",
    checkins: "10 sesiones",
  },
];
