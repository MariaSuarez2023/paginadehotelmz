const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Opcional para usuarios no autenticados
  },
  firstName: {
    type: String,
    trim: true,
    required: function() { return !this.user; } // Requerido solo si no hay usuario autenticado
  },
  lastName: {
    type: String,
    trim: true,
    required: function() { return !this.user; } // Requerido solo si no hay usuario autenticado
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);
