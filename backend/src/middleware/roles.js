const ROLE_ADMIN = "admin";
const ROLE_COACH = "coach";
const ROLE_STUDENT = "student";

const ALL_ROLES = [ROLE_ADMIN, ROLE_COACH, ROLE_STUDENT];

function requireRole(roles) {
  const allowed = new Set(roles);

  return function roleGuard(req, res, next) {
    const role = req.user?.role;

    if (!role || !allowed.has(role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
}

function requireSelfOrRole({ role, param = "id" } = {}) {
  return function selfOrRole(req, res, next) {
    const userRole = req.user?.role;

    if (userRole === role) {
      return next();
    }

    if (String(req.user?.id) === String(req.params[param])) {
      return next();
    }

    return res.status(403).json({ error: "Forbidden" });
  };
}

export { ROLE_ADMIN, ROLE_COACH, ROLE_STUDENT, ALL_ROLES, requireRole, requireSelfOrRole };
