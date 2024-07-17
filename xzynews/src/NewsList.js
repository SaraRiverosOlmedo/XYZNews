import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookmarkButton from './Components/BookmarkButton';
import FavoritesSidebar from './Components/FavoritesSidebar';
import ShareButtons from './Components/ShareButtons';
import blue_earth from '../src/img/blue_earth.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'react-bootstrap';
import './App.css';

const NewsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [copied, setCopied] = useState(false);
  const [sortOption, setSortOption] = useState('none');
  const [showSidebar, setShowSidebar] = useState(true);
  const [favoriteNews, setFavoriteNews] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteNews')) || [];
    setFavoriteNews(storedFavorites);
  }, []);

  const addToFavorites = (article) => {
    setFavoriteNews((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, article];
      localStorage.setItem('favoriteNews', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
    setCopied(false);

    setFilteredArticles((prevArticles) =>
      prevArticles.filter((prevArticle) => prevArticle.url !== article.url)
    );
  };

  const removeFromFavorites = (url) => {
    setFavoriteNews((prevFavorites) => {
      const removedNews = prevFavorites.find((article) => article.url === url);
      const updatedFavorites = prevFavorites.filter((article) => article.url !== url);
      localStorage.setItem('favoriteNews', JSON.stringify(updatedFavorites));

      setFilteredArticles((prevArticles) => [removedNews, ...prevArticles]);

      return updatedFavorites;
    });
  };

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        'https://newsapi.org/v2/top-headlines',
        {
          params: {
            country: 'us',
            category: 'business',
            apiKey: '0bda8cd68fc3488789fb627181aeabae',
          },
        }
      );

      const filtered = response.data.articles.filter((article) =>
        article.title && article.url && article.description && article.publishedAt
      );

      const filteredDates = filtered.filter((article) =>
        article.publishedAt !== '1970-01-01T00:00:00Z'
      );

      const searchTermFiltered = searchTerm
        ? filteredDates.filter((article) =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : filteredDates;

      let sortedArticles = [...searchTermFiltered];

      if (sortOption === 'date') {
        sortedArticles = sortedArticles.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
      } else if (sortOption === 'alphabet') {
        sortedArticles = sortedArticles.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      }

      // Filtrar las noticias que ya están en favoritos
      const nonFavoriteArticles = sortedArticles.filter(
        (article) => !favoriteNews.some((fav) => fav.url === article.url)
      );

      setFilteredArticles(nonFavoriteArticles);

      if (searchTerm && !sortedArticles.length) {
        setCopied(false);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [searchTerm, sortOption, favoriteNews]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="">
      <div className='d-inline-flex pt-10 gap-1 container d-flex justify-content-between'>
        <div className='d-inline-flex'>
          <h1 className='text-light pt-4'>
            XYZNEWS
          </h1>
          <img src={blue_earth} className='blue_earth' alt="Descripción de la imagen" />
        </div>
        <div style={{ position: 'relative' }}>
          <FontAwesomeIcon className='iconHeart' icon={faHeart} size="2x" />
          <Badge
            pill
            bg="danger"
            className='badgeRed'
          >
            {favoriteNews.length}
          </Badge>
        </div>
      </div>
      <div>
        <div className="row bodyNews">
          <div className="col-md-9">
            <div className='pt-10 gap-1 searchNews'>
              <form className="mb-4 searchNewsForm">
                <div className="input-group-with-icon">
                  <input
                    type="text"
                    className="form-control"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Search your news"
                  />
                  <div className="input-group-append">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </div>
                </div>
              </form>
              <div className='ad-inline-flex selectNews'>
                <label className='sortNews'>Sort by: </label>
                <select
                  className='form-select form-select-sm optionNews'
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="none">None</option>
                  <option value="date">Date</option>
                  <option value="alphabet">A to Z</option>
                </select>
              </div>
            </div>
            <div className="news-list-container">
              <div className="news-list card">
                {filteredArticles.length === 0 ? (
                  <p className='ms-4'>No results found.</p>
                ) : (
                  filteredArticles.map((article) => (
                    <div key={article.url} className="mb-4 articleNews">
                      <h2 className='titleNews'>{article.title}</h2>
                      <p>{article.description}</p>
                      {article.urlToImage && (
                        <img
                          src={article.urlToImage}
                          alt="Article"
                          className="img-fluid"
                        />
                      )}
                      {article.content && <p>{article.content}</p>}

                      <a
                        href={article.url}
                        className='pb-4'
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'flex' }}
                      >
                        Read more
                      </a>
                      <div className='d-inline-flex btnsNews gap-1'>
                        <ShareButtons
                          url={article.url}
                          title={article.title}
                          onAddToFavorites={() => addToFavorites(article)}
                          onRemoveFromFavorites={() => removeFromFavorites(article.url)}
                          isFavorite={favoriteNews.some((fav) => fav.url === article.url)}
                        />
                        <button
                          type="button"
                          className="btn btn-light rounded-circle"
                          onClick={() => handleCopy(article.url)}
                        >
                          <i className="fa fa-clone" aria-hidden="true"></i>
                        </button>

                        <BookmarkButton
                          article={article}
                          onAddToFavorites={() => addToFavorites(article)}
                          onRemoveFromFavorites={() => removeFromFavorites(article.url)}
                          isFavorite={favoriteNews.some((fav) => fav.url === article.url)}
                        />

                        <hr />
                      </div>
                      {copied && <p>URL copied to clipboard!</p>}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="col-md-3 pt-3 favoriteNews">
            {showSidebar && (
              <FavoritesSidebar
                favoriteNews={favoriteNews}
                removeFromFavorites={removeFromFavorites}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsList;
