# Etapa 1: Build
FROM node:18-alpine AS build

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json tsconfig.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY ./src ./src

# Compilar o código TypeScript para JavaScript
RUN npm run build

# Etapa 2: Execução
FROM node:18-alpine AS runtime

# Definir diretório de trabalho
WORKDIR /app

# Copiar as dependências instaladas e os arquivos compilados da etapa anterior
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Definir a variável de ambiente para produção
ENV NODE_ENV=production

# Expor a porta de execução do Node.js
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/index.js"]
