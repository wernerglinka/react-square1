import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import styles from './customer-list.module.scss';

const CustomerList = () => (
  <StaticQuery
    query={graphql`
        query CustomerQuery {
            allFile (filter: { 
              name: { eq : "data" } 
              sourceInstanceName: { eq : "customers" }
            }) {
              edges {
                node {
                  childrenDataJson {
                    name
                    linkURL
                    logo
                  }
                }
              }
            }
          }
        `}
    render={(data) => {
      const allCustomers = data.allFile.edges[0].node.childrenDataJson;

      return (
        <section className={styles.listWrapper}>
          <h1>Our Customers</h1>
          <ul className={styles.customerList}>
            {allCustomers.map(customer => (
              <li key={customer.name}>
                <a href={customer.linkURL} target="_blank" rel="noopener noreferrer">
                  <img src={customer.logo} alt={customer.name} />
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
