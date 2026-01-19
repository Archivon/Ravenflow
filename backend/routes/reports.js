const express = require('express');
const Salary = require('../database/models/Salary');
const Employee = require('../database/models/Employee');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Todas as rotas requerem autenticação
router.use(authenticateToken);

// Relatório de salários por período
router.get('/salaries', async (req, res, next) => {
  try {
    const { year, month, department } = req.query;
    const filters = { year, month, department };
    
    const salaries = await Salary.findAll(filters);
    
    const total = salaries.reduce((sum, s) => sum + parseFloat(s.net_salary), 0);
    const average = salaries.length > 0 ? total / salaries.length : 0;
    
    res.json({
      period: { year, month, department },
      total_salaries: salaries.length,
      total_amount: total,
      average_salary: average,
      salaries
    });
  } catch (error) {
    next(error);
  }
});

// Relatório de funcionários por departamento
router.get('/employees-by-department', async (req, res, next) => {
  try {
    const employees = await Employee.findAll();
    
    const byDepartment = employees.reduce((acc, emp) => {
      const dept = emp.department || 'Sem departamento';
      if (!acc[dept]) {
        acc[dept] = [];
      }
      acc[dept].push(emp);
      return acc;
    }, {});
    
    const summary = Object.keys(byDepartment).map(dept => ({
      department: dept,
      count: byDepartment[dept].length,
      employees: byDepartment[dept]
    }));
    
    res.json({
      total_employees: employees.length,
      departments: summary
    });
  } catch (error) {
    next(error);
  }
});

// Relatório de gastos mensais
router.get('/monthly-expenses', async (req, res, next) => {
  try {
    const { year } = req.query;
    const yearFilter = year || new Date().getFullYear();
    
    const monthlyData = [];
    
    for (let month = 1; month <= 12; month++) {
      const salaries = await Salary.findAll({ year: yearFilter, month });
      const total = salaries.reduce((sum, s) => sum + parseFloat(s.net_salary), 0);
      
      monthlyData.push({
        month,
        year: yearFilter,
        total_expenses: total,
        employees_count: salaries.length
      });
    }
    
    const yearTotal = monthlyData.reduce((sum, m) => sum + m.total_expenses, 0);
    
    res.json({
      year: yearFilter,
      monthly_data: monthlyData,
      year_total: yearTotal,
      monthly_average: yearTotal / 12
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
