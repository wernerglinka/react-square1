import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styles from './social-links.module.scss';

const SocialLinks = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            socialLinks {
                twitter
                facebook
                linkedin
            }
          }
        }
      }`
    }
    render={(data) => {
      const allLinks = data.site.siteMetadata.socialLinks;
      return (
        <ul className={styles.socialLinks}>
          {Object.keys(allLinks).map(socialServiceName => (
            <li key={socialServiceName}>
              {/* eslint-disable-next-line */}
              <a href={allLinks[socialServiceName]} target="_blank" rel="noopener noreferrer"><i className={`icon icon-${socialServiceName}`}></i></a>
            </li>
          ))}
        </ul>
      );
    }}
  />
);

export default SocialLinks;
