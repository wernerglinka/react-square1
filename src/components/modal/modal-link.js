import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.scss';

const ModalLink = ({ openButtonRef, onOpen, text }) => <button type="button" className={styles.cBtn} onClick={onOpen} ref={openButtonRef}>{text}</button>;

export default ModalLink;

ModalLink.propTypes = {
  openButtonRef: PropTypes.func.isRequired,  //eslint-disable-line
  onOpen: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};
