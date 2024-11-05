import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-stars';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState({
    firstName: '',
    lastName: '',
    rating: 0,
    comment: '',
  });
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room details:', error);
        setError("No se pueden cargar los detalles de la habitación. Inténtelo más tarde.");
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const handleReviewChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (newRating) => {
    setReview({ ...review, rating: newRating });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      await axios.post(`http://localhost:5000/api/rooms/${id}/reviews`, review);
      setSuccessMessage("Reseña enviada exitosamente.");
      setReview({ firstName: '', lastName: '', rating: 0, comment: '' });
      const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
      setRoom(response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmitError("Error al enviar la reseña. Inténtelo de nuevo.");
    }
  };

  if (loading) return <p>Cargando detalles de la habitación...</p>;
  if (error) return <p>{error}</p>;
  if (!room) return <p>Habitación no encontrada.</p>;

  return (
    <div className="room-details container mx-auto px-4 py-12">
      {/* Room Title and Description */}
      <h2 className="text-4xl font-bold text-center text-[#c49c7c] mb-6">{room.title}</h2>
      <p className="text-lg text-center text-gray-600 mb-8">{room.description}</p>
      <p className="text-2xl font-semibold text-gray-800 mb-4 text-center">${room.price} / noche</p>
      <p className="text-gray-700 text-center mb-8">Capacidad máxima: {room.maxPeople} personas</p>

      {/* Room Images Gallery */}
      <div className="images grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {room.images && room.images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/${image}`}
            alt={`Imagen ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>

      {/* Reviews Section */}
      <div className="reviews mb-12">
        <h3 className="text-3xl font-semibold text-[#c49c7c] mb-6 text-center">Reseñas</h3>
        {room.reviews && room.reviews.length > 0 ? (
          <ul className="space-y-6">
            {room.reviews.map((review, index) => (
              <li key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <ReactStars
                  count={5}
                  value={review.rating}
                  edit={false}
                  size={24}
                  color2={'#ffd700'}
                />
                <p className="text-gray-600 mt-2">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">- {review.firstName} {review.lastName}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">Aún no hay reseñas para esta habitación.</p>
        )}
      </div>

      {/* Review Form */}
      <div className="review-form bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-center text-[#c49c7c] mb-4">Agregar una Reseña</h3>
        {submitError && <p className="text-red-600 text-center mb-4">{submitError}</p>}
        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}
        
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-lg font-semibold text-gray-700">Nombre</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={review.firstName}
                onChange={handleReviewChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c49c7c]"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-lg font-semibold text-gray-700">Apellido</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={review.lastName}
                onChange={handleReviewChange}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c49c7c]"
              />
            </div>
          </div>
          <div>
            <label htmlFor="rating" className="block text-lg font-semibold text-gray-700">Calificación</label>
            <ReactStars
              count={5}
              onChange={handleRatingChange}
              size={32}
              color1={'#ddd'}
              color2={'#ffd700'}
              value={review.rating}
            />
          </div>
          <div>
            <label htmlFor="comment" className="block text-lg font-semibold text-gray-700">Comentario</label>
            <textarea
              id="comment"
              name="comment"
              value={review.comment}
              onChange={handleReviewChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c49c7c]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#c49c7c] text-white font-semibold py-3 rounded hover:bg-[#b07e65] transition duration-300"
          >
            Enviar Reseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomDetails;
