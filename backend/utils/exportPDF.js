const PDFDocument = require('pdfkit');

/**
 * Exporta dados para PDF
 */
const exportToPDF = async (data, title = 'Relatório', filename = 'export.pdf') => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });
      doc.on('error', reject);

      // Adicionar título
      doc.fontSize(20).text(title, { align: 'center' });
      doc.moveDown();

      // Adicionar dados
      if (data.length > 0) {
        const headers = Object.keys(data[0]);
        
        // Cabeçalhos
        doc.fontSize(12).font('Helvetica-Bold');
        headers.forEach((header, index) => {
          doc.text(header, 50 + (index * 150), doc.y);
        });
        doc.moveDown();

        // Dados
        doc.font('Helvetica').fontSize(10);
        data.forEach((row, rowIndex) => {
          if (rowIndex > 0 && rowIndex % 25 === 0) {
            doc.addPage();
          }
          headers.forEach((header, colIndex) => {
            doc.text(String(row[header] || ''), 50 + (colIndex * 150), doc.y);
          });
          doc.moveDown(0.5);
        });
      } else {
        doc.text('Nenhum dado disponível', { align: 'center' });
      }

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  exportToPDF
};
