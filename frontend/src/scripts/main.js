import { AuthService } from './services/authService.js';
import { EmployeeService } from './services/employeeService.js';
import { SalaryService } from './services/salaryService.js';
import { ReportService } from './services/reportService.js';
import { Router } from './utils/router.js';

// Verificar autenticação
const token = localStorage.getItem('token');
if (!token) {
  window.location.href = './pages/login.html';
}

// Inicializar roteador
const router = new Router();

// Configurar rotas
router.addRoute('dashboard', () => loadDashboard());
router.addRoute('employees', () => loadEmployees());
router.addRoute('salaries', () => loadSalaries());
router.addRoute('reports', () => loadReports());

// Inicializar
router.init();

// Handlers de navegação
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const route = e.target.getAttribute('href').substring(1);
    router.navigate(route);
  });
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = './pages/login.html';
});

// Funções de carregamento de páginas
async function loadDashboard() {
  const content = document.getElementById('content');
  content.innerHTML = '<h2>Dashboard</h2><p>Carregando...</p>';
  
  try {
    const employees = await EmployeeService.getAll();
    const salaries = await SalaryService.getAll();
    
    content.innerHTML = `
      <div class="dashboard">
        <h2>Dashboard</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Total de Funcionários</h3>
            <p class="stat-value">${employees.length}</p>
          </div>
          <div class="stat-card">
            <h3>Registros de Salário</h3>
            <p class="stat-value">${salaries.length}</p>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    content.innerHTML = `<p class="error">Erro ao carregar dashboard: ${error.message}</p>`;
  }
}

async function loadEmployees() {
  const content = document.getElementById('content');
  content.innerHTML = '<h2>Funcionários</h2><p>Carregando...</p>';
  
  try {
    const employees = await EmployeeService.getAll();
    
    const tableRows = employees.map(emp => `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.position}</td>
        <td>${emp.department}</td>
        <td>R$ ${parseFloat(emp.salary).toFixed(2)}</td>
      </tr>
    `).join('');
    
    content.innerHTML = `
      <div class="employees-page">
        <h2>Funcionários</h2>
        <button class="btn btn-primary" onclick="showAddEmployeeModal()">Adicionar Funcionário</button>
        <table class="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Cargo</th>
              <th>Departamento</th>
              <th>Salário</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;
  } catch (error) {
    content.innerHTML = `<p class="error">Erro ao carregar funcionários: ${error.message}</p>`;
  }
}

async function loadSalaries() {
  const content = document.getElementById('content');
  content.innerHTML = '<h2>Salários</h2><p>Carregando...</p>';
  
  try {
    const salaries = await SalaryService.getAll();
    
    const tableRows = salaries.map(sal => `
      <tr>
        <td>${sal.employee_name}</td>
        <td>${sal.month}/${sal.year}</td>
        <td>R$ ${parseFloat(sal.base_salary).toFixed(2)}</td>
        <td>R$ ${parseFloat(sal.bonuses || 0).toFixed(2)}</td>
        <td>R$ ${parseFloat(sal.deductions || 0).toFixed(2)}</td>
        <td>R$ ${parseFloat(sal.net_salary).toFixed(2)}</td>
      </tr>
    `).join('');
    
    content.innerHTML = `
      <div class="salaries-page">
        <h2>Salários</h2>
        <button class="btn btn-primary" onclick="showAddSalaryModal()">Adicionar Registro</button>
        <table class="data-table">
          <thead>
            <tr>
              <th>Funcionário</th>
              <th>Período</th>
              <th>Salário Base</th>
              <th>Bônus</th>
              <th>Descontos</th>
              <th>Salário Líquido</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    `;
  } catch (error) {
    content.innerHTML = `<p class="error">Erro ao carregar salários: ${error.message}</p>`;
  }
}

async function loadReports() {
  const content = document.getElementById('content');
  content.innerHTML = '<h2>Relatórios</h2><p>Carregando...</p>';
  
  try {
    const reports = await ReportService.getSalaryReport();
    
    content.innerHTML = `
      <div class="reports-page">
        <h2>Relatórios</h2>
        <div class="report-section">
          <h3>Resumo de Salários</h3>
          <p>Total de registros: ${reports.summary.total_records}</p>
          <p>Valor total: R$ ${reports.summary.total_amount.toFixed(2)}</p>
          <p>Média salarial: R$ ${reports.summary.average_salary.toFixed(2)}</p>
        </div>
      </div>
    `;
  } catch (error) {
    content.innerHTML = `<p class="error">Erro ao carregar relatórios: ${error.message}</p>`;
  }
}
