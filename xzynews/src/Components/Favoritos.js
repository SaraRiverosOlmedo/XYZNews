// Favoritos.js
import React from 'react';

const Favoritos = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="favoritos">
      <h3>Favoritos</h3>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>
            <a href={favorite.url} target="_blank" rel="noopener noreferrer">
              {favorite.title}
            </a>
            <button onClick={() => removeFromFavorites(favorite.url)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favoritos;

