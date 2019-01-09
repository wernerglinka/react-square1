import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styles from './customer-list.module.scss';

const CustomerList = () => (
  <StaticQuery
    query={graphql`
        query CustomerQuery {
            allCustomersJson {
              edges {
                node {
                  name
                  linkURL
                  logo
                }
              }
            }
          }
        `}
    render={(data) => {
      const allCustomers = data.allCustomersJson.edges;

      console.log(allCustomers);

      return (
        <section className={styles.listWrapper}>
          <h1>Our Customers</h1>
          <ul className={styles.customerList}>
            {allCustomers.map(({ node }) => (
              <li key={node.name}>
                <a href={node.linkURL} target="_blank" rel="noopener noreferrer">
                  <img src={node.logo} alt={node.name} />
                </a>
              </li>
            ))}
          </ul>
        </section>
      );
    }}
  />
);

export default CustomerList;
