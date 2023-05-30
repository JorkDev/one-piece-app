import React, { useEffect } from "react";

function AnimePage() {
  const [episodes, setEpisodes] = React.useState([]);

  useEffect(() => {
    const getEpisodes = async () => {
      try {
        const response = await fetch(
          "https://api.jikan.moe/v4/anime/21/episodes"
        );
        const data = await response.json();
        setEpisodes(data.data);
      } catch (error) {
        console.error("Error buscando episodios:", error);
      }
    };

    getEpisodes();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Episodios</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {episodes.map((episode) => (
            <div
              key={episode.mal_id}
              className="bg-red-800 rounded-lg overflow-hidden hover:bg-red-700 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="p-4">
                <h2 className="text-lg font-bold text-white mb-2">
                  {episode.title}
                </h2>
                <p className="text-sm text-gray-400">{`Score: ${episode.score}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnimePage;