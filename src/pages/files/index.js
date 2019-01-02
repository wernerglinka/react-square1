import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../../templates/default';

export default ({ data }) => {
  // if page has a top message then set properties in object literal topoMessage.
  // if a pageToMessage is defined it will be shown. otherwise siteTopMessage will be shown
  const topMessage = {
    hasTopMessage: false,
    pageTopMessage: '',
    siteTopMessage: data.site.siteMetadata.topMessage,
  };

  return (
    <Layout topMessage={topMessage}>
      <div>
        <h1>My Site's Files</h1>
        <table>
          <thead>
            <tr>
              {Object.keys(data.allFile.edges[0].node).map((title, index) => (
                // make title from camelcase variable. E.g capitalize first letter and add space before following capaital latters
                <th key={index}>{title.charAt(0).toUpperCase() + title.slice(1).replace(/([A-Z])/g, ' $1')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }, index) => (
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
    </Layout>
  );
};

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