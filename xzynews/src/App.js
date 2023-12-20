import React, { useState } from 'react';
import NewsList from './NewsList';
import FavoritesSidebar from './Components/FavoritesSidebar';

function App() {
  const [favoriteNews, setFavoriteNews] = useState([]);

  const addToFavorites = (news) => {
    setFavoriteNews((prevFavorites) => [...prevFavorites, news]);
  };

  const removeFromFavorites = (url) => {
    setFavoriteNews((prevFavorites) =>
      prevFavorites.filter((news) => news.url !== url)
    );
  };

  return (
    <div className="">
      
        <NewsList
          favoriteNews={favoriteNews}
          addToFavorites={addToFavorites}
          removeFromFavorites={removeFromFavorites}
        />
        <FavoritesSidebar
          favoriteNews={favoriteNews}
          removeFromFavorites={removeFromFavorites}
        />
      
    </div>
  );
}

export default App;