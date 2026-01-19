const User = require('../backend/database/models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdminUser() {
  try {
    const name = process.argv[2] || 'Administrador';
    const email = process.argv[3] || process.env.ADMIN_EMAIL || 'admin@ravenflow.com';
    const password = process.argv[4] || process.env.ADMIN_PASSWORD || 'admin123';

    // Verificar se usuário já existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      console.log('Usuário já existe. Atualizando...');
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.update(existingUser.id, {
        name,
        email,
        role: 'admin'
      });
      console.log('Usuário admin atualizado');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Usuário admin criado com sucesso');
    }

    console.log(`\n📧 Email: ${email}`);
    console.log(`🔑 Senha: ${password}`);
    console.log('\nIMPORTANTE: Altere a senha após o primeiro login!');

  } catch (error) {
    console.error('Erro ao criar usuário admin:', error.message);
    process.exit(1);
  }
}

createAdminUser();
