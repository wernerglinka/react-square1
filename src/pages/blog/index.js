/*  eslint
    react/jsx-one-expression-per-line:0,
    react/prefer-stateless-function: 0
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { animateScroll } from 'react-scroll';

import Layout from '../../templates/default';
import SEO from '../../components/seo';
import styles from './blog.module.scss';
import getAuthorName from '../../utilities/getAuthorName';

class BlogIndex extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.array.isRequired
      }).isRequired
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

    // destructure data to get a posts object
    const { data: { allMarkdownRemark: { edges: posts } } } = this.props;

    // destructure the authors object
    const { data: { allAuthorsJson: { edges: authors } } } = this.props;

    // this page shows the main nav
    const hasLinks = true;

    // this page uses a banner with title instead of a simple page title
    const bannerConfig = {
      title: 'Blog',
      bgImgURL: '/assets/images/blog/blog.jpg',
      ctaText: '',
      ctaURL: '',
      fixedBg: false,
      lightText: true
    };

    // this page uses page specific top message
    const topMessage = 'this is the <a href="https://apple.com">blog specific</a> top message';

    // this page uses the site-wide footer background image
    const { data: { site: { siteMetadata: { defaultImages: { footer: footerBgImg } } } } } = this.props;

    return (
      <Layout
        banner={bannerConfig}
        topMessage={topMessage}
        footerBgImg={footerBgImg}
        hasLinks={hasLinks}
      >
        <SEO
          title="All posts"
          keywords={['blog', 'gatsby', 'javascript', 'react']}
        />

        <div className="main-content">
          <div className="container">

            <ul className={styles.blogList}>
              {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug;
                return (
                  <li key={node.fields.slug}>
                    <h3>
                      <Link to={node.fields.slug}>
                        {title}
                      </Link>
                    </h3>
                    <p><span className={styles.blogDate}>{node.frontmatter.date}</span> | by <span className={styles.blogAuthor}>{getAuthorName(node.frontmatter.author, authors)}</span></p>
                  <p dangerouslySetInnerHTML={{ __html: node.excerpt }} /> {/*eslint-disable-line*/}
                  </li>
                );
              })}
            </ul>

            <button className={`to-top ${toTopVisible ? 'isVisible' : ''}`} type="button" onClick={this.scrollToTop}><i className="icon icon-arrow-up" /></button>

          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        topMessage
        defaultImages {
          footer
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            author
          }
        }
      }
    }
    allAuthorsJson {
      edges {
        node {
          short
          name
          avatar
        }
      }
    }
  }
`;
