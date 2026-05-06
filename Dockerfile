# Etapa 1: build Angular
FROM node:20 AS build
WORKDIR /app

# Copiar solo package.json y lock primero (cache de dependencias)
COPY package*.json ./

# Instalar dependencias en Linux
RUN npm install --legacy-peer-deps

# Ahora sí, copiar el resto del código (sin node_modules)
COPY . .

# Build Angular
RUN npx ng build --configuration production

# Etapa 2: servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/mlvpagolinea/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
