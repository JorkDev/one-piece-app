import React, { useState, useEffect } from "react";

function GalleryPage() {
  const [pictures, setPictures] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);

  useEffect(() => {
    const getPictures = async () => {
      try {
        const response = await fetch(
          "https://api.jikan.moe/v4/anime/21/pictures"
        );
        const data = await response.json();
        setPictures(data.data);
      } catch (error) {
        console.error("Error buscando imágenes:", error);
      }
    };

    getPictures();
  }, []);

  const openModal = (picture) => {
    setSelectedPicture(picture);
  };

  const closeModal = () => {
    setSelectedPicture(null);
  };

  const downloadImage = () => {
    if (selectedPicture) {
      const link = document.createElement("a");
      link.href = selectedPicture.jpg.small_image_url;
      link.download = "imagen.jpg";
      link.click();
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Galería</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pictures.map((picture, index) => (
            <div
              key={index}
              className="bg-red-800 rounded-lg overflow-hidden hover:bg-red-700 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => openModal(picture)}
            >
              <div className="p-4">
                <img
                  src={picture.jpg.image_url}
                  alt="Imagen"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPicture && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-4 relative">
            <img
              src={selectedPicture.jpg.small_image_url}
              alt="Imagen"
              className="w-64 h-64 object-cover mb-4"
            />
            <div className="flex justify-center mb-4">
              <button
                onClick={downloadImage}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Descargar
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;