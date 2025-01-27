# Estágio de construção
FROM node:14-bullseye as build-stage

# Instalar dependências necessárias
RUN apt-get update || : && apt-get install -y python3 python3-pip

# Instalar o Vue CLI globalmente
RUN npm install -g @vue/cli

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração do projeto
COPY package.json .
COPY package-lock.json .

# Instalar dependências do projeto
RUN npm install

# Copiar todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Autenticar no Sentry
ARG SENTRY_AUTH_TOKEN
RUN npm install -g @sentry/cli && sentry-cli login --auth-token $SENTRY_AUTH_TOKEN

# Build da aplicação para produção
RUN npm run build

# Enviar source maps para o Sentry
ARG SENTRY_PROJECT
RUN npx sentry-cli releases new -p $SENTRY_PROJECT $npm_package_version
RUN npx sentry-cli releases files $npm_package_version upload-sourcemaps ./dist --project $SENTRY_PROJECT
RUN npx sentry-cli releases finalize $npm_package_version

# Estágio de produção
FROM nginx as production-stage

# Criar diretório da aplicação no contêiner
RUN mkdir /app

# Copiar arquivos construídos para o diretório do Nginx
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
