const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post(
  '/register',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Por favor, ingrese un correo electrónico válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
  ],
  register
);

// Ruta para iniciar sesión
router.post(
  '/login',
  [
    check('email', 'Por favor, ingrese un correo electrónico válido').isEmail(),
    check('password', 'La contraseña es obligatoria').exists()
  ],
  login
);

module.exports = router;
