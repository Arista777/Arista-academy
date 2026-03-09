# Usa una imagen ligera de Node para servir HTML
FROM node:20-alpine

WORKDIR /app

# Copia todos los archivos del frontend
COPY . .

# Instala http-server globalmente
RUN npm install -g http-server

# Expone el puerto 8080
EXPOSE 8080

# Comando para levantar el servidor
CMD ["http-server", "-p", "8080"]
