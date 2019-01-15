import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.scss';


const ModalLink = ({ openButtonRef, onOpen, text, type }) => { // eslint-disable-line
  const ButtonTrigger = <button type="button" className={styles.button} onClick={onOpen} ref={openButtonRef}>{text}</button>;
  const InlineTrigger = <span role="button" tabIndex="0" className={styles.inline} onClick={onOpen} ref={openButtonRef}>{text}</span>; // eslint-disable-line

  return (
    type === 'isButton' ? ButtonTrigger : InlineTrigger
  );
};

export default ModalLink;

ModalLink.propTypes = {
  openButtonRef: PropTypes.func.isRequired,  //eslint-disable-line
  onOpen: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string
};
