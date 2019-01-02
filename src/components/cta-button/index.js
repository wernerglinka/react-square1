import React from 'react';
import PropTypes from 'prop-types';
import styles from './cta-button.module.scss';

const CTAButton = (props) => {
  const {
    ctaText, ctaURL, btnVariant
  } = props;

  return (
    <a className={styles.btn} href={ctaURL} variant={btnVariant}>{ctaText}</a>
  );
};

CTAButton.defaultProps = {
  ctaText: '',
  ctaURL: '',
  btnVariant: '',
};

CTAButton.propTypes = {
  ctaText: PropTypes.string,
  ctaURL: PropTypes.string,
  btnVariant: PropTypes.string,
};

export default CTAButton;
