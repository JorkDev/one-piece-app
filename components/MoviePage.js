import React, { useState, useEffect } from "react";

function MovieModal({ movie, onClose }) {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${movie.mal_id}/characters`
        );
        const data = await response.json();
        setCharacters(data.data.characters);
      } catch (error) {
        console.error("Error al buscar personajes:", error);
      }
    };

    fetchCharacters();
  }, [movie.mal_id]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-black p-4 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>

        {movie.trailer && movie.trailer.youtube_id ? (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${movie.trailer.youtube_id}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No hay tráiler disponible para esta película.</p>
        )}

        <p className="text-lg mt-4">{movie.synopsis}</p>

        <h3 className="text-xl font-bold mt-4">Personajes:</h3>
        <ul className="text-left">
          {characters?.map((character) => (
            <li key={character.mal_id}>{character.name}</li>
          ))}
        </ul>

        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  function openModal(movie) {
    setSelectedMovie(movie);
  }

  function closeModal() {
    setSelectedMovie(null);
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Películas de One Piece</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.mal_id}
              className="bg-red-800 rounded-lg overflow-hidden hover:bg-red-700 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => openModal(movie)}
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

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default MoviePage;