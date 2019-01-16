/* eslint
    react/jsx-one-expression-per-line:0,
    react/prefer-stateless-function: 0
*/

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import getAuthorInfo from './getAuthorInfo';
import styles from './bio.module.scss';


const Bio = props => (
  <StaticQuery
    query={graphql`
      query BioQuery {
        allAuthorsJson {
          edges {
            node {
              short
              name
              position
              avatar
              bio
            }
          }
        }
      }
    `}
    render={(data) => {
      // get author string
      const blogAuthor = props.author;
      // deconstruct allAuthorsJson into allAuthors object
      const { allAuthorsJson: { edges: allAuthors } } = data;
      // get info for all blog authors
      const allAuthorsInfo = getAuthorInfo(blogAuthor, allAuthors);

      return (
        <ul className={styles.authorsList}>
          {allAuthorsInfo.map(thisAuthor => (
            <li key={thisAuthor.name}>
              <img src={thisAuthor.avatar} alt="{this.author.name}" />
              <h3>{thisAuthor.name}</h3>
              <p>{thisAuthor.position}</p>
              <p>{thisAuthor.bio }</p>
            </li>
          ))}
        </ul>
      );
    }
    }
  />
);


export default Bio;
