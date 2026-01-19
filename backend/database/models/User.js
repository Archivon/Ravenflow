const db = require('../db');

class User {
  static async create(userData) {
    const { name, email, password, role = 'user' } = userData;
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())',
      [name, email, password, role]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0] || null;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  static async update(id, userData) {
    const { name, email, role } = userData;
    await db.execute(
      'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
      [name, email, role, id]
    );
    return this.findById(id);
  }

  static async delete(id) {
    await db.execute('DELETE FROM users WHERE id = ?', [id]);
    return true;
  }

  static async findAll() {
    const [rows] = await db.execute(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    return rows;
  }
}

module.exports = User;
