const express = require('express');
const Salary = require('../database/models/Salary');
const { authenticateToken } = require('../middleware/auth');
const { validateSalary } = require('../middleware/validation');

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authenticateToken);

// Listar todos os salários
router.get('/', async (req, res, next) => {
  try {
    const filters = {
      year: req.query.year,
      month: req.query.month,
      department: req.query.department
    };
    const salaries = await Salary.findAll(filters);
    res.json(salaries);
  } catch (error) {
    next(error);
  }
});

// Obter salário por ID
router.get('/:id', async (req, res, next) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) {
      return res.status(404).json({ error: 'Registro de salário não encontrado' });
    }
    res.json(salary);
  } catch (error) {
    next(error);
  }
});

// Listar salários de um funcionário
router.get('/employee/:employeeId', async (req, res, next) => {
  try {
    const filters = {
      year: req.query.year,
      month: req.query.month
    };
    const salaries = await Salary.findByEmployee(req.params.employeeId, filters);
    res.json(salaries);
  } catch (error) {
    next(error);
  }
});

// Criar novo registro de salário
router.post('/', validateSalary, async (req, res, next) => {
  try {
    const salaryId = await Salary.create(req.body);
    const salary = await Salary.findById(salaryId);
    res.status(201).json(salary);
  } catch (error) {
    next(error);
  }
});

// Atualizar registro de salário
router.put('/:id', validateSalary, async (req, res, next) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) {
      return res.status(404).json({ error: 'Registro de salário não encontrado' });
    }

    const updatedSalary = await Salary.update(req.params.id, req.body);
    res.json(updatedSalary);
  } catch (error) {
    next(error);
  }
});

// Deletar registro de salário
router.delete('/:id', async (req, res, next) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) {
      return res.status(404).json({ error: 'Registro de salário não encontrado' });
    }

    await Salary.delete(req.params.id);
    res.json({ message: 'Registro de salário deletado com sucesso' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
