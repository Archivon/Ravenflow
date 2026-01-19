import { AuthService } from '../services/authService.js';

// Verificar autenticação
if (!AuthService.isAuthenticated()) {
  window.location.href = 'login.html';
}

// Carregar dados do perfil
async function loadProfile() {
  try {
    const user = await AuthService.getCurrentUser();
    
    // Preencher informações
    document.getElementById('profile-name').textContent = user.Nome || user.name || 'Usuário';
    document.getElementById('profile-email').textContent = user.Email || user.email || '';
    
    // Preencher formulário
    document.getElementById('name').value = user.Nome || user.name || '';
    document.getElementById('email').value = user.Email || user.email || '';
    document.getElementById('telefone').value = user.Telefone || user.telefone || '';
    
    // Badge de perfil
    const roleBadge = document.getElementById('profile-role');
    if (user.Perfilld === 1 || user.role === 'admin') {
      roleBadge.textContent = 'Admin';
      roleBadge.style.background = 'rgba(239, 68, 68, 0.1)';
      roleBadge.style.color = '#ef4444';
    } else {
      roleBadge.textContent = 'User';
    }
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
    showError('Erro ao carregar dados do perfil');
  }
}

// Atualizar perfil
document.getElementById('profile-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMessages();
  
  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefone: document.getElementById('telefone').value.trim()
  };
  
  try {
    const token = AuthService.getToken();
    const response = await fetch('http://localhost:3000/api/auth/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao atualizar perfil');
    }
    
    showSuccess('Perfil atualizado com sucesso!');
    
    // Recarregar dados
    setTimeout(() => {
      loadProfile();
    }, 1000);
  } catch (error) {
    showError(error.message || 'Erro ao atualizar perfil');
  }
});

// Alterar senha
document.getElementById('password-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMessages();
  
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-new-password').value;
  
  if (newPassword !== confirmPassword) {
    showError('As palavras-passe não coincidem');
    return;
  }
  
  if (newPassword.length < 8) {
    showError('A palavra-passe deve ter pelo menos 8 caracteres');
    return;
  }
  
  try {
    const token = AuthService.getToken();
    const response = await fetch('http://localhost:3000/api/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao alterar palavra-passe');
    }
    
    showSuccess('Palavra-passe alterada com sucesso!');
    
    // Limpar formulário
    document.getElementById('password-form').reset();
  } catch (error) {
    showError(error.message || 'Erro ao alterar palavra-passe');
  }
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
  AuthService.logout();
  window.location.href = 'login.html';
});

function showError(message) {
  const errorMsg = document.getElementById('error-message');
  errorMsg.textContent = message;
  errorMsg.classList.add('show');
  setTimeout(() => errorMsg.classList.remove('show'), 5000);
}

function showSuccess(message) {
  const successMsg = document.getElementById('success-message');
  successMsg.textContent = message;
  successMsg.classList.add('show');
  setTimeout(() => successMsg.classList.remove('show'), 5000);
}

function clearMessages() {
  document.getElementById('error-message').classList.remove('show');
  document.getElementById('success-message').classList.remove('show');
}

// Inicializar
loadProfile();
