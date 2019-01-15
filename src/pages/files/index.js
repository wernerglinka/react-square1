/* eslint react/jsx-one-expression-per-line:0 */

import React from 'react';
// import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../../templates/default';

const FileList = (props) => {
  const hasLinks = false;

  // top message
  // if the page uses a local pageToMessage defined it here
  // if page uses a site-wide topMessage use "data.site.siteMetadata.topMessage"
  // if no topMessage delete or comment-out this part
  const { data: { site: { siteMetadata: { topMessage } } } } = props;

  // the all files list
  const { data: { allFile: { edges: allFiles } } } = props;

  // array with all column titles
  const { data: { allFile: { edges } } } = props;
  const titleArray = edges[0].node;

  return (
    <Layout
      topMessage={topMessage}
      hasLinks={hasLinks}
    >

      <div className="main-content">
        <div className="container">

          <h1>My Site's Files</h1>
          <table>
            <thead>
              <tr>
                {Object.keys(titleArray).map((title, index) => (
                  // make title from camelcase variable. E.g capitalize first letter and add space before following capaital latters
                  <th key={index}>{title.charAt(0).toUpperCase() + title.slice(1).replace(/([A-Z])/g, ' $1')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allFiles.map(({ node }, index) => (
                <tr key={index}>
                  <td>{node.relativePath}</td>
                  <td>{node.prettySize}</td>
                  <td>{node.extension}</td>
                  <td>{node.birthTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};


export default FileList;

/**
 * query for page data
 */
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    site {
      siteMetadata {
        topMessage
      }
    }
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`;
