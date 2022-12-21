import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import {
  ImageLi,
  Img,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

export function ImageGalleryItem({ webformatURL, largeImageURL, tags }) {
  const [showModal, setShowModal] = useState(false);

  // Окремі ф-ї для відкриття\звкриття модалки

  //const openModal = () => {
  //  setShowModal(true);
  //};

  //const closeModal = () => {
  //  setShowModal(false);
  //};

  const toogleModal = () => {
    setShowModal(prevState => !prevState);
  };
  return (
    <>
      <ImageLi onClick={toogleModal}>
        <Img src={webformatURL} alt={tags} />
      </ImageLi>

      {showModal && (
        <Modal onClose={toogleModal}>
          <img src={largeImageURL} alt={tags}></img>
        </Modal>
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
