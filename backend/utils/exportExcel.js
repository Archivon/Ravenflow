const ExcelJS = require('exceljs');

/**
 * Exporta dados para Excel
 */
const exportToExcel = async (data, filename = 'export.xlsx') => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Dados');

  if (data.length === 0) {
    throw new Error('Nenhum dado para exportar');
  }

  // Adicionar cabeçalhos
  const headers = Object.keys(data[0]);
  worksheet.addRow(headers);

  // Estilizar cabeçalhos
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true };
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE0E0E0' }
  };

  // Adicionar dados
  data.forEach(row => {
    const values = headers.map(header => row[header] || '');
    worksheet.addRow(values);
  });

  // Ajustar largura das colunas
  headers.forEach((header, index) => {
    worksheet.getColumn(index + 1).width = 20;
  });

  return workbook;
};

module.exports = {
  exportToExcel
};
