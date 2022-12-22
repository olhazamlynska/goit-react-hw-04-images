import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { ModalDiv, Overlay } from 'components/Modal/Modal.styled';

export function Modal({ onClose, largeImageURL, tags }) {
  const closeByBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const closeByEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeByEsc);

    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [onClose]);

  return (
    <Overlay onClick={closeByBackdrop}>
      <ModalDiv>
        <img src={largeImageURL} alt={tags}></img>
      </ModalDiv>
    </Overlay>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
