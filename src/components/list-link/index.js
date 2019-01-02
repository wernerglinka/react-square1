import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styles from './list-link.module.scss';


const ListLink = (props) => {
  const { to, children } = props;
  return (
    <li className={styles.listItem}>
      <Link to={to}>{children}</Link>
    </li>
  );
};

ListLink.defaultProps = {
  to: '',
  children: ''
};

ListLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.string
};

export default ListLink;
