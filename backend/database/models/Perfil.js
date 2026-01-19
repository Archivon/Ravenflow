const db = require('../db');

class Perfil {
  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM perfis ORDER BY Id');
    return rows;
  }

  static async findById(Id) {
    const [rows] = await db.execute('SELECT * FROM perfis WHERE Id = ?', [Id]);
    return rows[0] || null;
  }

  static async findByName(Nome) {
    const [rows] = await db.execute('SELECT * FROM perfis WHERE Nome = ?', [Nome]);
    return rows[0] || null;
  }

  static async create(Nome) {
    const [result] = await db.execute('INSERT INTO perfis (Nome) VALUES (?)', [Nome]);
    return result.insertId;
  }

  static async update(Id, Nome) {
    await db.execute('UPDATE perfis SET Nome = ? WHERE Id = ?', [Nome, Id]);
    return this.findById(Id);
  }

  static async delete(Id) {
    // Verificar se há utilizadores usando este perfil
    const [rows] = await db.execute(
      'SELECT COUNT(*) as count FROM utilizadores WHERE Perfilld = ?',
      [Id]
    );
    
    if (rows[0].count > 0) {
      throw new Error('Não é possível deletar perfil que está em uso');
    }
    
    await db.execute('DELETE FROM perfis WHERE Id = ?', [Id]);
    return true;
  }
}

module.exports = Perfil;
