import React, { useState, useEffect } from 'react';

const BookmarkButton = ({ article, onAddToFavorites, onRemoveFromFavorites, isFavorite }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteNews')) || [];
    const isAlreadyBookmarked = savedFavorites.some((fav) => fav.url === article.url);
    setIsBookmarked(isAlreadyBookmarked);
  }, [article.url, isFavorite]);

  const toggleBookmark = () => {
    if (isBookmarked) {
      console.log('Removing from favorites:', article.url);
      onRemoveFromFavorites(article.url);
    } else {
      console.log('Adding to favorites:', article.url);
      onAddToFavorites(article);
    }

    setIsBookmarked(!isBookmarked);
  };

  return (
  <button className='mx-2 btn btn-outline-primary' onClick={toggleBookmark} title='Add to Favorite'>
       {isBookmarked ? 'Remove from Favorites' : 'Add to Favorites'}
     </button>
  );
};

export default BookmarkButton;


