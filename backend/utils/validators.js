/**
 * Valida NIF (Número de Identificação Fiscal português)
 * NIF tem 9 dígitos e algoritmo de validação específico
 */
const validateNIF = (nif) => {
  nif = nif.replace(/\D/g, '');
  
  if (nif.length !== 9) return false;
  if (/^(\d)\1+$/.test(nif)) return false;

  // Primeiro dígito deve ser 1, 2, 3, 5, 6, 7, 8 ou 9
  const firstDigit = parseInt(nif.charAt(0));
  if (![1, 2, 3, 5, 6, 7, 8, 9].includes(firstDigit)) return false;

  // Calcular dígito de controle
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(nif.charAt(i)) * (9 - i);
  }
  
  let checkDigit = 11 - (sum % 11);
  if (checkDigit >= 10) checkDigit = 0;
  
  return checkDigit === parseInt(nif.charAt(8));
};

/**
 * Valida email
 */
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Formata NIF (9 dígitos: XXX XXX XXX)
 */
const formatNIF = (nif) => {
  nif = nif.replace(/\D/g, '');
  if (nif.length === 9) {
    return nif.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
  }
  return nif;
};

/**
 * Formata valor monetário (Euro - Portugal)
 */
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  }).format(value);
};

module.exports = {
  validateNIF,
  validateEmail,
  formatNIF,
  formatCurrency
};
