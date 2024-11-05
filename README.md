# Proyecto de Gestión de Habitaciones de Hotel

Bienvenido a mi proyecto de gestión de habitaciones de hotel, una aplicación web completa que permite la administración de habitaciones, reseñas y autenticación de usuarios. Este proyecto fue desarrollado con un backend en Node.js y Express, y un frontend en React con Vite. Aquí explico los detalles sobre las funcionalidades, cómo ejecutar el servidor backend y frontend, y las características clave de la aplicación.

Nombre y Apellido: María Suarez

## Descripción del Proyecto

Este proyecto es una plataforma de gestión de habitaciones de hotel donde los administradores pueden agregar, actualizar y eliminar habitaciones, mientras que los usuarios pueden ver los detalles de cada habitación, incluyendo imágenes, precio, descripción, y capacidad. Los usuarios también pueden dejar reseñas con calificaciones y comentarios. 

La aplicación incluye un sistema de autenticación para proteger ciertas áreas, como el panel de administración. La navegación está optimizada para desplazarse de manera fluida entre distintas secciones de la página.

## Funcionalidades

### Funcionalidades Generales
- Visualización de las habitaciones disponibles, con filtros por capacidad máxima de personas.
- Vista detallada de cada habitación, incluyendo una galería de imágenes, precio, descripción, capacidad y comodidades.
- Sistema de reseñas donde cualquier usuario puede agregar una calificación y comentario para una habitación.

### Funcionalidades del Usuario
- Los usuarios pueden ver el listado de habitaciones disponibles y acceder a los detalles de cada una.
- Los usuarios pueden dejar una reseña para cualquier habitación sin necesidad de autenticación. La reseña incluye nombre, apellido, comentario y una calificación mediante estrellas.

### Funcionalidades del Administrador
- El administrador puede agregar nuevas habitaciones, incluyendo título, descripción, precio, capacidad, y varias imágenes (seleccionando una portada).
- El administrador puede actualizar y eliminar habitaciones.
- Autenticación de administrador para acceso a las funciones de gestión.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Vite, Tailwind CSS
- **Autenticación**: JSON Web Tokens (JWT)
- **Manejo de Archivos**: Multer para subir imágenes al servidor

## Requisitos Previos

Para ejecutar este proyecto, necesitas tener instalados:

- Node.js y npm
- MongoDB para la base de datos

## Configuración del Proyecto

### Backend

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio
   ```

2. Instala las dependencias del backend:
   ```bash
   cd backend
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env` en la carpeta `backend`:
   ```plaintext
   PORT=5000
   MONGO_URI=tu_mongo_uri
   JWT_SECRET=tu_secreto_jwt
   ```

4. Ejecuta el servidor backend:
   ```bash
   npm start
   ```

   El servidor backend debería estar corriendo en `http://localhost:5000`.

### Frontend

1. Instala las dependencias del frontend:
   ```bash
   cd frontend
   npm install
   ```

2. Ejecuta el servidor frontend:
   ```bash
   npm run dev
   ```

   El servidor frontend debería estar disponible en `http://localhost:5173`.

## Uso de la Aplicación

### Navegación

- Desde la página principal, puedes navegar por las secciones de "Nosotros", "Actividades", "Testimonios", "Precios", "Blog" y "Contacto".
- La sección de "Habitaciones" muestra la lista de habitaciones disponibles. Puedes hacer clic en cada una para ver sus detalles.

### Panel de Administración

1. Ve a la página de inicio de sesión (`/login`) e inicia sesión con una cuenta de administrador.
2. Una vez autenticado, tendrás acceso al panel de administración, donde podrás agregar, actualizar y eliminar habitaciones.

### Reseñas de Habitaciones

- En la vista de detalles de una habitación, encontrarás una sección de "Reseñas" donde puedes ver las reseñas de otros usuarios.
- Cualquier usuario puede dejar una reseña, ingresando su nombre, apellido, una calificación mediante estrellas y un comentario.

### Ejemplo de Configuración en Producción

Para configurar el proyecto en un entorno de producción, asegúrate de configurar correctamente las variables de entorno en el servidor de producción, y utiliza un sistema como NGINX para servir el frontend y backend desde el mismo dominio. Asegúrate también de usar un sistema de bases de datos seguro para MongoDB y de proteger las credenciales de acceso.

