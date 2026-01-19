const API_BASE_URL = process.env.API_URL || 'http://localhost:3000/api';

export class ReportService {
  static getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  static async getSalaryReport(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${API_BASE_URL}/reports/salaries${queryParams ? `?${queryParams}` : ''}`;
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao gerar relatório de salários');
    }

    return await response.json();
  }

  static async getEmployeeReport() {
    const response = await fetch(`${API_BASE_URL}/reports/employees-by-department`, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao gerar relatório de funcionários');
    }

    return await response.json();
  }

  static async getMonthlyExpenses(year) {
    const url = `${API_BASE_URL}/reports/monthly-expenses${year ? `?year=${year}` : ''}`;
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao gerar relatório de gastos mensais');
    }

    return await response.json();
  }
}
