CREATE TABLE IF NOT EXISTS academies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS academy_users (
  id SERIAL PRIMARY KEY,
  academy_id INTEGER NOT NULL REFERENCES academies(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'owner',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (academy_id, user_id)
);

CREATE TABLE IF NOT EXISTS membership_plans (
  id SERIAL PRIMARY KEY,
  academy_id INTEGER NOT NULL REFERENCES academies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price NUMERIC(12, 2) NOT NULL DEFAULT 0,
  billing_cycle TEXT NOT NULL DEFAULT 'monthly',
  duration_months INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  academy_id INTEGER REFERENCES academies(id) ON DELETE SET NULL,
  membership_plan_id INTEGER REFERENCES membership_plans(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  belt TEXT NOT NULL,
  age INTEGER NOT NULL,
  monthly_fee NUMERIC(12, 2) NOT NULL DEFAULT 0,
  payment_date DATE,
  status TEXT NOT NULL DEFAULT 'pendiente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS coaches (
  id SERIAL PRIMARY KEY,
  academy_id INTEGER NOT NULL REFERENCES academies(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS classes (
  id SERIAL PRIMARY KEY,
  academy_id INTEGER NOT NULL REFERENCES academies(id) ON DELETE CASCADE,
  coach_id INTEGER REFERENCES coaches(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  discipline TEXT NOT NULL,
  day_of_week SMALLINT NOT NULL,
  starts_at TIME NOT NULL,
  ends_at TIME NOT NULL,
  capacity INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  class_id INTEGER NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  attended_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'present'
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  academy_id INTEGER NOT NULL REFERENCES academies(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  membership_plan_id INTEGER REFERENCES membership_plans(id) ON DELETE SET NULL,
  amount NUMERIC(12, 2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'CRC',
  status TEXT NOT NULL DEFAULT 'paid',
  billed_month TEXT,
  paid_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  academy_id INTEGER REFERENCES academies(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  month TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS monthly_stats (
  id SERIAL PRIMARY KEY,
  month TEXT NOT NULL,
  academy_id INTEGER REFERENCES academies(id) ON DELETE SET NULL,
  active_students INTEGER NOT NULL,
  total_income NUMERIC(12, 2) NOT NULL,
  total_expenses NUMERIC(12, 2) NOT NULL,
  net_profit NUMERIC(12, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_students_academy_id ON students(academy_id);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);
CREATE INDEX IF NOT EXISTS idx_students_membership_plan_id ON students(membership_plan_id);

CREATE INDEX IF NOT EXISTS idx_academy_users_academy_id ON academy_users(academy_id);
CREATE INDEX IF NOT EXISTS idx_academy_users_user_id ON academy_users(user_id);

CREATE INDEX IF NOT EXISTS idx_membership_plans_academy_id ON membership_plans(academy_id);

CREATE INDEX IF NOT EXISTS idx_coaches_academy_id ON coaches(academy_id);
CREATE INDEX IF NOT EXISTS idx_classes_academy_id ON classes(academy_id);
CREATE INDEX IF NOT EXISTS idx_classes_coach_id ON classes(coach_id);
CREATE INDEX IF NOT EXISTS idx_attendance_class_id ON attendance(class_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance(student_id);

CREATE INDEX IF NOT EXISTS idx_payments_academy_id ON payments(academy_id);
CREATE INDEX IF NOT EXISTS idx_payments_student_id ON payments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_billed_month ON payments(billed_month);

CREATE INDEX IF NOT EXISTS idx_expenses_month ON expenses(month);
CREATE INDEX IF NOT EXISTS idx_expenses_academy_id ON expenses(academy_id);

CREATE INDEX IF NOT EXISTS idx_monthly_stats_academy_id ON monthly_stats(academy_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_monthly_stats_academy_month ON monthly_stats(academy_id, month);
CREATE UNIQUE INDEX IF NOT EXISTS idx_monthly_stats_month_null ON monthly_stats(month) WHERE academy_id IS NULL;

ALTER TABLE students ADD COLUMN IF NOT EXISTS academy_id INTEGER REFERENCES academies(id) ON DELETE SET NULL;
ALTER TABLE students ADD COLUMN IF NOT EXISTS membership_plan_id INTEGER REFERENCES membership_plans(id) ON DELETE SET NULL;
ALTER TABLE expenses ADD COLUMN IF NOT EXISTS academy_id INTEGER REFERENCES academies(id) ON DELETE SET NULL;
ALTER TABLE monthly_stats ADD COLUMN IF NOT EXISTS academy_id INTEGER REFERENCES academies(id) ON DELETE SET NULL;
ALTER TABLE monthly_stats ADD COLUMN IF NOT EXISTS id SERIAL;
ALTER TABLE monthly_stats ADD COLUMN IF NOT EXISTS month TEXT;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'monthly_stats_pkey') THEN
    ALTER TABLE monthly_stats DROP CONSTRAINT monthly_stats_pkey;
  END IF;
END $$;

ALTER TABLE monthly_stats ALTER COLUMN month SET NOT NULL;
ALTER TABLE monthly_stats ALTER COLUMN id SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'monthly_stats_id_pkey') THEN
    ALTER TABLE monthly_stats ADD CONSTRAINT monthly_stats_id_pkey PRIMARY KEY (id);
  END IF;
END $$;

UPDATE monthly_stats SET id = DEFAULT WHERE id IS NULL;
