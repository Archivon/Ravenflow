const express = require('express');
const Employee = require('../database/models/Employee');
const { authenticateToken } = require('../middleware/auth');
const { validateEmployee } = require('../middleware/validation');

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authenticateToken);

// Listar todos os funcionários
router.get('/', async (req, res, next) => {
  try {
    const filters = {
      department: req.query.department,
      position: req.query.position
    };
    const employees = await Employee.findAll(filters);
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

// Obter funcionário por ID
router.get('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json(employee);
  } catch (error) {
    next(error);
  }
});

// Criar novo funcionário
router.post('/', validateEmployee, async (req, res, next) => {
  try {
    // Verificar se NIF já existe
    const existingEmployee = await Employee.findByNif(req.body.nif.replace(/\D/g, ''));
    if (existingEmployee) {
      return res.status(409).json({ error: 'NIF já cadastrado' });
    }

    const employeeId = await Employee.create({
      ...req.body,
      nif: req.body.nif.replace(/\D/g, '') // Remove formatação do NIF
    });
    
    const employee = await Employee.findById(employeeId);
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
});

// Atualizar funcionário
router.put('/:id', validateEmployee, async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    const updatedEmployee = await Employee.update(req.params.id, {
      ...req.body,
      nif: req.body.nif.replace(/\D/g, '') // Remove formatação do NIF
    });
    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
});

// Deletar funcionário
router.delete('/:id', async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    await Employee.delete(req.params.id);
    res.json({ message: 'Funcionário deletado com sucesso' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
