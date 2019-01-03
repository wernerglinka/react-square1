import React from 'react';
import PropTypes from 'prop-types';
import styles from './media-vertical.module.scss';

const MediaItemVertical = (props) => {
  const { content: { mediaImgURL, mediaTitle, mediaProse } } = props;

  return (
    <div className={styles.feature}>
      <img src={mediaImgURL} alt="" />
      <div className={styles.mediaProse}>
        <h3>{mediaTitle}</h3>
        {mediaProse}
      </div>
    </div>
  );
};

MediaItemVertical.propTypes = {
  content: PropTypes.shape({
    mediaImgURL: PropTypes.string.isRequired,
    mediaTitle: PropTypes.string.isRequired,
    mediaProse: PropTypes.string.isRequired
  }).isRequired
};

export default MediaItemVertical;
