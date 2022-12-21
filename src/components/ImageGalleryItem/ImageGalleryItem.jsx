import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import {
  ImageLi,
  Img,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  state = {
    showModal: false,
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;

    return (
      <>
        <ImageLi onClick={this.openModal}>
          <Img src={webformatURL} alt={tags} />
        </ImageLi>

        {this.state.showModal && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt={tags}></img>
          </Modal>
        )}
      </>
    );
  }
}
