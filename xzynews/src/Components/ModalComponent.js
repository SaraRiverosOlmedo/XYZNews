import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({ show, handleClose, favorite }) => {
  // Verificar si favorite es null o undefined antes de acceder a sus propiedades
  if (!favorite) {
    return null; // O cualquier otra lógica que necesites para manejar el caso de favorito nulo
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{favorite.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {favorite.urlToImage && (
          <img
            src={favorite.urlToImage}
            alt="Article"
            className="img-fluid"
          />
        )}
        <p>{favorite.description}</p>
        {favorite.content && <p>{favorite.content}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;

