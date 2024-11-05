const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Rutas importadas
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app = express();

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión a MongoDB exitosa'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Middlewares
app.use(cors()); // Para permitir el acceso desde diferentes dominios
app.use(express.json()); // Para parsear JSON
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Para servir archivos estáticos (imágenes)

// Rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/rooms', roomRoutes); // Rutas para habitaciones
app.use('/api/admin', adminRoutes); // Rutas de administración (solo para administradores)

// Ruta base para comprobar el funcionamiento del servidor
app.get('/', (req, res) => {
  res.send('Bienvenido a la API del sistema de gestión de hotel');
});

// Configuración del puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
