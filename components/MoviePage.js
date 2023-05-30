import React, { useState, useEffect } from "react";

function MovieModal({ movie, characters, onClose }) {
  const firstFiveCharacters = characters.slice(0, 5);
  const [hoveredCharacter, setHoveredCharacter] = useState(null);
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 });

  const handleCharacterHover = (character, event) => {
    setHoveredCharacter(character);
    setBubblePosition({ x: event.clientX, y: event.clientY });
  };

  const handleCharacterHoverExit = () => {
    setHoveredCharacter(null);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-black p-4 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>

        <div className="aspect-w-16 aspect-h-9 flex items-center justify-center">
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
        </div>

        <p className="text-lg mt-4">{movie.synopsis}</p>

        <h3 className="text-xl font-bold mt-4">Personajes:</h3>
        <div className="flex flex-wrap justify-center">
          {firstFiveCharacters.map((character) => (
            <div
              key={character.character.mal_id}
              className="w-1/5 p-2"
              onMouseEnter={(event) => handleCharacterHover(character, event)}
              onMouseLeave={handleCharacterHoverExit}
            >
              <h3>{character.character.name}</h3>
            </div>
          ))}
        </div>

        {hoveredCharacter && (
          <div
            className="absolute bg-white p-2 rounded shadow text-black"
            style={{
              top: bubblePosition.y,
              left: bubblePosition.x,
            }}
          >
            <h4>{hoveredCharacter.name}</h4>
            <p>Role: {hoveredCharacter.role}</p>
            <p>Favoritos: {hoveredCharacter.favorites}</p>
          </div>
        )}

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
  const [selectedCharacters, setSelectedCharacters] = useState([]);

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

  async function fetchCharacters(movieId) {
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime/${movieId}/characters`
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al buscar los personajes:", error);
      return [];
    }
  }

  async function openModal(movie) {
    setSelectedMovie(movie);
    const characters = await fetchCharacters(movie.mal_id);
    setSelectedCharacters(characters);
  }

  function closeModal() {
    setSelectedMovie(null);
    setSelectedCharacters([]);
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Películas de One Piece
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.mal_id}
              className="bg-red-800 rounded-lg overflow-hidden shadow-lg relative aspect-w-16 aspect-h-9 hover:scale-105 cursor-pointer"
              onClick={() => openModal(movie)}
            >
              <img
                src={movie.images.jpg.image_url}
                alt={movie.title}
                className="w-full"
              />
              <div className="p-2">
                <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                <p className="text-white text-sm">
                  Duración: {movie.duration} min
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          characters={selectedCharacters}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default MoviePage;
