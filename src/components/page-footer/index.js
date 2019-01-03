import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ListLink from '../list-link';
import CopyrightNotice from '../copyright-notice';
import SocialLinks from '../social-links';
import styles from './page-footer.module.scss';

const Footer = (props) => {
  // destructure props with object in it
  const { footerBgImg, hasLinks } = props;

  // add the banner image as a background image inline
  const footerStyle = {
    backgroundImage: `url(${footerBgImg})`,
  };

  const linkList = (
    <ul className={styles.linkList}>
      <ListLink to="/">Home</ListLink>
      <ListLink to="/about/">About</ListLink>
      <ListLink to="/files">Files</ListLink>
    </ul>
  );

  return (
    <footer className={styles.footer} style={footerStyle}>
      <Link to="/">
        <img className={styles.mainLogo} src="/assets/images/main-logo.png" alt="main logo" />
      </Link>
      { hasLinks && linkList }

      <CopyrightNotice />
      <SocialLinks />
    </footer>
  );
};

Footer.defaultProps = {
  hasLinks: null,
  footerBgImg: null
};

Footer.propTypes = {
  hasLinks: PropTypes.bool,
  footerBgImg: PropTypes.string
};

export default Footer;
