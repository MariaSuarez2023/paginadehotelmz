const Reservation = require('../models/reservationModel');
const nodemailer = require('nodemailer');

exports.createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();

    // Configuración de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Opciones del correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Confirmación de Membresía en Aguagym',
      text: `Hola ${req.body.firstName},\n\nGracias por completar el formulario para unirte a Aguagym. Estamos encantados de darte la bienvenida como parte de nuestra comunidad.\n\nTu plan seleccionado: ${req.body.membership}\n\nNos pondremos en contacto contigo pronto para más detalles. \n\nGracias,\nEl equipo de Aguagym`,
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error('Error al enviar el correo:', error);
      }
      console.log('Correo enviado:', info.response);
    });

    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reservación', error });
  }
};