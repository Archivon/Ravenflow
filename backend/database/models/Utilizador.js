const db = require('../db');
const { generateUniqueReferencialId } = require('../../utils/generateReferencialId');

class Utilizador {
  static async create(utilizadorData) {
    const { Nome, Email, SenhaHash, Telefone, Perfilld = 2, EmailVerificado = 0, google_id = null } = utilizadorData;
    
    // Gerar ReferencialID único
    const ReferencialID = await generateUniqueReferencialId(db, 'utilizadores');
    
    await db.execute(
      `INSERT INTO utilizadores (ReferencialID, Nome, Email, SenhaHash, Telefone, Perfilld, EmailVerificado, google_id, DataRegisto) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [ReferencialID, Nome, Email, SenhaHash, Telefone, Perfilld, EmailVerificado, google_id]
    );
    
    return ReferencialID;
  }

  static async findByReferencialID(ReferencialID) {
    const [rows] = await db.execute(
      `SELECT u.*, p.Nome as PerfilNome 
       FROM utilizadores u 
       LEFT JOIN perfis p ON u.Perfilld = p.Id 
       WHERE u.ReferencialID = ?`,
      [ReferencialID]
    );
    return rows[0] || null;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute(
      `SELECT u.*, p.Nome as PerfilNome 
       FROM utilizadores u 
       LEFT JOIN perfis p ON u.Perfilld = p.Id 
       WHERE u.Email = ?`,
      [email]
    );
    return rows[0] || null;
  }

  static async findByGoogleId(google_id) {
    const [rows] = await db.execute(
      `SELECT u.*, p.Nome as PerfilNome 
       FROM utilizadores u 
       LEFT JOIN perfis p ON u.Perfilld = p.Id 
       WHERE u.google_id = ?`,
      [google_id]
    );
    return rows[0] || null;
  }

  static async update(ReferencialID, utilizadorData) {
    const { Nome, Email, Telefone, Perfilld, EmailVerificado, google_id } = utilizadorData;
    
    const updates = [];
    const params = [];
    
    if (Nome !== undefined) {
      updates.push('Nome = ?');
      params.push(Nome);
    }
    if (Email !== undefined) {
      updates.push('Email = ?');
      params.push(Email);
    }
    if (Telefone !== undefined) {
      updates.push('Telefone = ?');
      params.push(Telefone);
    }
    if (Perfilld !== undefined) {
      updates.push('Perfilld = ?');
      params.push(Perfilld);
    }
    if (EmailVerificado !== undefined) {
      updates.push('EmailVerificado = ?');
      params.push(EmailVerificado);
    }
    if (google_id !== undefined) {
      updates.push('google_id = ?');
      params.push(google_id);
    }
    
    if (updates.length === 0) {
      return this.findByReferencialID(ReferencialID);
    }
    
    params.push(ReferencialID);
    
    await db.execute(
      `UPDATE utilizadores SET ${updates.join(', ')} WHERE ReferencialID = ?`,
      params
    );
    
    return this.findByReferencialID(ReferencialID);
  }

  static async updateLastLogin(ReferencialID) {
    await db.execute(
      'UPDATE utilizadores SET UltimoLogin = NOW() WHERE ReferencialID = ?',
      [ReferencialID]
    );
  }

  static async updatePassword(ReferencialID, SenhaHash) {
    await db.execute(
      'UPDATE utilizadores SET SenhaHash = ? WHERE ReferencialID = ?',
      [SenhaHash, ReferencialID]
    );
  }

  static async delete(ReferencialID) {
    await db.execute('DELETE FROM utilizadores WHERE ReferencialID = ?', [ReferencialID]);
    return true;
  }

  static async findAll(filters = {}) {
    let query = `SELECT u.*, p.Nome as PerfilNome 
                 FROM utilizadores u 
                 LEFT JOIN perfis p ON u.Perfilld = p.Id 
                 WHERE 1=1`;
    const params = [];
    
    if (filters.Perfilld) {
      query += ' AND u.Perfilld = ?';
      params.push(filters.Perfilld);
    }
    
    if (filters.EmailVerificado !== undefined) {
      query += ' AND u.EmailVerificado = ?';
      params.push(filters.EmailVerificado);
    }
    
    query += ' ORDER BY u.DataRegisto DESC';
    
    const [rows] = await db.execute(query, params);
    return rows;
  }
}

module.exports = Utilizador;
