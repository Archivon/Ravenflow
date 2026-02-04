import { AuthService } from '../services/authService.js';

const form = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const termsCheckbox = document.getElementById('terms');
const continueBtn = form.querySelector('.btn-continue');

// Social register buttons
document.getElementById('google-register')?.addEventListener('click', () => {
  // TODO: Implementar registro com Google
  showError('Registro com Google em desenvolvimento');
});

document.getElementById('apple-register')?.addEventListener('click', () => {
  // TODO: Implementar registro com Apple
  showError('Registro com Apple em desenvolvimento');
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMessages();
  
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validações
  if (!name || !email || !password || !confirmPassword) {
    showError('Por favor, preencha todos os campos');
    return;
  }

  if (!termsCheckbox.checked) {
    showError('Deve aceitar os Termos e Condições para continuar');
    return;
  }

  // Validar formato de email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('Por favor, introduza um endereço de email válido');
    return;
  }

  // Validar comprimento da senha
  if (password.length < 8) {
    showError('A palavra-passe deve ter pelo menos 8 caracteres');
    return;
  }

  // Validar confirmação de senha
  if (password !== confirmPassword) {
    showError('As palavras-passe não coincidem');
    return;
  }

  // Desabilitar botão durante o processo
  continueBtn.disabled = true;
  continueBtn.textContent = 'A criar conta...';

  try {
    await AuthService.register({
      name,
      email,
      password
    });
    
    // Sucesso
    showSuccess('Conta criada com sucesso! A redirecionar...');
    
    // Redirecionar para o dashboard após 1.5 segundos
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
    
  } catch (error) {
    showError(error.message || 'Erro ao criar conta. Por favor, tente novamente.');
    continueBtn.disabled = false;
    continueBtn.textContent = 'Criar conta';
  }
});

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.add('show');
  successMessage.classList.remove('show');
  
  // Scroll para a mensagem de erro
  errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showSuccess(message) {
  successMessage.textContent = message;
  successMessage.classList.add('show');
  errorMessage.classList.remove('show');
  
  // Scroll para a mensagem de sucesso
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearMessages() {
  errorMessage.classList.remove('show');
  successMessage.classList.remove('show');
  errorMessage.textContent = '';
  successMessage.textContent = '';
}

// Melhorar UX - mostrar/ocultar erro ao digitar
nameInput.addEventListener('input', clearMessages);
emailInput.addEventListener('input', clearMessages);
passwordInput.addEventListener('input', clearMessages);
confirmPasswordInput.addEventListener('input', clearMessages);

// Validação em tempo real da confirmação de senha
confirmPasswordInput.addEventListener('input', () => {
  if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
    confirmPasswordInput.setCustomValidity('As palavras-passe não coincidem');
  } else {
    confirmPasswordInput.setCustomValidity('');
  }
});
