import React, { useState, useEffect } from "react";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://api.jikan.moe/v4/anime/21/news"
        );
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-4">News Section</h1>
        <div className="flex flex-wrap -mx-4">
          {news.map((newsItem) => (
            <div
              key={newsItem.mal_id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-8"
              onClick={() => openModal(newsItem)}
            >
              <div className="bg-red-800 rounded-lg overflow-hidden hover:bg-red-700 hover:transform hover:scale-105 transition-all duration-300 cursor-pointer">
                <img
                  src={newsItem.images.jpg.image_url}
                  alt={newsItem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-white mb-2">
                    {newsItem.title}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {newsItem.date} by{" "}
                    <a
                      href={newsItem.author_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {newsItem.author_username}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedNews && (
        <NewsModal newsItem={selectedNews} closeModal={closeModal} />
      )}
    </div>
  );
}

function NewsModal({ newsItem, closeModal }) {
  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white max-w-md mx-auto rounded-lg overflow-hidden shadow-lg relative">
        {/* Modal content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{newsItem.title}</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              X
            </button>
          </div>
          <img
            src={newsItem.images.jpg.image_url}
            alt={newsItem.title}
            className="w-full h-48 object-cover mb-4"
          />
          <p className="text-gray-600">{newsItem.excerpt}</p>
          <div className="mt-4">
            <p className="text-gray-400 text-sm">
              Published on {newsItem.date} by{" "}
              <a
                href={newsItem.author_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {newsItem.author_username}
              </a>
            </p>
            <p className="text-gray-400 text-sm">
              <a
                href={newsItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;