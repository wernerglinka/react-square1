// source: https://github.com/Assortment/react-modal-component

import React, { Component, Fragment } from 'react';
import ModalLink from './modal-link';
import ModalContent from './modal-content';
import './modal.module.scss';

class Modal extends Component {
  state = { isOpen: false };

  // close modal with ESC key
  // because we have the keydown event attached to the overlay element, the event will only trigger
  // if the overlay or one of its children are currently focussed which isn't the case when the modal
  // is first opened. It'll still be set to the Modal's trigger button.
  // that is the reason why we set focus on the close button in the onOpen method below
  onKeyDown = ({ keyCode }) => keyCode === 27 && this.onClose();

  onOpen = () => {
    this.setState({ isOpen: true }, () => {
      this.closeButtonNode.focus();
    });
    this.toggleScrollLock();
  };

  // when either the close button, the ESC key or the overlay is clicked we first fade out
  // the overlay and then set state isOpen to false
  onClose = () => {
    this.overlayNode.classList.add('isClosing');
    setTimeout(() => {
      this.setState({ isOpen: false });
      this.toggleScrollLock();
    }, 1000);
  };

  // clicking on the overlay - outside the modal - closes the modal
  onClickAway = (e) => {
    if (this.modalNode && this.modalNode.contains(e.target)) return;
    this.onClose();
  };

  // prevent body scrolling when modal is open
  toggleScrollLock = () => document.querySelector('html').classList.toggle('lock-scroll');

  render() {
    const { isOpen } = this.state;
    const { ariaLabel, children, triggerText, triggerType } = this.props; // eslint-disable-line
    return (
      <Fragment>
        <ModalLink
          onOpen={this.onOpen}
          openButtonRef={(element) => { this.openButtonNode = element; }}
          text={triggerText}
          type={triggerType}
        />
        {isOpen
          && (
          <ModalContent
            ariaLabel={ariaLabel}
            overlayRef={(element) => { this.overlayNode = element; }}
            closeButtonRef={(element) => { this.closeButtonNode = element; }}
            modalRef={(element) => { this.modalNode = element; }}
            content={children}
            onClickAway={this.onClickAway}
            onClose={this.onClose}
            onKeyDown={this.onKeyDown}
          />
          )
        }
      </Fragment>
    );
  }
}

export default Modal;
