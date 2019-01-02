import React from 'react';
import PropTypes from 'prop-types';
import styles from './page-banner.module.scss';
import CTA from '../cta-button';

/**
 *  page banner
 *  can be used as a regular page banner under the nav or as an in-page-CTA
 *  background may be fixed or scroll
 *  may be used without a CTA -> see propTypes below
 */
const Banner = (props) => {
  // destructure props with object in it
  const {
    banner: {
      title, bgImgURL, ctaText, ctaURL, fixedBg
    }
  } = props;

  // add the banner image as a background image inline
  // and overwrite background attachement and position if attachment is fixed
  const bannerStyle = {
    backgroundImage: `url(${bgImgURL})`,
    backgroundAttachment: fixedBg ? 'fixed' : 'scroll',
    backgroundPosition: fixedBg ? 'center 180px' : 'center'
  };

  const btnHTML = (
    <div className={styles.btnWrapper}>
      <CTA ctaText={ctaText} ctaURL={ctaURL} btnVariant="primary" />
    </div>
  );

  return (
    <div className={styles.pageBanner} style={bannerStyle}>
      <h1>{title}</h1>
      {ctaText && ctaURL && btnHTML}
    </div>
  );
};

Banner.defaultProps = {
  banner: PropTypes.shape({
    ctaText: '',
    ctaURL: ''
  })
};

Banner.propTypes = {
  banner: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bgImgURL: PropTypes.string.isRequired,
    ctaText: PropTypes.string,
    ctaURL: PropTypes.string,
    fixedBg: PropTypes.bool.isRequired
  })

};

export default Banner;
