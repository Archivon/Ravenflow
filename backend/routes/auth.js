const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilizador = require('../database/models/Utilizador');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Registrar novo usuário
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, telefone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    // Verificar se email já existe
    const existingUser = await Utilizador.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const ReferencialID = await Utilizador.create({
      Nome: name,
      Email: email,
      SenhaHash: hashedPassword,
      Telefone: telefone || null,
      Perfilld: 2, // Perfil padrão: User
      EmailVerificado: 0
    });

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      ReferencialID
    });
  } catch (error) {
    next(error);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Buscar usuário
    const user = await Utilizador.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar senha
    if (!user.SenhaHash) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const validPassword = await bcrypt.compare(password, user.SenhaHash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Atualizar último login
    await Utilizador.updateLastLogin(user.ReferencialID);

    // Gerar token JWT
    const token = jwt.sign(
      { 
        ReferencialID: user.ReferencialID, 
        email: user.Email, 
        Perfilld: user.Perfilld,
        PerfilNome: user.PerfilNome
      },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        ReferencialID: user.ReferencialID,
        Nome: user.Nome,
        Email: user.Email,
        Perfilld: user.Perfilld,
        PerfilNome: user.PerfilNome
      }
    });
  } catch (error) {
    next(error);
  }
});

// Obter perfil do usuário autenticado
router.get('/me', authenticateToken, async (req, res, next) => {
  try {
    const user = await Utilizador.findByReferencialID(req.user.ReferencialID);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    // Remover senha do retorno
    delete user.SenhaHash;
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
