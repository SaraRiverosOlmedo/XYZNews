import React, { useState } from 'react';
import '../App.css';

const ShareButtons = ({ url, title, onAddToFavorites, onRemoveFromFavorites, isFavorite }) => {
  const [showButtons, setShowButtons] = useState(false);
  const [shareButtonDisabled, setShareButtonDisabled] = useState(false);

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}`;
    window.open(linkedinUrl, '_blank');
  };

  const addToFavorites = () => {
    onAddToFavorites({ title, url });
    setShareButtonDisabled(true);
  };

  const removeFromFavorites = () => {
    onRemoveFromFavorites(url);
    setShareButtonDisabled(false);
  };

  return (
    <div className="share-buttons ">
      <button
        type="button"
        className={`btn btn-danger rounded-circle mx-2 btnDanger ${shareButtonDisabled ? 'disabled' : ''}`}
        onClick={() => setShowButtons(!showButtons)}
        disabled={shareButtonDisabled}
      >
        <i class="fa fa-share-alt" aria-hidden="true"></i>
      </button>
      {showButtons && (
        <div className="d-inline-flex gap-1 btn-group mx-2 d-flex flex-wrap" role="group" style={{ margin: '10px' }}>
          <button type="button" className="btn btn-dark rounded-circle mx-2" onClick={shareOnTwitter}>
            <i className="fab fa-x-twitter"></i>
          </button>
          <button type="button" className="btn btn-primary rounded-circle mx-2" onClick={shareOnFacebook}>
            <i className="fab fa-facebook"></i>
          </button>
          <button type="button" className="btn btn-secondary rounded-circle mx-2" onClick={shareOnLinkedIn}>
            <i className="fab fa-linkedin"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
