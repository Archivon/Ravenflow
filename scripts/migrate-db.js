const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function migrate() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'ravenflow',
      multipleStatements: true
    });

    console.log('Conectado ao banco de dados');

    // Verificar se existe pasta de migrations
    const migrationsDir = path.join(__dirname, '../backend/database/migrations');
    
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
      console.log('Pasta de migrations criada');
    }

    // Listar arquivos de migration
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    if (migrationFiles.length === 0) {
      console.log('Nenhuma migration encontrada');
      return;
    }

    // Criar tabela de controle de migrations se não existir
    await connection.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Executar migrations pendentes
    for (const file of migrationFiles) {
      const [rows] = await connection.query(
        'SELECT * FROM migrations WHERE filename = ?',
        [file]
      );

      if (rows.length === 0) {
        console.log(`Executando migration: ${file}`);
        
        const migrationSQL = fs.readFileSync(
          path.join(migrationsDir, file),
          'utf8'
        );

        await connection.query(migrationSQL);
        
        await connection.query(
          'INSERT INTO migrations (filename) VALUES (?)',
          [file]
        );

        console.log(`Migration ${file} executada com sucesso`);
      } else {
        console.log(`Migration ${file} já foi executada`);
      }
    }

    console.log('\nMigrations concluídas!');

  } catch (error) {
    console.error('Erro na migration:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

migrate();
