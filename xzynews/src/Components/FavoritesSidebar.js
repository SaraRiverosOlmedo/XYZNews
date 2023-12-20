import React from 'react';
import '../App.css';

const FavoritesSidebar = ({ favoriteNews, removeFromFavorites }) => {
  return (
    <div className="favorites-sidebar">
      <h2 className='titleFavorite mb-4'>Favorites</h2>
      {favoriteNews.length === 0 ? (
        <p className='titleFavorite'>No favorites yet.</p>
      ) : (
        <ul>
          {favoriteNews.map((article) => (
            <li key={article.url}>
              <div className='divFavorite'>
              <button className=' btn btn-outline-light  btnRemove mt-4' onClick={() => removeFromFavorites(article.url)}>
              <i class="fa fa-times" aria-hidden="true"></i>
                </button>
                <div >
                  <span className='titleFavorite mb-2'>{article.title}</span>
                  {article.urlToImage && (
                          <img
                            src={article.urlToImage}
                            alt="Article"
                            className="img-fluid"
                          />
                        )}
                </div>
                </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesSidebar;

