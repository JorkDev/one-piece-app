import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function AnimePage() {
  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const perPage = 20;

  useEffect(() => {
    const getEpisodes = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/21/episodes?page=${currentPage}&limit=${perPage}`
        );
        const data = await response.json();
        if (Array.isArray(data.data)) {
          setEpisodes((prevEpisodes) => [...prevEpisodes, ...data.data]);
        } else if (data.data) {
          setEpisodes((prevEpisodes) => [...prevEpisodes, data.data]);
        }
        setTotalPages(data.pagination.last_page);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    getEpisodes();
  }, [currentPage]);

  const loadMoreEpisodes = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 50
    ) {
      loadMoreEpisodes();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Episodios</h1>
        <InfiniteScroll
          dataLength={episodes.length}
          next={loadMoreEpisodes}
          hasMore={currentPage < totalPages}
          loader={<h4>Loading...</h4>}
          endMessage={<p>No hay más episodios.</p>}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {episodes.slice(0, perPage).map((episode) => (
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
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default AnimePage;