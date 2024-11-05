const Room = require('../models/Room');
const Review = require('../models/Review');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

// Crear una nueva habitación (para administrador)
exports.createRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, amenities, price, maxPeople } = req.body;
  const images = req.files ? req.files.map(file => file.path) : [];

  try {
    const room = new Room({
      title,
      description,
      amenities,
      price,
      maxPeople,
      images
    });

    await room.save();
    res.status(201).json({ room, msg: 'Habitación creada exitosamente por el administrador' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Actualizar una habitación (para administrador)
exports.updateRoom = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, amenities, price, maxPeople } = req.body;
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
    if (images.length > 0) {
      // Eliminar las imágenes anteriores si existen
      room.images.forEach(imagePath => {
        fs.unlink(path.join(__dirname, '..', imagePath), err => {
          if (err) console.error(err);
        });
      });
      room.images = images;
    }

    await room.save();
    res.json({ room, msg: 'Habitación actualizada exitosamente por el administrador' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Eliminar una habitación (para administrador)
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Habitación no encontrada' });
    }

    // Eliminar imágenes asociadas a la habitación
    room.images.forEach(imagePath => {
      fs.unlink(path.join(__dirname, '..', imagePath), err => {
        if (err) console.error(err);
      });
    });

    await room.remove();
    res.json({ msg: 'Habitación eliminada exitosamente por el administrador' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Añadir un testimonio (para administrador)
exports.addTestimonial = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, roomId, rating, comment } = req.body;

  try {
    const review = new Review({
      user: userId,
      room: roomId,
      rating,
      comment
    });

    await review.save();

    // Añadir la reseña a la habitación
    const room = await Room.findById(roomId);
    room.reviews.push(review);
    await room.save();

    res.status(201).json({ review, msg: 'Testimonio añadido exitosamente por el administrador' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Eliminar un testimonio (para administrador)
exports.deleteTestimonial = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ msg: 'Testimonio no encontrado' });
    }

    await review.remove();

    // Eliminar la referencia en la habitación
    const room = await Room.findById(review.room);
    if (room) {
      room.reviews = room.reviews.filter(r => r.toString() !== review._id.toString());
      await room.save();
    }

    res.json({ msg: 'Testimonio eliminado exitosamente por el administrador' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};
