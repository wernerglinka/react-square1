import React from 'react';
import PropTypes from 'prop-types';
import { Link as SmoothScrollLink } from 'react-scroll';
import styles from './in-page-nav.module.scss';

const InPageNavbar = (props) => {
  const { targets, sticky } = props;

  return (
    <nav className={`nav ${sticky ? 'isFixed' : ''}`} id="navbar">
      <ul className={styles.inPageNavbar}>
        {targets.map(target => (
          <li key={target}>
            <SmoothScrollLink
              activeClass="active"
              to={target}
              spy
              smooth
              offset={-70}
              duration={500}
            >
              {target}
            </SmoothScrollLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default InPageNavbar;

InPageNavbar.propTypes = {
  targets: PropTypes.arrayOf(PropTypes.string).isRequired,
  sticky: PropTypes.bool.isRequired
};
