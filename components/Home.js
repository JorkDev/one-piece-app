// import React from "react";

function HomePage() {
  return (
    <div className="flex items-center justify-center" style={{ paddingTop: "20vh" }}>
      <div className="max-w-md mx-auto px-6 py-12 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-300">One Piece API</h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          ¡Bienvenido a mi página de inicio! Aquí puedes encontrar información sobre mi proyecto y explorar mi repositorio virtual.
        </p>
        <a
          href="https://github.com/JorkDev/one-piece-app"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full"
        >
          Ver en GitHub
        </a>
      </div>
    </div>
  );
}

export default HomePage;
