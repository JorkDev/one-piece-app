import React, { useEffect } from "react";

function NewsPage() {
  const [news, setnews] = React.useState([]);

  useEffect(() => {
    const getnews = async () => {
      try {
        const response = await fetch(
          "https://api.jikan.moe/v4/anime/21/news"
        );
        const data = await response.json();
        setnews(data.data);
      } catch (error) {
        console.error("Error buscando noticias:", error);
      }
    };

    getnews();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">Novedades</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {news.map((news) => (
            <div
              key={news.mal_id}
              className="bg-red-800 rounded-lg overflow-hidden hover:bg-red-700 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="p-4">
                <h2 className="text-lg font-bold text-white mb-2">
                  {news.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
