import React, { useState, useEffect } from "react";

function CharacterGallery() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          "https://api.jikan.moe/v4/anime/21/characters"
        );
        const data = await response.json();
        setCharacters(data.data);
      } catch (error) {
        console.error("Error al buscar personajes:", error);
      }
    };

    fetchCharacters();
  }, []);

  const openModal = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          Galería de personajes
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {characters.map((character) => (
            <div
              key={character.character.mal_id}
              className="bg-red-800 rounded-lg overflow-hidden hover:bg-red-700 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => openModal(character)}
            >
              <div className="p-4">
                <img
                  src={character.character.images.jpg.image_url}
                  alt={character.character.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedCharacter && (
        <CharacterModal character={selectedCharacter} closeModal={closeModal} />
      )}
    </div>
  );
}

function CharacterModal({ character, closeModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white max-w-md mx-auto rounded-lg overflow-hidden shadow-lg relative">
        <div className="bg-white max-w-md mx-auto rounded-lg overflow-hidden shadow-lg">
          {/* Modal content */}
          <div className="flex flex-row">
            {/* Image */}
            <div className="w-50">
              <img
                src={character.character.images.jpg.image_url}
                alt={character.character.name}
                className="w-full object-cover"
              />
            </div>
            {/* Details */}
            <div className="w-50">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    {character.character.name}
                  </h2>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={closeModal}
                  >
                    X
                  </button>
                </div>
                <div className="my-4">
                  <h3 className="text-lg font-bold">Rol: {character.role}</h3>
                  <p className="text-gray-700">
                    Favoritos: {character.favorites}
                  </p>
                </div>
                <div className="my-4">
                  <h3 className="text-lg font-bold">Actores de voz:</h3>
                  <ul className="list-disc pl-4">
                    {character.voice_actors.map((actor) => (
                      <li key={actor.person.mal_id}>
                        <a
                          href={actor.person.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {actor.person.name}
                        </a>{" "}
                        - {actor.language}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterGallery;
