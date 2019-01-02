import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ListLink from '../list-link';
import styles from './page-footer.module.scss';

const Footer = ({ hasLinks }) => {
  const linkList = (
    <ul className={styles.linkList}>
      <ListLink to="/">Home</ListLink>
      <ListLink to="/about/">About</ListLink>
      <ListLink to="/files">Files</ListLink>
    </ul>
  );

  return (
    <footer className={styles.footer}>
      <Link to="/">
        <img className={styles.mainLogo} src="/images/main-logo.png" alt="main logo" />
      </Link>
      { hasLinks && linkList }
    </footer>

  );
};

Footer.propTypes = {
  hasLinks: PropTypes.bool.isRequired
};

export default Footer;
