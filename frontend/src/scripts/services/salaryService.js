const API_BASE_URL = process.env.API_URL || 'http://localhost:3000/api';

export class SalaryService {
  static getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  static async getAll(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${API_BASE_URL}/salaries${queryParams ? `?${queryParams}` : ''}`;
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao buscar salários');
    }

    return await response.json();
  }

  static async getById(id) {
    const response = await fetch(`${API_BASE_URL}/salaries/${id}`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao buscar registro de salário');
    }

    return await response.json();
  }

  static async getByEmployee(employeeId, filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${API_BASE_URL}/salaries/employee/${employeeId}${queryParams ? `?${queryParams}` : ''}`;
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao buscar salários do funcionário');
    }

    return await response.json();
  }

  static async create(salaryData) {
    const response = await fetch(`${API_BASE_URL}/salaries`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(salaryData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao criar registro de salário');
    }

    return await response.json();
  }

  static async update(id, salaryData) {
    const response = await fetch(`${API_BASE_URL}/salaries/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(salaryData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao atualizar registro de salário');
    }

    return await response.json();
  }

  static async delete(id) {
    const response = await fetch(`${API_BASE_URL}/salaries/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao deletar registro de salário');
    }

    return await response.json();
  }
}
