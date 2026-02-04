const validateEmployee = (req, res, next) => {
  const { name, email, nif, position, department, hire_date, salary } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Nome é obrigatório');
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email válido é obrigatório');
  }

  if (!nif || !/^\d{9}$/.test(nif.replace(/\D/g, ''))) {
    errors.push('NIF válido é obrigatório (9 dígitos)');
  }

  if (!position || position.trim().length === 0) {
    errors.push('Cargo é obrigatório');
  }

  if (!department || department.trim().length === 0) {
    errors.push('Departamento é obrigatório');
  }

  if (!hire_date) {
    errors.push('Data de contratação é obrigatória');
  }

  if (!salary || salary <= 0) {
    errors.push('Salário válido é obrigatório');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const validateSalary = (req, res, next) => {
  const { employee_id, base_salary, month, year } = req.body;
  const errors = [];

  if (!employee_id) {
    errors.push('ID do funcionário é obrigatório');
  }

  if (!base_salary || base_salary <= 0) {
    errors.push('Salário base válido é obrigatório');
  }

  if (!month || month < 1 || month > 12) {
    errors.push('Mês válido é obrigatório (1-12)');
  }

  if (!year || year < 2000 || year > 2100) {
    errors.push('Ano válido é obrigatório');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

module.exports = {
  validateEmployee,
  validateSalary
};
