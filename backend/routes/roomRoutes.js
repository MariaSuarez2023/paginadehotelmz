const express = require('express');
const { check } = require('express-validator');
const {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  addReview
} = require('../controllers/roomController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Ruta para obtener todas las habitaciones (pública)
router.get('/', getRooms);

// Ruta para obtener una habitación por ID (pública)
router.get('/:id', getRoomById);

// Ruta para crear una nueva habitación (solo administrador)
router.post(
  '/',
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
  '/:id',
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
router.delete('/:id', authenticateUser, authorizeAdmin, deleteRoom);

// Ruta para añadir una reseña a una habitación (usuario autenticado)
router.post(
  '/:roomId/reviews',
  [
    authenticateUser,
    check('rating', 'La calificación es obligatoria y debe estar entre 1 y 5').isInt({ min: 1, max: 5 }),
    check('comment', 'El comentario es obligatorio').not().isEmpty()
  ],
  addReview
);

module.exports = router;
