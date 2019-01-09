import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { animateScroll } from 'react-scroll';
import Waypoint from 'react-waypoint';
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
class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toTopVisible: false
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      // check if page is scrolled down after reload and invoke waypoint if necessary
      const offset = window.pageYOffset;
      if (offset > 260) {
        this.setState(() => ({ toTopVisible: true }));
      }
    }, 500);
  }

  handleWaypointEnter = () => {
    this.setState(() => ({ stickyNav: false }));
    this.setState(() => ({ toTopVisible: false }));
  };

  handleWaypointLeave = () => {
    this.setState(() => ({ stickyNav: true }));
    this.setState(() => ({ toTopVisible: true }));
  };

  scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  render() {
    const { toTopVisible } = this.state;

    // page banner
    // set the banner properties in object literal 'bannerConfic'
    // const bannerConfig = {
    //  title: 'this is a banner title',
    //  bgImgURL: '/assets/images/banners/home-banner-bg.jpg',
    //  ctaText: 'Read more here',
    //  ctaURL: 'https://apple.com',
    //  fixedBg: true,
    //  lightText: false
    // };

    // in-page banner
    // set the banner properties in object literal 'bannerConfic'
    // const inPageBannerConfig = {
    //  title: 'this is an in-page banner without a CTA',
    //  bgImgURL: '/images/banners/in-page-cta.jpg',
    //  fixedBg: false,
    //  lightText: true
    // };

    // top message
    // if the page uses a local pageToMessage defined it here
    // if page uses a site-wide topMessage use "data.site.siteMetadata.topMessage"
    // if no topMessage delete or comment-out this part
    // eslint-disable-next-line
    //const topMessage = this.props.data.site.siteMetadata.topMessage;
    const { data: { site: { siteMetadata: { topMessage } } } } = this.props;

    // page title
    // if bannerConfig is defined then we do not render a page title, the banner h1 will act as the page title
    // both bannerConfig and topMessage are conditional props. They can be commented above without causing
    // the code to break.
    const pageTitle = 'this is a page specific page title';

    // enable navigation links
    // navigation links may be hidden to build a "link less" landing page
    const hasLinks = true;

    // footer
    // if footer has a background image define it here.
    // if footer should use a site-wide bg image use "data.site.siteMetadata.defaultImages.footer"
    // if no footer img delete or comment-out this part
    // const footerBgImg = data.site.siteMetadata.defaultImages.footer;

    return (
      <Layout
        topMessage={topMessage}
        hasLinks={hasLinks}
      >

        <div className="main-content">
          <div className="container">

            <PageTitle headerText={pageTitle} />

            <Waypoint
              onEnter={this.handleWaypointEnter}
              onLeave={this.handleWaypointLeave}
            />

            <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas faucibus mollis interdum. Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Sed posuere consectetur est at lobortis.</p>
            <h2>Our Team</h2>
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
        </div>

        <button className={`to-top ${toTopVisible ? 'isVisible' : ''}`} type="button" onClick={this.scrollToTop}><i className="icon icon-arrow-up" /></button>

      </Layout>

    );
  }
}

export default About;
/**
 * query for page data
 */
export const query = graphql`
  query {
    site {
      siteMetadata {
        topMessage
        defaultImages {
          footer
        }
      }
    }
  }
`;
