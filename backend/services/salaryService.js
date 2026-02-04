const Salary = require('../database/models/Salary');

class SalaryService {
  /**
   * Calcula o salário líquido com base nos valores fornecidos
   */
  static calculateNetSalary(baseSalary, bonuses = 0, deductions = 0) {
    return baseSalary + bonuses - deductions;
  }

  /**
   * Calcula o total de salários de um funcionário em um período
   */
  static async getEmployeeTotalSalary(employeeId, year) {
    const salaries = await Salary.findByEmployee(employeeId, { year });
    return salaries.reduce((total, salary) => total + parseFloat(salary.net_salary), 0);
  }

  /**
   * Calcula a média salarial de um departamento
   */
  static async getDepartmentAverageSalary(department, year, month) {
    const filters = { department, year, month };
    const salaries = await Salary.findAll(filters);
    
    if (salaries.length === 0) return 0;
    
    const total = salaries.reduce((sum, s) => sum + parseFloat(s.net_salary), 0);
    return total / salaries.length;
  }

  /**
   * Gera resumo salarial anual
   */
  static async getAnnualSummary(year) {
    const monthlyData = [];
    
    for (let month = 1; month <= 12; month++) {
      const salaries = await Salary.findAll({ year, month });
      const total = salaries.reduce((sum, s) => sum + parseFloat(s.net_salary), 0);
      
      monthlyData.push({
        month,
        total: total,
        count: salaries.length,
        average: salaries.length > 0 ? total / salaries.length : 0
      });
    }
    
    const yearTotal = monthlyData.reduce((sum, m) => sum + m.total, 0);
    
    return {
      year,
      monthly_data: monthlyData,
      total: yearTotal,
      average: yearTotal / 12,
      total_employees: Math.max(...monthlyData.map(m => m.count))
    };
  }
}

module.exports = SalaryService;
