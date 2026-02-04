import { AuthService } from '../services/authService.js';
import { EmployeeService } from '../services/employeeService.js';
import { SalaryService } from '../services/salaryService.js';

// Verificar autenticação
if (!AuthService.isAuthenticated()) {
  window.location.href = 'login.html';
}

// Carregar dados do usuário
async function loadUserData() {
  try {
    const user = await AuthService.getCurrentUser();
    document.getElementById('user-name').textContent = user.Nome || user.name || 'Usuário';
  } catch (error) {
    console.error('Erro ao carregar dados do usuário:', error);
    AuthService.logout();
    window.location.href = 'login.html';
  }
}

// Carregar estatísticas
async function loadStats() {
  try {
    // Carregar funcionários
    const employees = await EmployeeService.getAll();
    document.getElementById('total-employees').textContent = employees.length || 0;

    // Carregar salários
    const salaries = await SalaryService.getAll();
    const totalSalary = salaries.reduce((sum, salary) => sum + parseFloat(salary.net_salary || 0), 0);
    document.getElementById('total-salary').textContent = formatCurrency(totalSalary);

    // Salários do mês atual
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monthSalaries = salaries.filter(s => 
      s.month === currentMonth && s.year === currentYear
    );
    const monthTotal = monthSalaries.reduce((sum, salary) => sum + parseFloat(salary.net_salary || 0), 0);
    document.getElementById('month-salary').textContent = formatCurrency(monthTotal);
    document.getElementById('processed-count').textContent = monthSalaries.length || 0;

    // Carregar atividade recente
    loadRecentActivity(salaries.slice(0, 5));
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error);
  }
}

function loadRecentActivity(salaries) {
  const activityList = document.getElementById('activity-list');
  
  if (salaries.length === 0) {
    activityList.innerHTML = '<div class="empty-state"><p>Nenhuma atividade recente</p></div>';
    return;
  }

  activityList.innerHTML = salaries.map(salary => `
    <div class="activity-item">
      <div class="activity-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      </div>
      <div class="activity-content">
        <p class="activity-title">Salário processado</p>
        <p class="activity-date">${formatDate(salary.created_at)}</p>
      </div>
      <div class="activity-amount">
        ${formatCurrency(salary.net_salary)}
      </div>
    </div>
  `).join('');
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  }).format(value || 0);
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
  AuthService.logout();
  window.location.href = 'login.html';
});

// Inicializar
loadUserData();
loadStats();
