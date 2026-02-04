FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY backend/package*.json ./
RUN npm ci --only=production

# Copiar código do backend
COPY backend/ .

# Expor porta
EXPOSE 3000

# Comando para iniciar
CMD ["node", "server.js"]
