/* eslint jsx-a11y/no-noninteractive-element-interactions:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.scss';

class ModalContent extends React.Component {
  render() {
    const {
      ariaLabel,
      closeButtonRef,
      content,
      modalRef,
      onClickAway,
      onClose,
      onKeyDown,
      overlayRef
    } = this.props;

    return ReactDOM.createPortal(
      <aside
        role="dialog"
        className={styles.overlay}
        aria-label={ariaLabel}
        aria-modal="true"
        tabIndex="-1"
        onKeyDown={onKeyDown}
        onClick={onClickAway}
        ref={overlayRef}
      >
        <div className={styles.modal} ref={modalRef}>
          <button type="button" className={styles.close} aria-labelledby="close-modal" onClick={onClose} ref={closeButtonRef}>
            <span id="close-modal" className="hide-visually">Close Modal</span>
            <i className="icon icon-x" />
          </button>
          <div className={styles.body}>
            <div className="videoWrapper">
              {content}
            </div>
          </div>
        </div>
      </aside>,
      document.body
    );
  }
}
export default ModalContent;
