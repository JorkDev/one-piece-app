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
          {news.map((newsItem) => (
            <a
              key={newsItem.mal_id}
              href={newsItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-800 rounded-lg overflow-hidden hover:bg-red-700 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="p-4">
                <h2 className="text-lg font-bold text-white mb-2">
                  {newsItem.title}
                </h2>
                <img
                  src={newsItem.images.jpg.image_url}
                  alt={newsItem.title}
                  className="w-full h-48 object-cover mb-2"
                />
                <p className="text-white text-sm mb-2">
                  {newsItem.excerpt}
                </p>
                <div className="flex justify-between text-white text-sm">
                  <span>
                    {newsItem.date} by{" "}
                    <a
                      href={newsItem.author_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {newsItem.author_username}
                    </a>
                  </span>
                  <span>{newsItem.comments} comments</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsPage;