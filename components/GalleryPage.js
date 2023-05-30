import React, { useEffect } from "react";

function GalleryPage() {
  const [pictures, setPictures] = React.useState([]);

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

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Galería</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pictures.map((picture, index) => (
            <div
              key={index}
              className="bg-red-800 rounded-lg overflow-hidden hover:bg-red-700 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
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
    </div>
  );
}

export default GalleryPage;
