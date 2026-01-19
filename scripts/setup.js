const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function setup() {
  let connection;

  try {
    // Conectar ao MySQL (sem especificar database)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('Conectado ao MySQL');

    // Criar database se não existir
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'ravenflow'} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log('Database criada/verificada');

    // Usar o database
    await connection.query(`USE ${process.env.DB_NAME || 'ravenflow'}`);

    // Ler e executar schema
    const fs = require('fs');
    const path = require('path');
    const schemaPath = path.join(__dirname, '../sql/schema.sql');
    
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, 'utf8');
      const statements = schema.split(';').filter(s => s.trim().length > 0);
      
      for (const statement of statements) {
        if (statement.trim()) {
          await connection.query(statement);
        }
      }
      console.log('Tabelas criadas');
    }

    // Criar usuário admin padrão
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ravenflow.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await connection.query(
      `INSERT INTO users (name, email, password, role) 
       VALUES (?, ?, ?, 'admin') 
       ON DUPLICATE KEY UPDATE name = VALUES(name)`,
      ['Administrador', adminEmail, hashedPassword]
    );

    console.log('Usuário admin criado');
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Senha: ${adminPassword}`);
    console.log('\nSetup concluído com sucesso!');

  } catch (error) {
    console.error('Erro no setup:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setup();
