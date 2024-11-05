import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [maxPeopleFilter, setMaxPeopleFilter] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms');
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError("No se pueden cargar las habitaciones. Inténtelo más tarde.");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleFilterChange = (e) => {
    setMaxPeopleFilter(e.target.value);
  };

  const filteredRooms = maxPeopleFilter
    ? rooms.filter(room => room.maxPeople >= maxPeopleFilter)
    : rooms;

  if (loading) return <p>Cargando habitaciones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center text-[#c49c7c] mb-10">Habitaciones Disponibles</h2>

      {/* Filtro de personas */}
      <div className="flex justify-center mb-8">
        <input
          type="number"
          id="maxPeople"
          placeholder="Filtrar por cantidad de personas"
          value={maxPeopleFilter}
          onChange={handleFilterChange}
          className="p-3 border border-gray-300 rounded-lg w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-[#c49c7c]"
        />
      </div>

      {/* Lista de habitaciones */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRooms.map((room) => (
          <li key={room._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/rooms/${room._id}`}>
              <div className="relative">
                {/* Renderizar la imagen de portada usando room.imageUrl con fallback */}
                <img 
                  src={room.imageUrl || '/path/to/default-image.jpg'} 
                  alt={room.title} 
                  className="w-full h-48 object-cover" 
                />
                <span className="absolute top-2 right-2 bg-[#c49c7c] text-white text-xs font-semibold px-2 py-1 rounded">
                  ${room.price} / noche
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-semibold text-gray-800">{room.title}</h3>
                <p className="text-gray-600 mt-2 mb-4">{room.description.slice(0, 100)}...</p>
                <p className="text-gray-700 font-medium">Capacidad máxima: {room.maxPeople} personas</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsList;
