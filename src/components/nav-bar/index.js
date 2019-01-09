import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
// import AniLink from 'gatsby-plugin-transition-link/AniLink';
import styles from './nav-bar.module.scss';


const NavBar = ({ hasLinks }) => {
  const linkList = (
    <ul className={styles.linkList}>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about/">About</Link></li>
      <li><Link to="/files">Files</Link></li>
      <li><Link to="/soft-scroll-demo">Soft Scroll Demo</Link></li>
      <li><Link to="/news">News</Link></li>
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
