import { AuthService } from '../services/authService.js';

const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const continueBtn = document.getElementById('continue-btn');
const backBtn = document.getElementById('back-btn');
const loginBtn = document.getElementById('login-btn');
const emailStep = document.getElementById('email-step');
const passwordStep = document.getElementById('password-step');
const welcomeTitle = document.getElementById('welcome-title');
const welcomeSubtitle = document.getElementById('welcome-subtitle');

let currentEmail = '';

// Etapa 1: Validar email e mostrar campo de senha
continueBtn.addEventListener('click', async () => {
  clearMessages();
  
  const email = emailInput.value.trim();

  if (!email) {
    showError('Por favor, introduza o seu e-mail');
    return;
  }

  // Validar formato de email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('Por favor, introduza um endereço de e-mail válido');
    return;
  }

  // Desabilitar botão durante o processo
  continueBtn.disabled = true;
  continueBtn.textContent = 'A processar...';

  try {
    // Verificar se o email existe (opcional - pode ser feito no backend)
    // Por enquanto, vamos direto para a etapa de senha
    currentEmail = email;
    
    // Mostrar etapa de senha
    showPasswordStep();
  } catch (error) {
    showError(error.message || 'Erro ao verificar e-mail. Por favor, tente novamente.');
    continueBtn.disabled = false;
    continueBtn.textContent = 'Continuar';
  }
});

// Voltar para etapa de email
backBtn.addEventListener('click', () => {
  showEmailStep();
});

// Etapa 2: Fazer login com email e senha
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMessages();
  
  const password = passwordInput.value;

  if (!password) {
    showError('Por favor, introduza a sua palavra-passe');
    return;
  }

  // Desabilitar botão durante o processo
  loginBtn.disabled = true;
  loginBtn.textContent = 'A iniciar sessão...';

  try {
    // Fazer login
    const response = await AuthService.login(currentEmail, password);
    
    if (response) {
      // Redirecionar para o dashboard
      window.location.href = 'dashboard.html';
    }
  } catch (error) {
    showError(error.message || 'Credenciais inválidas. Por favor, tente novamente.');
    loginBtn.disabled = false;
    loginBtn.textContent = 'Iniciar sessão';
  }
});

function showPasswordStep() {
  emailStep.style.display = 'none';
  passwordStep.style.display = 'block';
  welcomeTitle.textContent = 'Introduza a sua palavra-passe';
  welcomeSubtitle.textContent = `Para a conta ${currentEmail}`;
  passwordInput.focus();
  continueBtn.disabled = false;
  continueBtn.textContent = 'Continuar';
}

function showEmailStep() {
  passwordStep.style.display = 'none';
  emailStep.style.display = 'block';
  welcomeTitle.textContent = 'Damos-lhe as boas-vindas de volta';
  welcomeSubtitle.textContent = 'Introduza o e-mail associado à sua conta RavenFlow';
  passwordInput.value = '';
  currentEmail = '';
  emailInput.focus();
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add('show');
  
  // Scroll para a mensagem de erro
  errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearMessages() {
  errorMessage.classList.remove('show');
  errorMessage.textContent = '';
}

// Melhorar UX - mostrar/ocultar erro ao digitar e habilitar/desabilitar botão
emailInput.addEventListener('input', () => {
  clearMessages();
  // Habilitar botão apenas se houver texto no email
  const hasEmail = emailInput.value.trim().length > 0;
  continueBtn.disabled = !hasEmail;
});

// Habilitar botão de login quando houver senha
passwordInput.addEventListener('input', () => {
  clearMessages();
  const hasPassword = passwordInput.value.length > 0;
  loginBtn.disabled = !hasPassword;
});

// Permitir Enter para avançar
emailInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !continueBtn.disabled) {
    continueBtn.click();
  }
});

passwordInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !loginBtn.disabled) {
    form.dispatchEvent(new Event('submit'));
  }
});
