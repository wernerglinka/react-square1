import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import PageTransition from 'gatsby-plugin-page-transitions';
import styles from './about.module.scss';
import Layout from '../../templates/default';
import PageTitle from '../../components/page-title';

// local user component
const User = (props) => {
  const { avatar, username, excerpt } = props;

  return (
    <div className={styles.user}>
      <img src={avatar} className={styles.avatar} alt="" />
      <div className={styles.description}>
        <h2 className={styles.username}>{username}</h2>
        <p className={styles.excerpt}>{excerpt}</p>
      </div>
    </div>

  );
};

User.defaultProps = {
  avatar: '',
  username: '',
  excerpt: ''
};

User.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  excerpt: PropTypes.string
};

/* eslint no-undef: 0 */
// eslint-disable-next-line
const About = ({ data }) => {
  // this page has a banner
  // set the banner properties in object literal 'bannerConfic'
  const bannerConfig = {
    title: 'this is a banner title',
    bgImgURL: '/images/banners/home-banner-bg.jpg',
    ctaText: 'Read more here',
    ctaURL: 'https://apple.com'
  };

  // if page has a top message then set properties in object literal topoMessage.
  // if a pageToMessage is defined it will be shown. otherwise siteTopMessage will be shown
  const topMessage = {
    pageTopMessage: 'this is the <a href="https://apple.com">page specific</a> top message',
    siteTopMessage: data.site.siteMetadata.topMessage,
  };

    // set the page specific page title here, to use site default use  an empty string
  const pageTitle = 'this is page specific page title';

  // if bannerConfig is defined then we do not render a page title, the banner h1 will act as the page title
  // both bannerConfig and topMessage are conditional props. They can be commented above without causing
  // the code to break.
  return (

    <PageTransition>
      <Layout
        {...(typeof bannerConfig !== 'undefined' && { banner: bannerConfig })}
        {...(typeof topMessage !== 'undefined' && { topMessage })}
      >
        {!bannerConfig ? <PageTitle headerText={pageTitle || data.site.siteMetadata.title} /> : null}
        <div>
          <p>CSS Modules are cool</p>
          <User
            username="Jane Doe"
            avatar="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
            excerpt="I'm Jane Doe. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          />
          <User
            username="Bob Smith"
            avatar="https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg"
            excerpt="I'm Bob smith, a vertically aligned type of guy. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          />
          <Link to="/">Go Back</Link>
        </div>
      </Layout>
    </PageTransition>
  );
};

export default About;
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
  }
`;
