class NotificationService {
  /**
   * Envia notificação (placeholder para implementação futura)
   */
  static async sendNotification(userId, type, message) {
    // TODO: Implementar sistema de notificações
    // Pode usar email, SMS, push notifications, etc.
    console.log(`Notificação para usuário ${userId}: [${type}] ${message}`);
    return true;
  }

  /**
   * Notifica sobre novo registro de salário
   */
  static async notifySalaryRegistered(employeeId, salaryData) {
    const message = `Novo registro de salário: R$ ${salaryData.net_salary.toFixed(2)} para o mês ${salaryData.month}/${salaryData.year}`;
    return this.sendNotification(employeeId, 'salary_registered', message);
  }

  /**
   * Notifica sobre atualização de salário
   */
  static async notifySalaryUpdated(employeeId, salaryData) {
    const message = `Salário atualizado: R$ ${salaryData.net_salary.toFixed(2)} para o mês ${salaryData.month}/${salaryData.year}`;
    return this.sendNotification(employeeId, 'salary_updated', message);
  }
}

module.exports = NotificationService;
