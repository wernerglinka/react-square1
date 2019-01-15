/* eslint
    react/jsx-one-expression-per-line:0,
    react/prefer-stateless-function: 0
*/

import React from 'react';
import { Link, graphql } from 'gatsby';
import { animateScroll } from 'react-scroll';
import Waypoint from 'react-waypoint';

import Bio from '../components/bio';
import Layout from './default';
import SEO from '../components/seo';
import { rhythm, scale } from '../utilities/typography';

class BlogPostTemplate extends React.Component {
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
    const post = this.props.data.markdownRemark;
    // const siteTitle = this.props.data.site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;

    const hasLinks = true;

    const { toTopVisible } = this.state;
    const { data: { site: { siteMetadata: { defaultImages: { footer: footerBgImg } } } } } = this.props;
    const topMessage = 'this is the <a href="https://apple.com">Blogs</a> top message';
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

            <Waypoint
              onEnter={this.handleWaypointEnter}
              onLeave={this.handleWaypointLeave}
            />
            <p
              style={{
                ...scale(-1 / 5),
                display: 'block',
                marginBottom: rhythm(1),
                marginTop: rhythm(-1),
              }}
            >
              {post.frontmatter.date}
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <hr
              style={{
                marginBottom: rhythm(1),
              }}
            />
            <Bio />

            <ul
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                listStyle: 'none',
                padding: 0,
              }}
            >
              <li>
                {previous && (
                <Link to={previous.fields.slug} rel="prev">
                ←
                  {' '}
                  {previous.frontmatter.title}
                </Link>
                )}
              </li>
              <li>
                {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title}
                  {' '}
→
                </Link>
                )}
              </li>
            </ul>

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
        date(formatString: "MMMM DD, YYYY")
        bannerImg
        bannerTextLight
      }
    }
  }
`;
