const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const salaryRoutes = require('./routes/salaries');
const reportRoutes = require('./routes/reports');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/src')));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/salaries', salaryRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/admin', adminRoutes);

// Rotas para páginas HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/index.html'));
});

app.get('/pages/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/pages/login.html'));
});

app.get('/pages/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/pages/register.html'));
});

app.get('/pages/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/pages/dashboard.html'));
});

app.get('/pages/profile.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/pages/profile.html'));
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'RavenFlow API está funcionando' });
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor RavenFlow rodando na porta ${PORT}`);
});

module.exports = app;
