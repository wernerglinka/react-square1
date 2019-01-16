/* eslint
    react/jsx-one-expression-per-line:0,
    react/prefer-stateless-function: 0
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { animateScroll } from 'react-scroll';
import Waypoint from 'react-waypoint';

import Layout from './default';
import Bio from '../components/bio';
import SEO from '../components/seo';


class BlogPostTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      markdownRemark: PropTypes.object.isRequired
    }).isRequired,
    pageContext: PropTypes.shape({
      previous: PropTypes.object,
      next: PropTypes.object
    }).isRequired
  }

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

    // deconstruct post from props
    const { data: { markdownRemark: post } } = this.props;
    // deconstruct previous and next objects from props
    const { pageContext: { previous, next } } = this.props;

    // this page shows the main nav
    const hasLinks = true;

    // this page uses the site-wide footer background image
    const { data: { site: { siteMetadata: { defaultImages: { footer: footerBgImg } } } } } = this.props;

    // this page uses page specific top message
    const topMessage = 'this is the <a href="https://apple.com">Blogs</a> top message';

    // this page uses a banner with title instead of a simple page title
    const bannerConfig = {
      title: post.frontmatter.title,
      bgImgURL: `/assets/images/blog/${post.frontmatter.bannerImg}`,
      ctaText: '',
      ctaURL: '',
      fixedBg: false,
      lightText: post.frontmatter.bannerTextLight
    };

    return (
      <Layout
        banner={bannerConfig}
        topMessage={topMessage}
        footerBgImg={footerBgImg}
        hasLinks={hasLinks}
      >
        <SEO title={post.frontmatter.title} description={post.excerpt} />

        <div className="main-content">
          <div className="container">
            <div className="columnWrapper">
              <div className="mainColumn">

                <Waypoint
                  onEnter={this.handleWaypointEnter}
                  onLeave={this.handleWaypointLeave}
                />
                <p>{post.frontmatter.date}</p>
                <div dangerouslySetInnerHTML={{ __html: post.html }} /> {/* eslint-disable-line */}

                <ul>
                  <li> {previous && (<Link to={previous.fields.slug} rel="prev">← {previous.frontmatter.title}</Link>)} </li>
                  <li> {next && (<Link to={next.fields.slug} rel="next">{next.frontmatter.title} →</Link>)} </li>
                </ul>
              </div>

              <aside className="secondaryColumn">
                {console.log(post.frontmatter.author)}
                <Bio author={post.frontmatter.author} />
              </aside>

            </div>

            <button className={`to-top ${toTopVisible ? 'isVisible' : ''}`} type="button" onClick={this.scrollToTop}><i className="icon icon-arrow-up" /></button>

          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        topMessage
        defaultImages {
          footer
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        author
        date(formatString: "MMMM DD, YYYY")
        bannerImg
        bannerTextLight
      }
    }
  }
`;
