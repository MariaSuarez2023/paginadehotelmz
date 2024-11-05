const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Registro de usuario
exports.register = async (req, res) => {
  // Validación de errores en la solicitud
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, isAdmin } = req.body;

  try {
    // Verificar si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    user = new User({
      name,
      email,
      password,
      isAdmin: isAdmin || false
    });

    // Guardar el usuario en la base de datos
    await user.save();

    // Generar el token JWT
    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, msg: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Inicio de sesión de usuario
exports.login = async (req, res) => {
  // Validación de errores en la solicitud
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Comparar la contraseña ingresada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    // Generar el token JWT
    const payload = {
      user: {
        id: user.id,
        isAdmin: user.isAdmin
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, msg: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};
