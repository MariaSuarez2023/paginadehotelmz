const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para verificar el token JWT
const authenticateUser = (req, res, next) => {
  // Obtener el token desde el encabezado de autorización
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ msg: 'Token no válido' });
  }
};

// Middleware para verificar si el usuario es administrador
const authorizeAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ msg: 'Acceso denegado: No eres administrador' });
    }

    next();
  } catch (error) {
    console.error('Error al verificar permisos de administrador:', error);
    res.status(500).json({ msg: 'Error en el servidor' });
  }
};

module.exports = {
  authenticateUser,
  authorizeAdmin
};
