/* eslint react/jsx-one-expression-per-line:0, react/self-closing-comp: 0 */
/**
 *  HomePage using the default page template
 *  a default page template uses the default layout to implement
 *  - an optional top message band at the very top of the page
 *  - an optional static banner
 *  - a page title that is hidden if the banner is present
 *  - a page footer
 *
 *  the page is wrapped with transition wrapper to implement animated page transitions
 *
 *  the top message may be locally defined or a global message may be used. The global
 *  message is defined in siteData/siteMeta.js
 */

import React from 'react';
import { Link, graphql } from 'gatsby';
import { Link as ScrollLink, animateScroll } from 'react-scroll';
import Waypoint from 'react-waypoint';
import Layout from '../templates/default';
import PageTitle from '../components/page-title';
import CustomerList from '../components/customer-list';
import Banner from '../components/page-banner';
import MediaModule from '../components/media-module-vertical';


class HomePage extends React.Component {
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
    this.setState(() => ({ toTopVisible: false }));
  };

  handleWaypointLeave = () => {
    this.setState(() => ({ toTopVisible: true }));
  };

  scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  render() {
    const { toTopVisible } = this.state;

    // enable navigation links
    // navigation links may be hidden to build a "link less" landing page
    const hasLinks = true;

    // page banner
    // set the banner properties in object literal 'bannerConfic'
    const bannerConfig = {
      title: 'this is a banner title',
      bgImgURL: '/assets/images/banners/home-banner-bg.jpg',
      ctaText: 'Read more here',
      ctaURL: 'https://apple.com',
      fixedBg: true,
      lightText: false
    };

    // in-page banner
    // set the banner properties in object literal 'bannerConfic'
    const inPageBannerConfig = {
      title: 'this is an in-page banner without a CTA',
      bgImgURL: '/assets/images/banners/in-page-cta.jpg',
      fixedBg: false,
      lightText: true
    };

    // top message
    // if the page uses a local pageToMessage defined it here
    // if page uses a site-wide topMessage use "data.site.siteMetadata.topMessage"
    // if no topMessage delete or comment-out this part
    const topMessage = 'this is the <a href="https://apple.com">page specific</a> top message';

    // page title
    // if bannerConfig is defined then we do not render a page title, the banner h1 will act as the page title
    // both bannerConfig and topMessage are conditional props. They can be commented above without causing
    // the code to break.
    const pageTitle = 'this is page specific page title';

    // footer
    // if footer has a background image define it here.
    // if footer should use a site-wide bg image use "data.site.siteMetadata.defaultImages.footer"
    // if no footer img delete or comment-out this part
    // footerBgImg = this.props.data.site.siteMetadata.defaultImages.footer;
    const { data: { site: { siteMetadata: { defaultImages: { footer: footerBgImg } } } } } = this.props;

    // media list
    // this page features a media list
    // the list is defined here
    const mediaList = [
      {
        mediaImgURL: '/assets/images/section-icons/clean-industry.svg',
        mediaTitle: 'Aenean Etiam Fermentum',
        mediaProse: 'Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.'
      },
      {
        mediaImgURL: '/assets/images/section-icons/conserve-energy.svg',
        mediaTitle: 'Condimentum Fringilla',
        mediaProse: 'Nulla vitae elit libero, a pharetra augue. Donec id elit non mi porta gravida at eget metus. Donec ullamcorper nulla non metus auctor fringilla.'
      },
      {
        mediaImgURL: '/assets/images/section-icons/save-nature.svg',
        mediaTitle: 'Ullamcorper Venenatis Tortor',
        mediaProse: 'Malesuada eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
      },
      {
        mediaImgURL: '/assets/images/section-icons/stop-littering.svg',
        mediaTitle: 'Tellus Dapibus Amet Egestas',
        mediaProse: 'Donec ullamcorper nulla non metus auctor fringilla.'
      }
    ];


    return (

      <Layout
        banner={bannerConfig}
        topMessage={topMessage}
        footerBgImg={footerBgImg}
        hasLinks={this.hasLinks}
      >
        {!bannerConfig ? <PageTitle headerText={this.pageTitle} /> : null}

        <div className="main-content">
          <div className="container">

            <Waypoint
              onEnter={this.handleWaypointEnter}
              onLeave={this.handleWaypointLeave}
            />


            <h2>Inceptos Pellentesque Nibh Lorem</h2>
            <p className="intro">This is the home page of the Square1 Gatsby demo site. This page features various components:</p>
            <ul>
              <li>A <strong>Top Message</strong> (components/page-top-message) at the top of the page. This is often used to provide a short high-priority message to site visitors. This message maybe set per page or a site-wide message which is defined in gatsby-config.js may be used. See code comments for further info.</li>
              <li>A <strong>navigation menu</strong> (components/nav-bar) that includes the brand logo and site navigation.</li>
              <li>A <strong>Page Banner</strong> (components/page-banner) typically used for the primary message and an important call to axction</li>
              <li>A <strong>Customer List</strong> (components/customer-list) that lists featured customers.</li>
              <li>An alternative use of the page banner as an <strong>in-page CTA</strong></li>
              <li>A <strong>feature list</strong> that support the main message of this page</li>
              <li> A <strong>footer</strong> that includes a <strong>copyright</strong> component and a <strong>social links</strong> component</li>
            </ul>

            <p>Integer posuere erat <Link to="/about">Go To Soft Scroll Demp Page</Link> posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Nulla vitae elit libero, a pharetra augue.</p>
            <p><em>This link is an example of a smooth scroll to a section on this page.</em> <ScrollLink className="smooth-scroll" smooth to="testSec">Click to scroll</ScrollLink>, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod.</p>
            <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>

            <CustomerList />

            <h2>Maecenas sed diam eget risus varius blandit sit amet non magna.</h2>
            <p>Donec sed odio dui. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed consectetur. Donec ullamcorper nulla non metus auctor fringilla.</p>

            <p>Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
          </div>

          <Banner banner={this.inPageBannerConfig} />

          <div className="container" id="testSec">
            <h2>Sed posuere consectetur </h2>
            <p>Donec sed odio dui. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed consectetur. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>

            <ul className="media-list_horizontal">
              {this.mediaList.map(listItem => (
                <li key={listItem.mediaTitle}>
                  <MediaModule content={listItem} />
                </li>
              ))}
            </ul>

          </div>
        </div>
        <button className={`to-top ${toTopVisible ? 'isVisible' : ''}`} type="button" onClick={this.scrollToTop}><i className="icon icon-arrow-up"></i></button>
      </Layout>
    );
  }
}

export default HomePage;

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
