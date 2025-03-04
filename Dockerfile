# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Compilar la aplicación (si es necesario)
RUN npm run build

# Exponer el puerto en el que corre la aplicación
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:dev"]
