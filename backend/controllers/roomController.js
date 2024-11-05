const Room = require('../models/Room');
const Review = require('../models/Review');
const { validationResult } = require('express-validator');

// Crear una nueva habitación
exports.createRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, amenities, price, maxPeople, mainImageIndex } = req.body;
  const images = req.files ? req.files.map(file => file.path) : [];

  try {
    const room = new Room({
      title,
      description,
      amenities,
      price,
      maxPeople,
      images,
      mainImageIndex: mainImageIndex || 0 // Si no se especifica, usar la primera imagen
    });

    await room.save();
    res.status(201).json({ room, msg: 'Habitación creada exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener todas las habitaciones
exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    const roomsWithImageUrls = rooms.map(room => ({
      ...room.toObject(),
      imageUrl: room.images && room.images.length > 0 
                ? `/uploads/${room.images[room.mainImageIndex || 0]}` // Obtener la imagen de portada
                : null // Imagen por defecto o null si no hay imágenes
    }));
    res.json(roomsWithImageUrls);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener una habitación por ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('reviews');
    if (!room) {
      return res.status(404).json({ msg: 'Habitación no encontrada' });
    }
    const roomWithImageUrl = {
      ...room.toObject(),
      imageUrl: room.images && room.images.length > 0 
                ? `/uploads/${room.images[room.mainImageIndex || 0]}` // Imagen de portada
                : null
    };
    res.json(roomWithImageUrl);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Actualizar una habitación
exports.updateRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, amenities, price, maxPeople, mainImageIndex } = req.body;
  const images = req.files ? req.files.map(file => file.path) : [];

  try {
    let room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Habitación no encontrada' });
    }

    // Actualizar los datos de la habitación
    room.title = title || room.title;
    room.description = description || room.description;
    room.amenities = amenities || room.amenities;
    room.price = price || room.price;
    room.maxPeople = maxPeople || room.maxPeople;
    room.mainImageIndex = mainImageIndex !== undefined ? mainImageIndex : room.mainImageIndex;
    if (images.length > 0) {
      room.images = images;
    }

    await room.save();
    res.json({ room, msg: 'Habitación actualizada exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Eliminar una habitación
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Habitación no encontrada' });
    }

    await room.remove();
    res.json({ msg: 'Habitación eliminada exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Añadir una reseña a una habitación
exports.addReview = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rating, comment } = req.body;

  try {
    const room = await Room.findById(req.params.roomId);
    if (!room) {
      return res.status(404).json({ msg: 'Habitación no encontrada' });
    }

    const review = new Review({
      user: req.user.id, // Este ID viene del token JWT del usuario autenticado
      room: req.params.roomId,
      rating,
      comment
    });

    await review.save();

    // Añadir la reseña a la habitación y guardar
    room.reviews.push(review);
    await room.save();

    res.status(201).json({ review, msg: 'Reseña añadida exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};
