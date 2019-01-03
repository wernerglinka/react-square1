import React from 'react';
import PropTypes from 'prop-types';
import styles from './page-top-message.module.scss';

const topMessage = (props) => {
  // re-assign new variable name to get arount eslint no-shadow warnings
  // e.g. "topMessage" becomes "message"
  const { topMessage: message } = props;

  return (
    // the top message string might contain a link
    // airbnb eslint doesn't like this 'eslint(react/no-danger)' so we use
    // eslint-disable-next-line
    <div className={`top-message ${styles.topMessage}`} dangerouslySetInnerHTML={{ __html: message }} />
  );
};

topMessage.propTypes = {
  topMessage: PropTypes.string
};

topMessage.defaultProps = {
  topMessage: ''
};

export default topMessage;
