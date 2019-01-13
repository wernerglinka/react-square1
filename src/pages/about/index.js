import React from 'react';
import { graphql, Link } from 'gatsby';
import { animateScroll } from 'react-scroll';
import Waypoint from 'react-waypoint';
import Layout from '../../templates/default';
import PageTitle from '../../components/page-title';
import Modal from '../../components/modal';
import TeamMember from './team';
import styles from './about.module.scss';

/* eslint no-undef: 0, react/jsx-one-expression-per-line:0 */
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
    // const { data: { site: { siteMetadata: { topMessage } } } } = this.props;
    const topMessage = 'this is another freaking top message YAY';

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

    // deconstruct team query result
    const { data: { allTeamJson: { edges: theTeam } } } = this.props;

    const modalContent = (
      <div>
        <p>Hello world Lorem ipsum dolor sit amet, <Link to="/">first link</Link> consectetur adipiscing elit. Phasellus sagittis erat ut ex bibendum consequat. Morbi luctus ex ex, at varius purus <Link to="files">second link</Link> vehicula consectetur. Curabitur a sapien a augue consequat rhoncus. Suspendisse commodo ullamcorper nibh quis blandit. Etiam viverra neque quis mauris efficitur, lobortis aliquam ex pharetra. Nam et ante ex. Sed gravida gravida ligula, non blandit nunc. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer consectetur efficitur tempor. Nunc sollicitudin felis congue facilisis faucibus. Mauris faucibus sit amet ante eleifend dapibus.</p>
        <p style={{ marginBottom: 0 }}>Nunc semper eu lectus ac blandit. Fusce iaculis dolor sit amet felis placerat, non auctor nibh pellentesque. Nunc dignissim, tortor eget sollicitudin pulvinar, sem est sagittis nisi, non condimentum orci felis vel libero. Aenean <Link to="/news">third link</Link> a tempus lorem. Proin a enim id magna malesuada consectetur mattis eget massa. Sed volutpat neque vitae tortor dignissim dapibus. Ut a ante maximus, sollicitudin nisi ut, varius magna. Vestibulum maximus urna eget commodo egestas. Donec sollicitudin tortor ac mauris pulvinar, ac maximus urna tempus. Mauris non libero posuere, ullamcorper neque vel, tempor sem. Suspendisse potenti. In tristique et metus id laoreet.</p>
      </div>
    );
    const modalProps = {
      ariaLabel: 'A label describing the Modal\'s current content',
      triggerText: 'OPEN MODAL'
    };

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

            <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas faucibus mollis <Modal {...modalProps}>{modalContent}</Modal> interdum. Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Sed posuere consectetur est at lobortis.</p>
            <h2>Our Team</h2>

            <ul className={styles.teamList}>
              {theTeam.map(({ node }) => (
                <li className={styles.teamMember} key={node.avatar}>
                  <TeamMember memberData={node} />
                </li>
              ))}
            </ul>


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
    allTeamJson {
      edges {
        node {
          name
          title
          avatar
          description
        }
      }
    }
  }
`;
