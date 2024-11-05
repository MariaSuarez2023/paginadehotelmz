const express = require('express');
const { check } = require('express-validator');
const { 
  createRoom, 
  updateRoom, 
  deleteRoom, 
  addTestimonial, 
  deleteTestimonial 
} = require('../controllers/adminController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Ruta para crear una nueva habitación (solo administrador)
router.post(
  '/rooms',
  [
    authenticateUser,
    authorizeAdmin,
    upload.array('images', 5),
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('price', 'El precio es obligatorio y debe ser un número').isNumeric(),
    check('maxPeople', 'La cantidad máxima de personas es obligatoria y debe ser un número').isNumeric()
  ],
  createRoom
);

// Ruta para actualizar una habitación (solo administrador)
router.put(
  '/rooms/:id',
  [
    authenticateUser,
    authorizeAdmin,
    upload.array('images', 5),
    check('title', 'El título es obligatorio').optional().not().isEmpty(),
    check('description', 'La descripción es obligatoria').optional().not().isEmpty(),
    check('price', 'El precio debe ser un número').optional().isNumeric(),
    check('maxPeople', 'La cantidad máxima de personas debe ser un número').optional().isNumeric()
  ],
  updateRoom
);

// Ruta para eliminar una habitación (solo administrador)
router.delete('/rooms/:id', authenticateUser, authorizeAdmin, deleteRoom);

// Ruta para añadir un testimonio (solo administrador)
router.post(
  '/testimonials',
  [
    authenticateUser,
    authorizeAdmin,
    check('userId', 'El ID del usuario es obligatorio').not().isEmpty(),
    check('roomId', 'El ID de la habitación es obligatorio').not().isEmpty(),
    check('rating', 'La calificación es obligatoria y debe estar entre 1 y 5').isInt({ min: 1, max: 5 }),
    check('comment', 'El comentario es obligatorio').not().isEmpty()
  ],
  addTestimonial
);

// Ruta para eliminar un testimonio (solo administrador)
router.delete('/testimonials/:id', authenticateUser, authorizeAdmin, deleteTestimonial);

module.exports = router;
