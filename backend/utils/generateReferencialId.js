/**
 * Gera um ReferencialID único no formato REF-XXXXXXXXX
 * Onde X são caracteres alfanuméricos (0-9, A-Z)
 */
const generateReferencialId = () => {
  const prefix = 'REF-';
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomPart = '';
  
  // Gerar 9 caracteres aleatórios
  for (let i = 0; i < 9; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return prefix + randomPart;
};

/**
 * Gera um ReferencialID único verificando se já existe no banco
 */
const generateUniqueReferencialId = async (db, tableName, columnName = 'ReferencialID') => {
  let referencialId;
  let exists = true;
  let attempts = 0;
  const maxAttempts = 10;
  
  while (exists && attempts < maxAttempts) {
    referencialId = generateReferencialId();
    
    try {
      const [rows] = await db.execute(
        `SELECT COUNT(*) as count FROM ${tableName} WHERE ${columnName} = ?`,
        [referencialId]
      );
      
      exists = rows[0].count > 0;
      attempts++;
    } catch (error) {
      // Se houver erro na verificação, retornar o ID gerado
      console.warn('Erro ao verificar ReferencialID único:', error.message);
      return referencialId;
    }
  }
  
  if (attempts >= maxAttempts) {
    throw new Error('Não foi possível gerar um ReferencialID único após várias tentativas');
  }
  
  return referencialId;
};

module.exports = {
  generateReferencialId,
  generateUniqueReferencialId
};
