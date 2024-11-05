import React, { useState } from 'react';
import axios from 'axios';

const AdminRoomForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    maxPeople: '',
    images: [],
    mainImage: null
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...formData.images, ...files];
    setFormData({ ...formData, images: newImages });
    setPreviewImages(newImages.map((file) => URL.createObjectURL(file)));
  };

  const handleMainImageSelect = (index) => {
    setFormData({ ...formData, mainImage: index });
  };

  const handleImageRemove = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages,
      mainImage: formData.mainImage === index ? null : formData.mainImage > index ? formData.mainImage - 1 : formData.mainImage
    });
    setPreviewImages(newImages.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('maxPeople', formData.maxPeople);

    formData.images.forEach((image) => {
      data.append('images', image);
    });

    if (formData.mainImage !== null) {
      data.append('mainImageIndex', formData.mainImage);
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.post('http://localhost:5000/api/admin/rooms', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      setMessage({ type: 'success', text: 'Habitación creada exitosamente.' });
      setLoading(false);
      setFormData({
        title: '',
        description: '',
        price: '',
        maxPeople: '',
        images: [],
        mainImage: null
      });
      setPreviewImages([]);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al crear la habitación. Intente de nuevo.' });
      setLoading(false);
      console.error('Error creating room:', error);
    }
  };

  return (
    <div className="admin-room-form container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#c49c7c]">Agregar Nueva Habitación</h2>

      {message && (
        <p className={`mb-4 text-center ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c49c7c]"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-semibold text-gray-700">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c49c7c]"
          ></textarea>
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-semibold text-gray-700">Precio por Noche</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c49c7c]"
          />
        </div>

        <div>
          <label htmlFor="maxPeople" className="block text-lg font-semibold text-gray-700">Capacidad Máxima</label>
          <input
            type="number"
            id="maxPeople"
            name="maxPeople"
            value={formData.maxPeople}
            onChange={handleChange}
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c49c7c]"
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-lg font-semibold text-gray-700">Imágenes</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleFileChange}
            multiple
            required
            className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#c49c7c]"
          />
        </div>

        {/* Preview de imágenes con opción para seleccionar portada y eliminar */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {previewImages.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`Preview ${index}`}
                className={`w-full h-32 object-cover rounded ${formData.mainImage === index ? 'border-4 border-[#c49c7c]' : ''}`}
                onClick={() => handleMainImageSelect(index)}
              />
              {formData.mainImage === index && (
                <span className="absolute top-2 right-2 bg-[#c49c7c] text-white text-xs px-2 py-1 rounded">Portada</span>
              )}
              <button
                onClick={() => handleImageRemove(index)}
                className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-[#c49c7c] text-white font-semibold py-3 px-4 rounded hover:bg-[#b07e65] transition duration-300"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar Habitación'}
        </button>
      </form>
    </div>
  );
};

export default AdminRoomForm;
