# Usar uma imagem oficial do Node.js como base
FROM node:20-alpine

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Expor a porta que a aplicação Nuxt.js usará
EXPOSE 3000

# Definir o comando para iniciar a aplicação
CMD ["npm", "run", "dev"]