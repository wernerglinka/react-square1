import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import ListLink from '../list-link';
import styles from './nav-bar.module.scss';


const NavBar = ({ hasLinks }) => {
  const linkList = (
    <ul className={styles.linkList}>
      <ListLink to="/">Home</ListLink>
      <ListLink to="/about/">About</ListLink>
      <ListLink to="/files">Files</ListLink>
      <ListLink to="/soft-scroll-demo">Soft Scroll Demo</ListLink>
    </ul>
  );
  return (
    <nav className={styles.navBar}>
      <Link to="/">
        <img className={styles.mainLogo} src="/assets/images/main-logo.png" alt="main logo" />
      </Link>
      { hasLinks && linkList }
    </nav>
  );
};

NavBar.propTypes = {
  hasLinks: PropTypes.bool.isRequired
};

export default NavBar;
