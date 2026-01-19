const db = require('../db');
const { generateUniqueReferencialId } = require('../../utils/generateReferencialId');

class Employee {
  static async create(employeeData) {
    const { name, email, nif, position, department, hire_date, salary } = employeeData;
    
    // Gerar ReferencialID único
    const ReferencialID = await generateUniqueReferencialId(db, 'employees');
    
    await db.execute(
      `INSERT INTO employees (ReferencialID, name, email, nif, position, department, hire_date, salary, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [ReferencialID, name, email, nif, position, department, hire_date, salary]
    );
    return ReferencialID;
  }

  static async findByReferencialID(ReferencialID) {
    const [rows] = await db.execute(
      'SELECT * FROM employees WHERE ReferencialID = ?',
      [ReferencialID]
    );
    return rows[0] || null;
  }

  static async findById(id) {
    // Mantido para compatibilidade, mas agora busca por ReferencialID
    return this.findByReferencialID(id);
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM employees WHERE 1=1';
    const params = [];

    if (filters.department) {
      query += ' AND department = ?';
      params.push(filters.department);
    }

    if (filters.position) {
      query += ' AND position = ?';
      params.push(filters.position);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await db.execute(query, params);
    return rows;
  }

  static async update(ReferencialID, employeeData) {
    const { name, email, nif, position, department, hire_date, salary } = employeeData;
    await db.execute(
      `UPDATE employees 
       SET name = ?, email = ?, nif = ?, position = ?, department = ?, hire_date = ?, salary = ? 
       WHERE ReferencialID = ?`,
      [name, email, nif, position, department, hire_date, salary, ReferencialID]
    );
    return this.findByReferencialID(ReferencialID);
  }

  static async delete(ReferencialID) {
    await db.execute('DELETE FROM employees WHERE ReferencialID = ?', [ReferencialID]);
    return true;
  }

  static async findByNif(nif) {
    const [rows] = await db.execute(
      'SELECT * FROM employees WHERE nif = ?',
      [nif]
    );
    return rows[0] || null;
  }
}

module.exports = Employee;
