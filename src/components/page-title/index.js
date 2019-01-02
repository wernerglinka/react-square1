import React from 'react';
import PropTypes from 'prop-types';
import styles from './page-title.module.scss';

const pageTitle = (props) => {
  const { headerText } = props;
  return (
    <h1 className={`page-title ${styles.pageTitle}`}>{headerText}</h1>
  );
};

pageTitle.defaultProps = {
  headerText: ''
};

pageTitle.propTypes = {
  headerText: PropTypes.string
};

export default pageTitle;
