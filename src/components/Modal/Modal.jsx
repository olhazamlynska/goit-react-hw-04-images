import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { ModalDiv, Overlay } from 'components/Modal/Modal.styled';

export class Modal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    window.addEventListener('keydown', this.closeByEsc);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  closeByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  closeByBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Overlay onClick={this.closeByBackdrop}>
        <ModalDiv>{this.props.children}</ModalDiv>
      </Overlay>
    );
  }
}
