const db = require('../db');
const { generateUniqueReferencialId } = require('../../utils/generateReferencialId');

class Salary {
  static async create(salaryData) {
    const { employee_referencial_id, base_salary, bonuses, deductions, month, year } = salaryData;
    const net_salary = base_salary + (bonuses || 0) - (deductions || 0);
    
    // Gerar ReferencialID único
    const ReferencialID = await generateUniqueReferencialId(db, 'salaries');
    
    await db.execute(
      `INSERT INTO salaries (ReferencialID, employee_referencial_id, base_salary, bonuses, deductions, net_salary, month, year, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [ReferencialID, employee_referencial_id, base_salary, bonuses || 0, deductions || 0, net_salary, month, year]
    );
    return ReferencialID;
  }

  static async findByReferencialID(ReferencialID) {
    const [rows] = await db.execute(
      `SELECT s.*, e.name as employee_name, e.position 
       FROM salaries s 
       JOIN employees e ON s.employee_referencial_id = e.ReferencialID 
       WHERE s.ReferencialID = ?`,
      [ReferencialID]
    );
    return rows[0] || null;
  }

  static async findById(id) {
    // Mantido para compatibilidade, mas agora busca por ReferencialID
    return this.findByReferencialID(id);
  }

  static async findByEmployee(employeeReferencialId, filters = {}) {
    let query = `SELECT s.*, e.name as employee_name, e.position 
                 FROM salaries s 
                 JOIN employees e ON s.employee_referencial_id = e.ReferencialID 
                 WHERE s.employee_referencial_id = ?`;
    const params = [employeeReferencialId];

    if (filters.year) {
      query += ' AND s.year = ?';
      params.push(filters.year);
    }

    if (filters.month) {
      query += ' AND s.month = ?';
      params.push(filters.month);
    }

    query += ' ORDER BY s.year DESC, s.month DESC';

    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async findAll(filters = {}) {
    let query = `SELECT s.*, e.name as employee_name, e.position, e.department 
                 FROM salaries s 
                 JOIN employees e ON s.employee_referencial_id = e.ReferencialID 
                 WHERE 1=1`;
    const params = [];

    if (filters.year) {
      query += ' AND s.year = ?';
      params.push(filters.year);
    }

    if (filters.month) {
      query += ' AND s.month = ?';
      params.push(filters.month);
    }

    if (filters.department) {
      query += ' AND e.department = ?';
      params.push(filters.department);
    }

    query += ' ORDER BY s.year DESC, s.month DESC, e.name ASC';

    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async update(ReferencialID, salaryData) {
    const { base_salary, bonuses, deductions } = salaryData;
    const net_salary = base_salary + (bonuses || 0) - (deductions || 0);
    
    await db.execute(
      `UPDATE salaries 
       SET base_salary = ?, bonuses = ?, deductions = ?, net_salary = ? 
       WHERE ReferencialID = ?`,
      [base_salary, bonuses || 0, deductions || 0, net_salary, ReferencialID]
    );
    return this.findByReferencialID(ReferencialID);
  }

  static async delete(ReferencialID) {
    await db.execute('DELETE FROM salaries WHERE ReferencialID = ?', [ReferencialID]);
    return true;
  }
}

module.exports = Salary;
