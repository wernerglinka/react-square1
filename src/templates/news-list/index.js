import React, { Component } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { animateScroll } from 'react-scroll';
import Waypoint from 'react-waypoint';
import Layout from '../default';
import PageTitle from '../../components/page-title';
import Pager from '../../components/pager';
import styles from './news-list.module.scss';


class News extends Component {
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
    // enable navigation links
    // navigation links may be hidden to build a "link less" landing page
    const hasLinks = true;

    // page banner
    // set the banner properties in object literal 'bannerConfic'
    const bannerConfig = {
      title: '',
      bgImgURL: '/assets/images/banners/news-banner.jpg',
      ctaText: '',
      ctaURL: '',
      fixedBg: false,
      lightText: false
    };

    // top message
    // if the page uses a local pageToMessage defined it here
    // if page uses a site-wide topMessage use "data.site.siteMetadata.topMessage"
    // if no topMessage delete or comment-out this part
    const topMessage = 'this is the <a href="https://apple.com">News</a> top message';

    // page title
    // if bannerConfig is defined then we do not render a page title, the banner h1 will act as the page title
    // both bannerConfig and topMessage are conditional props. They can be commented above without causing
    // the code to break.
    const pageTitle = 'These are the News';

    const { toTopVisible } = this.state;

    // is this really easier to read? destructre and rename edges to newsItems?
    // same as
    // const newsItems = this.props.data.allNewsJson.edges
    const { data: { allNewsJson: { edges: newsItems } } } = this.props;

    // footer
    // if footer has a background image define it here.
    // if footer should use a site-wide bg image use "data.site.siteMetadata.defaultImages.footer"
    // if no footer img delete or comment-out this part
    // footerBgImg = this.props.data.site.siteMetadata.defaultImages.footer;
    // const footerBgImg = this.props.data.site.siteMetadata.defaultImages.footer;
    const { data: { site: { siteMetadata: { defaultImages: { footer: footerBgImg } } } } } = this.props;


    // get the context to build a pager
    const { pageContext: { numPages, currentPage } } = this.props;

    return (

      <Layout
        banner={bannerConfig}
        topMessage={topMessage}
        footerBgImg={footerBgImg}
        hasLinks={hasLinks}
      >
        {!bannerConfig ? <PageTitle headerText={pageTitle} /> : null}

        <div className="main-content">
          <div className="container">

            <Waypoint
              onEnter={this.handleWaypointEnter}
              onLeave={this.handleWaypointLeave}
            />

            {currentPage === 1 && (
              <div>
                <h2>Our Press Coverage</h2>
                <p className="intro">
                  This text is only displayed on the first news listing page.
                  <br />
                  {/* eslint react/jsx-one-expression-per-line:0 */}
                  All press items are stored in <em>data/news/news.json</em>. The code to implement paging is located in <strong>gatsby-node.js</strong>. The approach was inspired by https://www.gatsbyjs.org/docs/adding-pagination/. However, all pagination examples seem to focus on a blog implementation, with blog pages authored in markdown. For this News application there are no pages only the list pages and the list pages display the news title and news organization logo linked to the original publication.
                </p>
              </div>
            )}

            <ul className={styles.newsList}>
              { newsItems.map(({ node }) => (
                <li key={node.news_title}>
                  <a href={node.news_url} target="_blank" rel="noopener noreferrer">
                    {node.news_type === 'video' && <i className="icon icon-video" />}
                    {node.news_type === 'podcast' && <i className="icon icon-audio" />}
                    <img src={`/assets/images/news-logos/${node.news_org_logo}`} alt={node.name_org} />
                    <p>{node.news_title}</p>
                    <p>{node.news_date}</p>
                  </a>
                </li>
              ))}
            </ul>

            {numPages > 1 ? <Pager numPages={numPages} currentPage={currentPage} /> : null}

            <button className={`to-top ${toTopVisible ? 'isVisible' : ''}`} type="button" onClick={this.scrollToTop}><i className="icon icon-arrow-up" /></button>

          </div>
        </div>
      </Layout>
    );
  }
}

News.propTypes = {
  data: PropTypes.object.isRequired,   // eslint-disable-line
  pageContext: PropTypes.shape({
    numPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
  }).isRequired,
  location: PropTypes.shape({
    href: PropTypes.string.isRequired
  }).isRequired
};

export default News;

export const query = graphql`
  query newsQuery ($skip: Int!, $limit: Int!) {
    allNewsJson (
      limit: $limit
      skip: $skip
    ){
    edges {
      node {
        name_org
        news_org_logo
        news_org_logo_wide
        news_title
        news_url
        news_date
        news_type
      }
    }
  }
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
