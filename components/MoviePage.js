import React, { useState, useEffect } from "react";

function MoviePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.jikan.moe/v4/anime?q=one%20piece&type=Movie"
        );
        const data = await response.json();
        setMovies(data.data);
      } catch (error) {
        console.error("Error al buscar películas:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Películas de One Piece</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.mal_id}
              className="bg-red-800 rounded-lg overflow-hidden hover:bg-red-700 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="p-4">
                <img
                  src={movie.images.jpg.image_url}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="text-white text-center mt-2">
                  {movie.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;