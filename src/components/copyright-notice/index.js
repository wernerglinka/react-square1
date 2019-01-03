import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styles from './copyright-notice.module.scss';

const CopyrightNotice = () => (
  <StaticQuery
    query={graphql`
        query {
            site {
                siteMetadata {
                    siteOwner {
                        name
                        fullLegalName
                    }
                }
            }
        }`
    }
    render={(data) => {
      const name = data.site.siteMetadata.siteOwner.name;
      const legalName = data.site.siteMetadata.siteOwner.fullLegalName;
      return (
        <div className={`copyright-notice ${styles.copyright}`}>{`© Copyright ${legalName}  ${name} and the ${name} Logo are trademarks of ${legalName}`}</div>
      );
    }}
  />
);

export default CopyrightNotice;
