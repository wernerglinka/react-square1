/* eslint
    react/jsx-one-expression-per-line:0,
    react/prefer-stateless-function: 0
*/

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import getAuthorInfo from './getAuthorInfo';


const Bio = props => (
  <StaticQuery
    query={graphql`
      query BioQuery {
        allAuthorsJson {
          edges {
            node {
              short
              name
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
        <ul>
          {allAuthorsInfo.map(thisAuthor => (
            <li>
              <img src={thisAuthor.avatar} alt="{this.author.name}" />
              <h3>{thisAuthor.name}</h3>
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
