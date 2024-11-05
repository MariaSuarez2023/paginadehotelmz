import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RoomDetails = () => {
  const { id } = useParams(); // Obtener el ID de la habitación de los parámetros de la URL
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room details:', error);
        setError("Unable to fetch room details. Please try again later.");
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  if (loading) return <p>Loading room details...</p>;
  if (error) return <p>{error}</p>;
  if (!room) return <p>Room not found.</p>;

  return (
    <div className="room-details container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">{room.title}</h2>
      <p className="text-gray-600 mb-4">{room.description}</p>
      <p className="text-lg font-semibold text-gray-800 mb-4">Price: ${room.price} per night</p>
      <p className="text-gray-600 mb-4">Max People: {room.maxPeople}</p>

      <div className="images grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {room.images && room.images.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:5000/uploads/${image}`}
            alt={`Room ${index + 1}`}
            className="rounded-lg shadow-lg"
          />
        ))}
      </div>

      <div className="reviews">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        {room.reviews && room.reviews.length > 0 ? (
          <ul>
            {room.reviews.map((review, index) => (
              <li key={index} className="mb-4">
                <p className="font-semibold text-gray-800">Rating: {review.rating} / 5</p>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-sm text-gray-500">- {review.userName}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
