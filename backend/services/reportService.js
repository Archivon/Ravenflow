const Salary = require('../database/models/Salary');
const Employee = require('../database/models/Employee');

class ReportService {
  /**
   * Gera relatório completo de salários
   */
  static async generateSalaryReport(filters = {}) {
    const salaries = await Salary.findAll(filters);
    
    const summary = {
      total_records: salaries.length,
      total_amount: salaries.reduce((sum, s) => sum + parseFloat(s.net_salary), 0),
      average_salary: 0,
      highest_salary: null,
      lowest_salary: null,
      by_department: {}
    };

    if (salaries.length > 0) {
      summary.average_salary = summary.total_amount / salaries.length;
      summary.highest_salary = salaries.reduce((max, s) => 
        parseFloat(s.net_salary) > parseFloat(max.net_salary) ? s : max
      );
      summary.lowest_salary = salaries.reduce((min, s) => 
        parseFloat(s.net_salary) < parseFloat(min.net_salary) ? s : min
      );

      // Agrupar por departamento
      salaries.forEach(salary => {
        const dept = salary.department || 'Sem departamento';
        if (!summary.by_department[dept]) {
          summary.by_department[dept] = {
            count: 0,
            total: 0,
            average: 0
          };
        }
        summary.by_department[dept].count++;
        summary.by_department[dept].total += parseFloat(salary.net_salary);
      });

      // Calcular média por departamento
      Object.keys(summary.by_department).forEach(dept => {
        const deptData = summary.by_department[dept];
        deptData.average = deptData.total / deptData.count;
      });
    }

    return {
      filters,
      summary,
      salaries
    };
  }

  /**
   * Gera relatório de funcionários
   */
  static async generateEmployeeReport() {
    const employees = await Employee.findAll();
    
    const byDepartment = {};
    const byPosition = {};

    employees.forEach(emp => {
      // Por departamento
      const dept = emp.department || 'Sem departamento';
      byDepartment[dept] = (byDepartment[dept] || 0) + 1;

      // Por cargo
      const pos = emp.position || 'Sem cargo';
      byPosition[pos] = (byPosition[pos] || 0) + 1;
    });

    return {
      total_employees: employees.length,
      by_department: byDepartment,
      by_position: byPosition,
      employees
    };
  }
}

module.exports = ReportService;
