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

export default CharacterGallery;