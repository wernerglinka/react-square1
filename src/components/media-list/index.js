import React from 'react';
import PropTypes from 'prop-types';
import styles from './media-list.module.scss';
import MediaModuleVertical from '../media-module-vertical';

const MediaList = (props) => {
  const { allMediaItems } = props;

  return (
    <ul className={styles.mediaList}>
      <MediaModuleVertical />
    </ul>
  );
};

MediaList.propTypes = {
  // eslint-disable-next-line
  allMediaItems: PropTypes.array.isRequired,
};

export default MediaList;
