import React from 'react';
import PropTypes from 'prop-types';
import styles from './page-top-message.module.scss';

const topMessage = (props) => {
  // destructure props with object in it
  const { topMessage: { pageTopMessage, siteTopMessage } } = props;
  const messageText = pageTopMessage || siteTopMessage;
  return (
    // the top message string might contain a link
    // airbnb eslint doesn't like this 'eslint(react/no-danger)' so we use
    // eslint-disable-next-line
    <div className={`top-message ${styles.topMessage}`} dangerouslySetInnerHTML={{ __html: messageText }} />
  );
};

topMessage.propTypes = {
  topMessage: PropTypes.shape({
    pageTopMessage: PropTypes.string,
    siteTopMessage: PropTypes.string
  })
};

topMessage.defaultProps = {
  topMessage: PropTypes.shape({
    pageTopMessage: '',
    siteTopMessage: ''
  })
};

export default topMessage;
